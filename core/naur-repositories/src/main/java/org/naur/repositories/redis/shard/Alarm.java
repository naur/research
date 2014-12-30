/**
 * 
 */
package org.naur.repositories.redis.shard;

/**
 * 报警接口
 * 
 * @author hexiaofeng
 * 
 */
public interface Alarm {

	/**
	 * 节点不健康了
	 * 
	 * @param node
	 */
	void onNodeWeak(Node node);

	/**
	 * 注册中心连接不上了
	 * 
	 * @param servers
	 */
	void onRepositoryWeak(String servers);

	/**
	 * 备份节点切换到主节点失败
	 * 
	 * @param node
	 */
	void onMasterFailed(Node node);

	/**
	 * 没有数据源，节点都不可用
	 * 
	 * @param shard
	 */
	void onNoDataSource(Shard shard);

}
