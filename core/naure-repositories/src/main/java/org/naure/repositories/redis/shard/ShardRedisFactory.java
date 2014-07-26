package org.naure.repositories.redis.shard;

/**
 * 分片工厂类
 * 
 * @author hexiaofeng
 * 
 */
public interface ShardRedisFactory {

	/**
	 * 
	 * @param shard
	 * @param config
	 * @param monitor
	 * @return
	 */
	ShardRedis createShardRedis(final Shard shard,
                                final ShardRedisConfig config, final Monitor monitor);

}