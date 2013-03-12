package org.naure.repositories.redis.support;

import redis.clients.jedis.BinaryJedisCommands;
import redis.clients.jedis.JedisCommands;

import org.naure.repositories.redis.JedisOperation;

/**
 * Redis操作
 * 
 * @author hexiaofeng
 * 
 */
public interface RedisCommands extends BinaryJedisCommands, JedisCommands {

    /**
     * Invoke native jedis method. In shard env, op will be invoked against
     * every shard.
     * 
     * @param op
     * @return
     * @since 1.1
     * @see org.naure.repositories.redis.JedisOperation
     */
    void nativeExecute(JedisOperation op);

	/**
	 * 
	 * @return
	 */
	void close();
	
}