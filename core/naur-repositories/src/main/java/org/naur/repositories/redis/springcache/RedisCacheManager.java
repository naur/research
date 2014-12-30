package org.naur.repositories.redis.springcache;

import org.springframework.cache.Cache;
import org.springframework.cache.support.AbstractCacheManager;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class RedisCacheManager extends AbstractCacheManager {
    private Collection<? extends Cache> prefinedCaches;

    public void setCaches(List<RedisCache<?>> caches) {
        this.prefinedCaches = caches;
    }

    @Override
    protected Collection<? extends Cache> loadCaches() {
        if (prefinedCaches == null) {
            return Collections.emptyList();
        }
        return prefinedCaches;
    }

    @Override
    public Cache getCache(String name) {
        Cache cache = super.getCache(name);
        if (cache == null) {
            // fail fast, all cache must be predefined.
            throw new NullPointerException("No such cache defined:" + name);
        }
        return cache;
    }
}
