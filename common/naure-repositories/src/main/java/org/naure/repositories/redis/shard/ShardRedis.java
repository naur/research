package org.naure.repositories.redis.shard;

import org.naure.repositories.redis.support.RedisCommands;

/**
 * 分片的操作
 * 
 * @author hexiaofeng
 * 
 */
public interface ShardRedis extends RedisCommands, Failover {
}