package org.naure.repositories.redis.shard;

import labs.repositories.redis.support.RedisCommands;

/**
 * 分片的操作
 * 
 * @author hexiaofeng
 * 
 */
public interface ShardRedis extends RedisCommands, Failover {
}