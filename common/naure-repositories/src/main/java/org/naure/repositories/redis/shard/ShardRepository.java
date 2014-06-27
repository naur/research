package org.naure.repositories.redis.shard;

import java.util.List;

/**
 * Shard持久化接口
 * 
 * @author hexiaofeng
 * 
 */
public interface ShardRepository {

	/**
	 * register failover to handle changes of shard
	 * 
	 * @param failover
	 */
	void addListener(Failover failover);

	/**
	 * 
	 * @return
	 */
	List<Shard> getShards() throws Exception;

	/**
	 * 
	 * @param shard
	 * @return
	 */
	void updateShard(Shard shard) throws Exception;

	/**
	 * 检测服务器是否正常
	 * 
	 * @return
	 */
	boolean isAlive();

	/**
	 * 是否是Leader
	 * 
	 * @return
	 */
	boolean isLeader();

	/**
	 * 关闭
	 */
	void close();

}