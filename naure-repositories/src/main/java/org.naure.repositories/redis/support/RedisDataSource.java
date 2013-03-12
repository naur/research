package org.naure.repositories.redis.support;

import org.apache.commons.pool.BasePoolableObjectFactory;
import org.apache.commons.pool.impl.GenericObjectPool;

import redis.clients.jedis.Protocol;
import redis.clients.jedis.exceptions.JedisConnectionException;

/**
 * Redis数据源
 * 
 * @author hexiaofeng
 * 
 */
public class RedisDataSource {

	private RedisPoolConfig poolConfig;
	private GenericObjectPool pool;
	private String host;
	private int port;
	private String user;
	private String password;
	private int db;

	/**
	 * 
	 * @param host
	 * @param port
	 * @param user
	 * @param password
	 * @param JedisPoolConfig
	 * @return
	 */
	public RedisDataSource(String host, int port, String user, String password,
			RedisPoolConfig poolConfig) {
		this(host, port, user, password, 0, poolConfig);
	}

	/**
	 * 
	 * @param host
	 * @param port
	 * @param user
	 * @param password
	 * @param db
	 * @param JedisPoolConfig
	 * @return
	 */
	public RedisDataSource(String host, int port, String user, String password,
			int db, RedisPoolConfig poolConfig) {
		this.host = host;
		this.port = port;
		this.user = user;
		this.password = password;
		this.db = db;
		this.poolConfig = poolConfig;

		PooledRedisFactory redisFactory = null;
		try {
			redisFactory = createRedisFactory();
		} catch (Exception e) {
			throw new JedisConnectionException(e.getMessage(), e);
		}
		pool = new GenericObjectPool(redisFactory, this.poolConfig);
	}

	protected PooledRedisFactory createRedisFactory() throws Exception {

		PooledRedisFactory redisFactory = new PooledRedisFactory();
		PooledRedis redis = null;
		try {
			redis = (PooledRedis) redisFactory.makeObject();
		} finally {
			if (redis != null)
				redisFactory.destroyObject(redis);
		}
		return redisFactory;
	}

	/**
	 * 
	 * @return
	 */
	public void close() {
		try {
			if (pool != null) {
				pool.close();
			}
		} catch (RuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new JedisConnectionException("Cannot close connection pool",
					e);
		}
	}

	/**
	 * 
	 * @return
	 */
	public PooledRedis getRedis() {
		try {
			return (PooledRedis) pool.borrowObject();
		} catch (Exception e) {
			throw new JedisConnectionException("Cannot get a connection", e);
		}
	}

	public class PooledRedisFactory extends BasePoolableObjectFactory {

		@Override
		public Object makeObject() throws Exception {
			PooledRedis redis = new PooledRedis(host, port, db,
					(poolConfig.getTimeOut() > 0 ? poolConfig.getTimeOut()
							: Protocol.DEFAULT_TIMEOUT),
					(user == null ? poolConfig.getUser() : user),
					(password == null ? poolConfig.getPassword() : password),
					pool);
            redis.connect();
			return redis;
		}

		@Override
		public void destroyObject(Object obj) throws Exception {
			if (obj instanceof PooledRedis) {
				try {
					((PooledRedis) obj).disconnect();
				} catch (Exception e) {
				}
			}

		}

		@Override
		public boolean validateObject(Object obj) {
			if (obj instanceof PooledRedis) {
				final PooledRedis redis = (PooledRedis) obj;
				try {
					if (!redis.isConnected())
						redis.connect();
					if (redis.isConnected()) {
						return redis.ping().equals("PONG");
					}
				} catch (Exception e) {
					return false;
				}
			}
			return false;
		}

	}

}