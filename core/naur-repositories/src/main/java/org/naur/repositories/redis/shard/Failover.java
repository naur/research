package org.naur.repositories.redis.shard;

/**
 * 故障切换接口
 * 
 * @author hexiaofeng
 * 
 */
public interface Failover {

    /**
     * Indicate shard's health nodes or weak nodes changed.
     * 
     * @param current
     *            which contain new nodes
     * @param leader
     *            whether i am a leader in clients cluster or not
     */
    void onShardChanged(Shard current, boolean leader);

}