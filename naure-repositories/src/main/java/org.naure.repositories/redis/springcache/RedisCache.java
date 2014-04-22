package org.naure.repositories.redis.springcache;

import org.naure.common.util.ByteSerializer;
import org.naure.repositories.redis.JedisOperation;
import org.naure.repositories.redis.support.RedisCommands;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.support.SimpleValueWrapper;
import org.springframework.util.Assert;
import redis.clients.jedis.Jedis;

import java.nio.charset.Charset;
import java.util.Set;

/**
 * {@link org.springframework.cache.Cache} implementation on top of an {@link RedisCommands} instance.
 * <p>
 * Cache "name" in other cache provider sometimes like region, group, etc. But
 * there is no corresponding concept of "name" in redis (db?). Also, spring
 * cache is very abstract layer of cache, so some special features like TTL
 * should not provide.
 * <p>
 * This implements use "name" for key prefix. For example: @ Cacheable(value =
 * &quot;pre&quot;)
 * 
 * declare that cache item's key is prefixed by "pre".
 * 
 * <p>
 * Cache item with the same "name" (key prefix) , means with the same type and
 * same timeout setting, so there is one {@code ByteSerializer} instance and one
 * timeout setting per Cache .
 * 
 * <p>
 * <b>LIMIT</b>: only support key of string type .
 * 
 * @param T
 *            type of item in cache.
 * 
 * @since 1.2
 * 
 * @author xiaofei
 */
public class RedisCache<T> implements Cache {
    private Log logger = LogFactory.getLog(RedisCache.class);
    private final RedisCommands client;
    /**
     * prefix all keys put into redis
     */
    private final String keyPrefix;
    /**
     * how long(seconds) the key timeout.
     */
    private final Integer entryTimeout;
    
    private final ByteSerializer<T> serializer;
    private final Charset charset = Charset.forName("utf-8");

    public RedisCache(String keyPrefix, RedisCommands client,
            ByteSerializer<T> serializer) {
        this(keyPrefix, null, client, serializer);
    }

    public RedisCache(String keyPrefix,
            Integer entryTimeout, RedisCommands client,
            ByteSerializer<T> serializer) {
        Assert.notNull(client);
        Assert.notNull(keyPrefix);
        Assert.notNull(serializer);
        this.client = client;
        this.keyPrefix = keyPrefix;
        this.entryTimeout = entryTimeout;
        this.serializer = serializer;
    }

    @Override
    public String getName() {
        return keyPrefix;
    }

    @Override
    public RedisCommands getNativeCache() {
        return client;
    }

    @Override
    public ValueWrapper get(Object key) {
        byte[] prefixKey = prefixKey(key);
        if (logger.isDebugEnabled()) {
            logger.debug("Getting from cache, key:"
                    + new String(prefixKey, charset));
        }

        byte[] bVal = client.get(prefixKey);
        if (bVal == null) {
            return null;
        }

        T val;
        try {
            val = serializer.deserialize(bVal);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return (val != null ? new SimpleValueWrapper(val) : null);
    }

    @Override
    public void put(Object key, Object value) {
        if (value == null) {
            return;
        }

        @SuppressWarnings("unchecked")
        T val = (T) value;

        byte[] bVal;
        try {
            bVal = serializer.serialize(val);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        byte[] prefixKey = prefixKey(key);
        if (logger.isDebugEnabled()) {
            logger.debug("Putting into cache, key:"
                    + new String(prefixKey, charset) + ", value:"
                    + new String(bVal, charset));
        }

        if (entryTimeout != null) {
            client.setex(prefixKey, entryTimeout, bVal);
        } else {
            client.set(prefixKey, bVal);
        }
    }

    @Override
    public void evict(final Object key) {
        final String sKey = String.valueOf(key);

        final byte[] prefixKey = prefixKey(key);
        if (logger.isDebugEnabled()) {
            logger.debug("Removing from cache, key " +
                    (sKey.endsWith("*") ? "pattern:" : ":")
                    + new String(prefixKey, charset));
        }

        client.nativeExecute(new JedisOperation() {
            @Override
            public void call(Jedis jedis) {
                if (sKey.endsWith("*")) {
                    Set<byte[]> keys = jedis.keys(prefixKey);
                    if (keys != null && keys.size() > 0) {
                        jedis.del(keys.toArray(new byte[0][0]));
                    }
                } else {
                    jedis.del(prefixKey);
                }
            }
        });
    }

    @Override
    public void clear() {
        if (logger.isDebugEnabled()) {
            logger.debug("Clearing caches, key pattern:"
                    + keyPrefix.concat("*"));
        }

        client.nativeExecute(new JedisOperation() {
            @Override
            public void call(Jedis jedis) {
                if (keyPrefix.isEmpty()) {
                    jedis.flushDB();
                } else {
                    Set<byte[]> keys = jedis.keys(keyPrefix.concat("*")
                            .getBytes(charset));
                    jedis.del(keys.toArray(new byte[0][0]));
                }
            }
        });
    }

    private byte[] prefixKey(Object key) {
        return keyPrefix.concat(String.valueOf(key)).getBytes(charset);
    }

}
