package org.naure.repositories.redis.shard;

import org.naure.repositories.redis.support.PooledRedis;
import org.naure.repositories.redis.support.RedisDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.SocketTimeoutException;

/**
 * @author xiaofei
 * 
 */
public class MSShardRedis implements InvocationHandler, Failover {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = LoggerFactory.getLogger(MSShardRedis.class);

	protected volatile Shard shard;
	protected final ShardRedisConfig config;
	protected final Monitor monitor;
	private volatile RedisDataSource dataSource;

	public MSShardRedis(Shard shard, ShardRedisConfig config, Monitor monitor) {
		Node node = shard.getFirstHealth();
		// if (node == null)
		// throw new IllegalArgumentException("shard has no health node");
		this.shard = shard;
		this.config = config;
		this.monitor = monitor;
		dataSource = createRedisDataSource(config, node);
	}

	protected RedisDataSource createRedisDataSource(ShardRedisConfig config,
			Node node) {
		if (node == null)
			return null;
        return new RedisDataSource(node.getHost(), node.getPort(),
                config.getUser(), config.getPassword(),
                (config.getPreferDB() != null) ? config.getPreferDB()
                        : node.getDb(),
                        config);
	}

	protected void close() {
		if (dataSource != null) {
			try {
				dataSource.close();
			} catch (Exception ignore) {
			}
			dataSource = null;
		}
	}

	@Override
	public void onShardChanged(final Shard current, final boolean leader) {
		if (!shard.equals(current)) {
			// not me
			return;
		}
		Node oldMasterNode = shard.getFirstHealth();
		Node newMasterNode = current.getFirstHealth();
		shard = current;

		if (oldMasterNode != null && oldMasterNode.equals(newMasterNode)) {
			return;
		}
		if (newMasterNode == null) {
			close();
			return;
		}

		RedisDataSource oldDatasource = dataSource;
		RedisDataSource newDataSource = createRedisDataSource(config,
				newMasterNode);
		if (leader) {
			try {
				slaveOfNoOne(newDataSource);
				logger.info("Success to change node to master role:"
						+ newMasterNode);
			} catch (Exception e) {
				dataSource = null;
				logger.error("Failed to change node to master role:"
						+ newMasterNode);
				monitor.onMasterFailed(newMasterNode);
				return;
			}
		}
		dataSource = newDataSource;
		if (oldDatasource != null) {
			try {
				oldDatasource.close();
			} catch (Exception ignore) {
			}
		}

	}

	private void slaveOfNoOne(RedisDataSource dataSource) {
		// slave变成master
		PooledRedis redis = dataSource.getRedis();
		try {
			redis.slaveofNoOne();
		} finally {
			redis.close();
		}
	}

	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		String methodName = method.getName();
		if ("onShardChanged".equals(methodName)) {
			onShardChanged((Shard) args[0], (Boolean) args[1]);
			return null;
		} else if ("close".equals(methodName)) {
			close();
			return null;
		}

		for (int retry = 0; retry <= config.getRedisRetryTimes(); retry++) {
			if (dataSource == null) {
				monitor.onNoDataSource(shard);
				throw new IllegalStateException("No redis node available.");
			}

			PooledRedis redis = dataSource.getRedis();
			long start = System.currentTimeMillis();
			Throwable lastError = null;
			try {
				Object result = method.invoke(redis, args);

				monitor.onSuccess(shard, System.currentTimeMillis() - start);
				return result;
			} catch (Throwable fail) {
				if (fail instanceof InvocationTargetException) {
					fail = fail.getCause();
				}
				lastError = fail;
				monitor.onFail(shard, System.currentTimeMillis() - start);

                if (retry == config.getRedisRetryTimes()
						|| !contain(fail, SocketTimeoutException.class)) {
					throw fail;
				} else if (config.getRedisRetryInterval() > 0) {
					Thread.sleep(config.getRedisRetryInterval());
				}
			} finally {
				redis.close(lastError);
			}
		}
		return null;
	}

	/**
	 * Simple lookup expected exception type in exception stack.
	 * 
	 * @param top
	 *            top of exception stack
	 * @param expectCauseType
	 *            expected exception type
	 * @return true if found.
	 */
	private static boolean contain(final Throwable top,
			final Class<? extends Throwable> expectCauseType) {
		String error = top.getMessage();
		if (error != null
				&& error.contains("server has closed the connection"))
			return true;

		for (Throwable cause = top; cause != null; cause = cause.getCause()) {
			if (cause.getClass() == expectCauseType) {
				return true;
			}
		}
		return false;
	}

}
