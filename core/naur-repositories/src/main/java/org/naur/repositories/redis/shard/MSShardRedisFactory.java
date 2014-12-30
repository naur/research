package org.naur.repositories.redis.shard;

import java.lang.reflect.Proxy;

/**
 * 分片主备切换工厂
 * 
 * @author hexiaofeng
 * 
 */
public class MSShardRedisFactory implements ShardRedisFactory {

	@Override
	public ShardRedis createShardRedis(final Shard shard, final ShardRedisConfig config,
			final Monitor monitor) {

		ShardRedis shardRedis = (ShardRedis) Proxy.newProxyInstance(
                MSShardRedisFactory.class.getClassLoader(),
                new Class[]{ShardRedis.class}, new MSShardRedis(shard,
                config, monitor));

		return shardRedis;
	}
}