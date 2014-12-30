package org.naur.common.util;

/**
 * 序列化接口
 * 
 * @author hexiaofeng
 * 
 */
public interface ByteSerializer<T> {

	/**
	 * 序列化
	 * 
	 * @param src
	 * @return
	 * @throws Exception
	 */
	byte[] serialize(T src) throws Exception;

	/**
	 * 反序列化
	 * 
	 * @param bytes
	 * @return
	 * @throws Exception
	 */
	T deserialize(byte[] bytes) throws Exception;

}