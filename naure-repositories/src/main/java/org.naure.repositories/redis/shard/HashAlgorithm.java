package org.naure.repositories.redis.shard;

/**
 * Hash算法
 * 
 * @author hexiaofeng
 * 
 */
public interface HashAlgorithm {

	/**
	 * 
	 * @param value
	 * @return
	 */
	long hash(byte[] value);

}