package org.naure.repositories.redis.shard;

import labs.repositories.redis.support.RedisPoolConfig;

/**
 * Redis配置
 * 
 * @author hexiaofeng
 * 
 */
public class ShardRedisConfig extends RedisPoolConfig {

	/**
	 * heartbeat interval (in millisecond)
	 */
	private long heartbeat = 5000L;
	/**
	 * heartbeat retry times
	 */
	private int heartbeatRetryTimes = 1;
	/**
	 * heartbeat retry interval (in millisecond)
	 */
    private long heartbeatRetryInterval = 1000L;
    /**
     * redis command retry times
     */
    private int redisRetryTimes = 1;
    /**
     * redis command retry interval (in millisecond)
     */
    private long redisRetryInterval;

	/**
	 * zookeeper server list
	 */
	private String zkServers;
	/**
	 * zookeeper session timeout (in millisecond)
	 */
	private int zkSessionTimeout = 5000;

	private ReadPolicy readPolicy = ReadPolicy.Master;

	public ShardRedisConfig() {
		super();
	}

	public long getHeartbeat() {
		return heartbeat;
	}

    public void setHeartbeat(long heartbeat) {
        if (heartbeat <= 0) {
            heartbeat = 5000L;
        }
        this.heartbeat = heartbeat;
	}

	public int getHeartbeatRetryTimes() {
		return heartbeatRetryTimes;
	}

    public void setHeartbeatRetryTimes(int retryTimes) {
        if (retryTimes < 0) {
            retryTimes = 0;
        }
		this.heartbeatRetryTimes = retryTimes;
	}

    public long getHeartbeatRetryInterval() {
        return heartbeatRetryInterval;
	}

    public void setHeartbeatRetryInterval(long retryInterval) {
        if (retryInterval < 0) {
            retryInterval = 1000L;
        }
        this.heartbeatRetryInterval = retryInterval;
	}

    public int getRedisRetryTimes() {
        return redisRetryTimes;
    }

    public void setRedisRetryTimes(int retryTimes) {
        if (retryTimes < 0) {
            retryTimes = 1;
        }
        this.redisRetryTimes = retryTimes;
    }

    public long getRedisRetryInterval() {
        return redisRetryInterval;
    }

    public void setRedisRetryInterval(long retryInterval) {
        if (retryInterval < 0) {
            retryInterval = 0;
        }
        this.redisRetryInterval = retryInterval;
    }

	public String getZkServers() {
		return zkServers;
	}

	public void setZkServers(String zkServers) {
		this.zkServers = zkServers;
	}

	public int getZkSessionTimeout() {
		return zkSessionTimeout;
	}

	public void setZkSessionTimeout(int zkSessionTimeout) {
        if (zkSessionTimeout <= 0) {
            zkSessionTimeout = 5000;
        }
		this.zkSessionTimeout = zkSessionTimeout;
	}

	public ReadPolicy getReadPolicy() {
		return readPolicy;
	}

	public void setReadPolicy(ReadPolicy readPolicy) {
		this.readPolicy = readPolicy;
	}

	public enum ReadPolicy {
		Master, Slave
	}

}