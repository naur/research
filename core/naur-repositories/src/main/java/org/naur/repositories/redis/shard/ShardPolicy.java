package org.naur.repositories.redis.shard;

import java.util.List;

/**
 * Hash一致性算法
 * 
 * @author hexiaofeng
 * 
 */
public interface ShardPolicy {

	/**
	 * 设置分片大小
	 * 
	 * @param shards
	 * @return
	 */
	void setShards(List<Shard> shards);

	/**
	 * 获取分片
	 * 
	 * @param key
	 * @return
	 */
	Shard getShard(byte[] key);

    /**
     * 获取分片
     * 
     * @param key
     * @return
     * 
     * @since 1.2
     */
    Shard getShard(String key);

}