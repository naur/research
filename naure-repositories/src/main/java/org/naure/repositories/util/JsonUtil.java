package org.naure.repositories.util;

import org.codehaus.jackson.map.ObjectMapper;

/**
 * JSON序列化
 * 
 * @author hexiaofeng
 * 
 */
public class JsonUtil {

	// 线程安全的
	protected static ObjectMapper mapper = new ObjectMapper();

	/**
	 * 序列化
	 * 
	 * @param src
	 * @return
	 * @throws Exception
	 */
	public static byte[] serialize(Object src) throws Exception {
		String json = mapper.writeValueAsString(src);
		return json.getBytes();
	}

	/**
	 * 反序列化
	 * 
	 * @param bytes
	 * @param clazz
	 * @return
	 * @throws Exception
	 */
	public static <T> T deserialize(byte[] bytes, Class<T> clazz) throws Exception {
		return mapper.readValue(bytes, clazz);
	}

}