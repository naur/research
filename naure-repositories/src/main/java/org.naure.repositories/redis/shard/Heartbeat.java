package org.naure.repositories.redis.shard;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Protocol;
import redis.clients.jedis.exceptions.JedisException;

/**
 * 心跳
 * 
 * @author hexiaofeng
 * @author xiaofei
 * 
 */
public class Heartbeat extends Thread {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = LoggerFactory.getLogger(Heartbeat.class);

	private static final int DEFAULT_POOLSIZE = 10;

	private final ShardRedisConfig config;
	private final ThreadPoolExecutor executor;
	private final ConcurrentMap<Node, Jedis> jedises = new ConcurrentHashMap<Node, Jedis>();
	private final Monitor monitor;
	private final ShardRepository repository;

	/**
	 * 
	 * @param config
	 * @param monitor
	 * @param repository
	 * @return
	 */
	public Heartbeat(ShardRedisConfig config, Monitor monitor,
			ShardRepository repository) {
		if (config == null)
			throw new IllegalArgumentException("config is null");
		if (monitor == null)
			throw new IllegalArgumentException("monitor is null");
		if (repository == null)
			throw new IllegalArgumentException("repository is null");
		this.config = config;
		this.monitor = monitor;
		this.repository = repository;
		this.executor = new ThreadPoolExecutor(DEFAULT_POOLSIZE,
				Integer.MAX_VALUE, 0, TimeUnit.MILLISECONDS,
				new LinkedBlockingQueue<Runnable>());
	}

	/**
	 * 
	 * @return
	 */
	public void run() {
		while (!interrupted()) {
			if (repository.isLeader()) {
				logger.debug("Start health checking...");
				try {
					checkHealth();
				} catch (Exception suppress) {
					logger.error("Heartbeat continued with an error.", suppress);
				}
			}else{
				logger.debug("Not a leader, sleep.");
			}
			sleepSilently(config.getHeartbeat());
		}
		logger.info("Heartbeat stopped.");
	}

	private void checkHealth() throws Exception {
		// get shallow clone of all shards
		List<Shard> shards = repository.getShards();
		/*
		 * map of shard and it's all nodes whose wrapped with changeable state.
		 */
		Map<Shard, List<NodeState>> nodesMap = new HashMap<Shard, List<NodeState>>(
				shards.size());

		int counter = 0;
		for (Shard shard : shards) {
			List<NodeState> checkingNodes = new ArrayList<NodeState>();
            int i = 0;
            for (Node node : shard.getHealths()) {
                if (i == 0) {
                    // first healthy node may be a master, but also may be a
                    // slave which not changed to master quickly.
                    checkingNodes
                            .add(new NodeState(node, NodeRole.Unknown, true));
                } else {
                    // other healthy nodes are slave.
                    checkingNodes
                            .add(new NodeState(node, NodeRole.Slave, true));
                }
                i++;
            }

			for (Node node : shard.getWeaks()) {
                // all weak nodes's role are unknown, for example, all down.
                checkingNodes.add(new NodeState(node, NodeRole.Unknown, false));
			}

			counter = counter + checkingNodes.size();
			nodesMap.put(shard, checkingNodes);
		}
		if (counter <= 0)
			return;
		CountDownLatch latch = new CountDownLatch(counter);
		executor.setCorePoolSize(counter);

		for (List<NodeState> value : nodesMap.values()) {
			for (NodeState nodeState : value) {
				if (nodeState.old) {
					executor.execute(new HealthNodeCheck(nodeState, latch));
				} else {
					executor.execute(new WeakNodeCheck(nodeState, latch));
				}
			}
		}

		// await for all checks done.
		latch.await();

		// notify one by one.
		for (Entry<Shard, List<NodeState>> entry : nodesMap.entrySet()) {
			List<NodeState> states = entry.getValue();
			if (isChanged(states)) {
				try {
					applyUpdate(new Shard(entry.getKey()), states);
				} catch (Exception e) {
					logger.error(
							"Heartbeat apply modification of shard failed.", e);
				}
			}
		}
	}

	@Override
	public void interrupt() {
		super.interrupt();
		for (Jedis jedis : jedises.values()) {
			try {
				jedis.disconnect();
			} catch (Exception e) {
			}
		}
		jedises.clear();
		executor.shutdownNow();
	}

