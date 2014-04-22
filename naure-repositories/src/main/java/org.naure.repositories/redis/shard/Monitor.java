package org.naure.repositories.redis.shard;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 监控
 * 
 * @author hexiaofeng
 * 
 */
public class Monitor implements Alarm {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = LoggerFactory.getLogger(Monitor.class);

	private final Statistic stat = new Statistic();// 访问统计
	private final Map<Shard, Long> lastSuccessTimes = new ConcurrentHashMap<Shard, Long>();// 上次成功时间
	private final Map<Shard, Long> lastFailTimes = new ConcurrentHashMap<Shard, Long>();// 上次失败时间
	private Alarm alarm;

	public Monitor(Alarm alarm) {
		this.alarm = alarm;
	}

	public Alarm getAlarm() {
		return alarm;
	}
	
	

	public Statistic getStatistic() {
		return this.stat;
	}

	/**
	 * 
	 * @param shard
	 * @return
	 */
	public Long getLastSuccessTime(Shard shard) {
		return lastSuccessTimes.get(shard);
	}

	/**
	 * 
	 * @param shard
	 * @return
	 */
	public Long getLastFailTime(Shard shard) {
		return lastFailTimes.get(shard);
	}

	/**
	 * 
	 * @param shard
	 * @param time
	 * @return
	 */
	public void onSuccess(Shard shard, long time) {
		stat.success.incrementAndGet();
		stat.successElapse.addAndGet(time);

		lastSuccessTimes.put(shard, System.currentTimeMillis());
	}

	/**
	 * 
	 * @param shard
	 * @param time
	 * @return
	 */
	public void onFail(Shard shard, long time) {
		stat.fail.incrementAndGet();
		stat.failElapse.addAndGet(time);

		lastFailTimes.put(shard, System.currentTimeMillis());
	}

	public static class Statistic {
		public final AtomicLong success = new AtomicLong(0);
		public final AtomicLong fail = new AtomicLong(0);
		public final AtomicLong successElapse = new AtomicLong(0);
		public final AtomicLong failElapse = new AtomicLong(0);
	}

	@Override
	public void onNodeWeak(Node node) {
		if(alarm!=null){
			try {
				alarm.onNodeWeak(node);
			} catch (Exception e) {
				logger.error("failed onNodeWeak",e);
			}
		}
	}

	@Override
	public void onRepositoryWeak(String servers) {
		if(alarm!=null){
			try {
				alarm.onRepositoryWeak(servers);
			} catch (Exception e) {
				logger.error("failed onRepositoryWeak",e);
			}
		}
	}

	@Override
	public void onMasterFailed(Node node) {
		if(alarm!=null){
			try {
				alarm.onMasterFailed(node);
			} catch (Exception e) {
				logger.error("failed onMasterFailed",e);
			}
		}
	}

	@Override
	public void onNoDataSource(Shard shard) {
        onFail(shard, 0);
		if(alarm!=null){
			try {
				alarm.onNoDataSource(shard);
			} catch (Exception e) {
				logger.error("failed onNoDataSource",e);
			}
		}
	}

}