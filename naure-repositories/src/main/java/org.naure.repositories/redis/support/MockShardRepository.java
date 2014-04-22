package org.naure.repositories.redis.support;

import labs.repositories.redis.shard.Failover;
import labs.repositories.redis.shard.Shard;
import labs.repositories.redis.shard.ShardRepository;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * ShardRepository mock implements for test environment which do not need
 * failover.
 * 
 * @author xiaofei
 */
public class MockShardRepository implements ShardRepository {
    private static final Logger logger = Logger
            .getLogger(MockShardRepository.class);
    private final List<Shard> shards;

    public MockShardRepository(String redisHosts) {
        String[] hosts = redisHosts.split("\\s");
        List<Shard> shards = new ArrayList<Shard>(hosts.length);
        for (int i = 0; i < hosts.length; i++) {
            Shard shard = new Shard(i + 1, hosts[i]);
            shards.add(shard);
        }

        this.shards = Collections.unmodifiableList(shards);
    }

    @Override
    public void addListener(Failover failover) {
        logger.warn("You are using MockShardRepository, failover not supported!");
    }

    @Override
    public List<Shard> getShards() throws Exception {
        return shards;
    }

    @Override
    public void updateShard(Shard shard) throws Exception {
        logger.warn("You are using MockShardRepository, shard modification not supported!");
    }

    @Override
    public boolean isAlive() {
        return true;
    }

    @Override
    public boolean isLeader() {
        return true;
    }

    @Override
    public void close() {
    }

}
