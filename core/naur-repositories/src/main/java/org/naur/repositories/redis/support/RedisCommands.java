package org.naur.repositories.redis.support;

import org.naur.repositories.redis.JedisOperation;
import redis.clients.jedis.BinaryJedisCommands;
import redis.clients.jedis.JedisCommands;

/**
 * Redis操作
 * 
 * @author hexiaofeng
 * 
 */
public interface RedisCommands extends BinaryJedisCommands, JedisCommands {

    /**
     * Invoke native jedis method. In shard env, op will be invoked on every
     * shards.
     * 
     * @param op
     * @since 1.1
     * @see org.naur.repositories.redis.JedisOperation
     */
    void nativeExecute(JedisOperation op);

    /**
     * Invoke native jedis method on special shard. Tagged key is needed to hash
     * to special shard, op will be invoked on that shard.
     * 
     * @param taggedKey
     *            not null tagged key, see Hash tags in
     *            http://oldblog.antirez.com/post/redis-presharding.html
     * @param op
     * @since 1.2
     */
    void nativeExecute(String taggedKey, JedisOperation op);

	/**
	 * 
	 * @return
	 */
	void close();
	
}