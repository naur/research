/* 
 * JedisClient.java
 * 
 * Created on 2011-12-29
 * 
 * Copyright(C) 2011, by 360buy.com.
 * 
 * Original Author: LiangWang
 * Contributor(s):
 * 
 * Changes 
 * -------
 * $Log$
 */
package org.naur.research.labs.nosql;

import org.naur.repositories.redis.shard.ShardClientFactory;
import org.naur.repositories.redis.shard.ShardRedisConfig;
import org.naur.repositories.redis.support.RedisCommands;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.Properties;

public class JedisCacheClient {

    private static final Logger log = LoggerFactory.getLogger(JedisCacheClient.class);
    private static final Properties jedisProp = new Properties();
    private static ShardRedisConfig shardRedisConfig;
    private static ShardClientFactory shardClientFactory;
    private static RedisCommands jedis;
    private int defaultCacheExpir = 30 * 24 * 60 * 60;
    // 使用单例
    private static JedisCacheClient instance;
    private static Object lock = new Object();

    private JedisCacheClient() {
    }

    //private static  JedisPool pool;

    static {
        InputStream inStream = JedisCacheClient.class.getResourceAsStream("/redis.properties");
        try {
            jedisProp.load(inStream);
            if (inStream != null) {
                log.debug("load redis.properties file success! " + jedisProp);
            }
            shardRedisConfig = new ShardRedisConfig();
            shardRedisConfig.setMinEvictableIdleTimeMillis(30000);
            shardRedisConfig.setHeartbeat(Long.parseLong(jedisProp.getProperty("redis.heartbeat")));
            shardRedisConfig.setMaxActive(Integer.parseInt(jedisProp.getProperty("redis.maxActive")));
            shardRedisConfig.setMaxIdle(Integer.parseInt(jedisProp.getProperty("redis.maxIdle")));
            shardRedisConfig.setMaxWait(Integer.parseInt(jedisProp.getProperty("redis.maxWait")));
            shardRedisConfig.setTimeOut(Integer.parseInt(jedisProp.getProperty("redis.timeout")));
            shardRedisConfig.setHeartbeatRetryTimes(Integer.parseInt(jedisProp.getProperty("redis.heartbeatRetryTimes")));
            shardRedisConfig.setHeartbeatRetryInterval(Long.parseLong(jedisProp.getProperty("redis.heartbeatRetryInterval")));
            shardRedisConfig.setRedisRetryTimes(Integer.parseInt(jedisProp.getProperty("redis.redisRetryTimes")));
            shardRedisConfig.setRedisRetryInterval(Long.parseLong(jedisProp.getProperty("redis.redisRetryInterval")));
            shardRedisConfig.setZkServers(jedisProp.getProperty("redis.zkServers"));
            shardRedisConfig.setZkSessionTimeout(Integer.parseInt(jedisProp.getProperty("redis.zkSessionTimeout")));

            shardClientFactory = new ShardClientFactory();
            shardClientFactory.setConfig(shardRedisConfig);
            shardClientFactory.setHosts(jedisProp.getProperty("redis.hosts"));

            System.out.println("redis: " + jedisProp.getProperty("redis.hosts") + "\tzkServers: " + jedisProp.getProperty("redis.zkServers"));

            jedis = shardClientFactory.createShardClient();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    public static JedisCacheClient getInstance() {
        if (instance == null) {
            synchronized (lock) {
                if (instance == null) instance = new JedisCacheClient();
            }
        }
        return instance;
    }

    public RedisCommands getJedis() {
        return jedis;
    }

}