	private void sleepSilently(long timeout) {
        if (timeout > 0) {
            try {
                Thread.sleep(timeout);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
	}

	private boolean isChanged(List<NodeState> states) {
		for (NodeState node : states) {
			if (node.current != node.old) {
				return true;
			}
		}
		return false;
	}

	private void applyUpdate(Shard clone, List<NodeState> states)
			throws Exception {
		for (NodeState state : states) {
			Node node = state.node;
			if (state.current != state.old) {
				if (!state.current && clone.getHealths().remove(node)) {
					clone.getWeaks().add(node);
				}
				if (state.current && clone.getWeaks().remove(node)) {
					clone.getHealths().add(node);
				}
			}
		}
		repository.updateShard(clone);
	}

    private static class NodeState {
		public final Node node;// 节点
        public final NodeRole role; // 节点角色
		public final boolean old;// 原来的健康状态
		public boolean current;// 现在的健康状态

        NodeState(Node node, NodeRole role, boolean old) {
			this.node = node;
            this.role = role;
			this.old = old;
		}
	}

    private static enum NodeRole {
        Master, Slave, Unknown;
    }

	private class WeakNodeCheck extends HealthNodeCheck {

		WeakNodeCheck(NodeState nodeState, CountDownLatch latch) {
			super(nodeState, latch);
		}

		@Override
		protected boolean isHealth(Jedis jedis) throws JedisException {
			if (!jedis.isConnected()) {
				jedis.connect();
			}
			/*
			 * NOTE: ping a slave(was weak) may throw JedisDataException: ERR
			 * link with MASTER is down and slave-serve-stale-data is set to no.
			 * When slave-serve-stale-data=no and slave is synchronized, we just
			 * ping PONG to get it, we like it.
			 */
			return "PONG".equals(jedis.ping());
		}

		@Override
		protected void onNodeWeak(Node node) {
		}

	}

	private class HealthNodeCheck implements Runnable {
		protected final NodeState nodeState;
		private final CountDownLatch latch;

		HealthNodeCheck(NodeState nodeState, CountDownLatch latch) {
			this.nodeState = nodeState;
			this.latch = latch;
		}

		protected boolean isHealth(Jedis jedis) throws JedisException {
			if (!jedis.isConnected()) {
				jedis.connect();
			}

            /*
             * NOTE: ping a slave may throw JedisDataException: ERR link with
             * MASTER is down and slave-serve-stale-data is set to no. So using
             * INFO instead.
             */
            String info = jedis.info();
            if (info == null) {
                return false;
            }
            switch (nodeState.role) {
            case Master:
                return info.indexOf("role:master") >= 0;
            case Slave:
                return info.indexOf("role:slave") >= 0;
            }
            return true;
		}

		@Override
		public void run() {
			try {
				boolean successed = true;

				JedisException lastError = null;
				for (int i = 0; i <= config.getHeartbeatRetryTimes(); i++) {
                    Jedis jedis = getJedis(nodeState.node);
					try {
						successed = isHealth(jedis);
						if (successed)
							break;
					} catch (JedisException e) {
                        removeJedis(nodeState.node);
						successed = false;
						lastError = e;
						sleepSilently(config.getHeartbeatRetryInterval());
					}
				}
				if (!successed) {
					if (lastError != null) {
						logger.warn("Heartbeat check failed with node:"
								+ nodeState.node, lastError);
					}
					onNodeWeak(nodeState.node);
					// 检查repository是否存活，确保网络通畅
					if (repository.isAlive()) {
						nodeState.current = false;
					} else {
						logger.warn("Repository and redis node both failed!");
						onRepositoryWeak();
					}
				} else {
					nodeState.current = true;
				}
			} finally {
				latch.countDown();
			}
		}

		/**
		 * 检测到不健康节点
		 * 
		 * @param node
		 */
		protected void onNodeWeak(Node node) {
			monitor.onNodeWeak(node);
		}

		/**
		 * 注册中心不存活了
		 */
		protected void onRepositoryWeak() {
			monitor.onRepositoryWeak(config.getZkServers());
		}

	}

	private Jedis getJedis(Node node) {
		Jedis jedis = jedises.get(node);
		if (jedis == null) {
            jedis = new Jedis(node.getHost(), node.getPort(),
                    config.getTimeOut() > 0 ? config.getTimeOut()
                            : Protocol.DEFAULT_TIMEOUT);
			if (config.getPassword() != null && !config.getPassword().isEmpty()) {
				jedis.getClient().setPassword(config.getPassword());
			}
            if (node.getDb() > 0) {
                jedis.select(node.getDb());
            }
			Jedis previous = jedises.putIfAbsent(node, jedis);
			if (previous != null) {
				try {
					previous.disconnect();
				} catch (Exception ignore) {
				}
			}
		}
		return jedis;
	}

    private void removeJedis(Node node) {
        Jedis jedis = jedises.remove(node);
        if (jedis != null) {
            try {
                jedis.disconnect();
            } catch (Exception ignore) {
            }
        }
    }

}