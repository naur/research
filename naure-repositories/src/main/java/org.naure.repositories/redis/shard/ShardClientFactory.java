package org.naure.repositories.redis.shard;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.locks.ReentrantLock;


import org.naure.repositories.redis.JedisOperation;
import org.naure.repositories.redis.support.LogBasedAlarm;
import org.naure.repositories.redis.support.RedisCommands;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Redis分片主备客户端工厂类
 * 
 * @author hexiaofeng
 * 
 */
public class ShardClientFactory {
	private static final Logger logger = LoggerFactory
			.getLogger(ShardClientFactory.class);

	private String hosts;
	private ShardRedisConfig config;
	private List<Shard> shards = new ArrayList<Shard>();
	private Map<Shard, ShardRedis> shardRedises = new HashMap<Shard, ShardRedis>();
	private ShardPolicy shardPolicy;
	private ShardRepository shardRepository;
	private ShardRedisFactory shardFactory;
	private Heartbeat hearteat;
	private Monitor monitor;
	private boolean closed;
	private ReentrantLock lock = new ReentrantLock();
	private RedisCommands redis;
	private Alarm alarm;

	public void setAlarm(Alarm alarm) {
		this.alarm = alarm;
	}

	public void setHosts(String hosts) {
		this.hosts = hosts;
	}

	public void setConfig(ShardRedisConfig config) {
		this.config = config;
	}

	public void setShardPolicy(ShardPolicy shardHash) {
		this.shardPolicy = shardHash;
	}

	public void setShardRepository(ShardRepository shardRepository) {
		this.shardRepository = shardRepository;
	}

	public void setShardFactory(ShardRedisFactory shardFactory) {
		this.shardFactory = shardFactory;
	}

	/**
	 * 获取RedisCommands对象
	 * 
	 * @return
	 */
	public RedisCommands createShardClient() {
		if (redis != null)
			return redis;
		if (config == null)
			throw new IllegalArgumentException("config is null");
		lock.lock();
		try {
			if (redis != null)
				return redis;
			initialize();
			// 通过Proxy构造代理对象
			redis = (RedisCommands) Proxy.newProxyInstance(
					RedisCommands.class.getClassLoader(),
					new Class[] { RedisCommands.class },
					new InvocationHandler() {

						@Override
						public Object invoke(Object proxy, Method method,
								Object[] args) throws Throwable {
                            String methodName = method.getName();
                            if ("close".equals(methodName)) {
                                close();
                                return null;
                            }

                            if (args != null && args.length > 0) {
                                if ("nativeExecute".equals(methodName)) {
                                    nativeExecute((JedisOperation) args[0]);
                                    return null;
                                }
                                try {
                                    return method.invoke(
                                            getShardRedis(args[0]),
                                            args);
                                } catch (InvocationTargetException e) {
                                    throw e.getCause();
                                }
                            } else {
								throw new UnsupportedOperationException(method
										.getName() + "is not supported.");
							}
						}
					});
		} catch (Exception e) {
			throw new IllegalStateException(e.getMessage(), e);
		} finally {
			lock.unlock();
		}
		return redis;
	}

	/**
	 * 判断对象属于那个类
	 * 
	 * @param key
	 * @return
	 */
	protected ShardRedis getShardRedis(Object key) {
		if (key == null)
			throw new IllegalArgumentException("key is null");
		if (closed)
			throw new IllegalStateException("connection is closed");
		if (shards == null || shards.isEmpty())
			throw new IllegalStateException("shards is empty");
		Shard shard = null;
		if (shards.size() == 1) {
			shard = shards.get(0);
		} else {
			byte[] bytes = null;
			if (key instanceof byte[]) {
				bytes = (byte[]) key;
			} else {
				bytes = key.toString().getBytes();
			}
			shard = shardPolicy.getShard(bytes);
		}
		return shardRedises.get(shard);
	}

	/**
	 * 初始化操作
	 * 
	 * @throws Exception
	 */
	protected void initialize() throws Exception {
		if (shardPolicy == null)
			shardPolicy = new KetamaHashing();

		if (shardRepository == null) {
			shardRepository = new ZkShardRepository(config.getZkServers(),
					config.getZkSessionTimeout(), hosts);
		}

		if (shardFactory == null)
			shardFactory = new MSShardRedisFactory();
		shards = shardRepository.getShards();
		if (shards == null || shards.isEmpty())
			throw new IllegalStateException("shards is empty");

		shardPolicy.setShards(shards);
        if (alarm == null)
            alarm = new LogBasedAlarm();
        monitor = new Monitor(alarm);
		for (Shard shard : shards) {
			ShardRedis shardRedis = shardFactory.createShardRedis(shard,
					config, monitor);
			shardRepository.addListener(shardRedis);
			shardRedises.put(shard, shardRedis);
		}

		hearteat = new Heartbeat(config, monitor, shardRepository );
		hearteat.start();
	}

    protected void nativeExecute(JedisOperation op) {
        for (ShardRedis shardRedis : shardRedises.values()) {
            shardRedis.nativeExecute(op);
        }
    }
	/**
	 * 关闭
	 */
	protected void close() {
		if (closed)
			return;
		try {
			if (hearteat != null && !hearteat.isInterrupted()) {
				hearteat.interrupt();
			}

			for (Entry<Shard, ShardRedis> entry : shardRedises.entrySet()) {
				try {
					entry.getValue().close();
				} catch (Exception suppress) {
					logger.warn("Closing shard redis failed, continue.",
							suppress);
				}
			}
		} finally {
			closed = true;
		}
	}

	@Override
	protected void finalize() throws Throwable {
		super.finalize();
		close();
	}

}