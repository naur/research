/**
 * 
 */
package org.naure.repositories.redis.shard;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.KeeperException.BadVersionException;
import org.apache.zookeeper.Watcher.Event.EventType;
import org.apache.zookeeper.data.Stat;

import org.naure.repositories.util.JsonUtil;
import org.naure.repositories.zookeeper.ChildrenNodeChangedListener;
import org.naure.repositories.zookeeper.ZkClient;
import org.naure.repositories.zookeeper.ZkSerializer;
import org.naure.repositories.zookeeper.election.ElectionListener;
import org.naure.repositories.zookeeper.election.LeaderElection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 负责所有shard及其节点的初始化、变更持久 接受heartbeat的通知，接受本组件内部和客户注册监听器，用以记录shard节点变更事件
 * 
 * @author xiaofei
 * 
 */
public class ZkShardRepository implements ShardRepository {
	private static final Logger logger = LoggerFactory.getLogger(ZkShardRepository.class);
	public static final String ShardRepositoryPath = "/redis/shards";
	public static final String LeaderElectionPath = "/redis/client";

	private final ZkClient zkClient;
	private final String redisHosts;
	private final AtomicBoolean leader = new AtomicBoolean();

	/*
	 * Local cached synchronize view of shards. key:shardname,value:shardvalue
	 */
	private final Map<String, Shard> shardsMap = new ConcurrentHashMap<String, Shard>();
	/*
	 * failover register holder.
	 */
	private final List<Failover> failovers = new CopyOnWriteArrayList<Failover>();

	private final ZkSerializer<Shard> shardSerializer = new ShardSerializer();

	public ZkShardRepository(String zkServers, int sessionTimeout,
			String redisHosts) throws Exception {
		this.zkClient = new ZkClient(zkServers, sessionTimeout);
		this.redisHosts = redisHosts;
		init();
	}

	@Override
	public void close() {
		try {
			this.zkClient.close();
		} catch (InterruptedException e) {
			logger.error(e.getMessage(), e);
		}
	}

	class ShardChangedListener implements ChildrenNodeChangedListener {
		@Override
		public void onChildNodeChanged(EventType eventType, String node) {
			if (eventType == EventType.NodeDataChanged) {
				Shard newShard = shardsMap.get(node);
				for (Failover failover : failovers) {
					try {
						failover.onShardChanged(newShard, leader.get());
					} catch (Exception suppress) {
						logger.error("Failed to notify failover, continue.",
								suppress);
					}
				}
			}
		}
	}

	static class ShardSerializer implements ZkSerializer<Shard> {
		@Override
		public byte[] serialize(String path, Shard src) throws Exception {
			if (src != null) {
				return JsonUtil.serialize(src);
			}
			return null;
		}

		@Override
		public Shard deserialize(String path, byte[] bytes) throws Exception {
			if (bytes != null) {
				return JsonUtil.deserialize(bytes, Shard.class);
			}
			return null;
		}
	}

	void init() throws Exception {
		// register election
		zkClient.createPath(LeaderElectionPath);
		new LeaderElection(zkClient, LeaderElectionPath,
				new ElectionListener() {
					@Override
					public void onElectionChanged(String leaderName,
							String myName, List<String> memberNames) {
						leader.set(myName.equals(leaderName));
					}
				});

		try {
			List<String> nodes = zkClient.getChildren(ShardRepositoryPath);
			if (nodes.isEmpty()) {
				throw new KeeperException.NoNodeException();
			}
		} catch (KeeperException.NoNodeException ignore) {
			// initialize zookeeper with backup's data
			logger.info("No data in zookeeper, initializing with backup.");

			initializeShards();
		}
		zkClient.watchChildrenWithData(ShardRepositoryPath, shardsMap,
				shardSerializer, new ShardChangedListener());

        logger.info("ZkShardRepository started." + shardsMap);
        logger.info("The client is leader?" + leader.get());

	}

	@Override
	public List<Shard> getShards() throws Exception {
		/*
		 * return a shallow clone
		 */
		List<Shard> shards;
		synchronized (shardsMap) {
			shards = new ArrayList<Shard>(shardsMap.values());
		}

		Collections.sort(shards);
		return shards;
	}

	@Override
	public void updateShard(Shard shard) throws Exception {
		if (shard == null || !leader.get())
			return;
		/*
		 * save into zookeeper with expect version, select before update.
		 */
		String shardPath = ShardRepositoryPath + "/" + shard.getName();
		Stat stat = new Stat();
		zkClient.getHandler().getData(shardPath, false, stat);
		try {
			zkClient.getHandler().setData(shardPath,
					shardSerializer.serialize(shardPath, shard),
					stat.getVersion());
			if (logger.isInfoEnabled())
				logger.info("Shard saved. " + shard);
		} catch (BadVersionException ignore) {
			logger.warn("Shard save failed with version conflict. ", ignore);
		}

		/*
		 * don't apply to local cached synchronize view of shards. synchronized
		 * by watcher.
		 */

	}

	private void initializeShards() throws Exception {
		if (!leader.get())
			return;
		String[] hosts = redisHosts.split("\\s");
		List<Shard> shards = new ArrayList<Shard>(hosts.length);
		for (int i = 0; i < hosts.length; i++) {
			Shard shard = new Shard(i + 1, hosts[i]);
			shards.add(shard);
		}

		// FIXME transaction? atomic?
		// ensure a fresh save
		zkClient.deleteRecursive(ShardRepositoryPath);
		zkClient.createPath(ShardRepositoryPath);
		for (Shard shard : shards) {
			String shardPath = ShardRepositoryPath + "/" + shard.getName();
			zkClient.create(shardPath,
					shardSerializer.serialize(shardPath, shard),
					CreateMode.PERSISTENT);
		}
		if (logger.isInfoEnabled())
			logger.info("Saved all shards into zookeeper.");
	}

	@Override
	public boolean isAlive() {
		try {
			return zkClient.isAlive();
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public void addListener(Failover failover) {
		if (failover != null)
			failovers.add(failover);
	}

	@Override
	public boolean isLeader() {
		return leader.get();
	}

}
