package org.naure.repositories.redis;

import redis.clients.jedis.Jedis;

/**
 * Some operation exists in jedis but not in JedisCommands, for example, shard
 * related. JedisCommands just contains intersection set of methods in shard and
 * non-shard env.
 * 
 * @author xiaofei
 * @since 1.1
 */
public interface JedisOperation {
    /**
     * Callback of jedis.
     * <p>
     * <b>Note:</b> don't close jedis instance in this method.
     * 
     * @param jedis
     * @return
     */
    void call(Jedis jedis);
}
