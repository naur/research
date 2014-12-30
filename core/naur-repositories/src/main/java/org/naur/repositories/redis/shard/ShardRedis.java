package org.naur.repositories.redis.shard;

import org.naur.repositories.redis.support.RedisCommands;

/**
 * 分片的操作
 * 
 * @author hexiaofeng
 * 
 */
public interface ShardRedis extends RedisCommands, Failover {
}