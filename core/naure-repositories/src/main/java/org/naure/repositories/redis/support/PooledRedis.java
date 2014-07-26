package org.naure.repositories.redis.support;

import org.apache.commons.pool.ObjectPool;
import org.naure.repositories.redis.JedisOperation;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Protocol;

/**
 * 池化Redis连接
 * 
 * @author hexiaofeng
 * 
 */
public class PooledRedis extends Jedis implements RedisCommands {

	protected ObjectPool pool;
	protected String user;
	protected String password;
	protected int db;

	/**
	 * 
	 * @param pool
	 * @return
	 */
	public PooledRedis(String host, int port, ObjectPool pool) {
		this(host, port, 0, Protocol.DEFAULT_TIMEOUT, null, null, pool);
	}

	/**
	 * 
	 * @param pool
	 * @return
	 */
	public PooledRedis(String host, int port, String user, String password,
			ObjectPool pool) {
		this(host, port, 0, Protocol.DEFAULT_TIMEOUT, user, password, pool);
	}

	/**
	 * 
	 * @param pool
	 * @return
	 */
	public PooledRedis(String host, int port, int db, int timeOut, String user,
			String password, ObjectPool pool) {
		super(host, port, timeOut);
		this.pool = pool;
		this.user = user;
		this.password = password;
		this.db = db;
		if (this.password != null && !this.password.isEmpty())
			this.client.setPassword(this.password);
	}

	@Override
	public void connect() {
		super.connect();
		if (db > 0)
			select(db);
	}

	@Override
	public void close() {
		if (pool == null){
			disconnect();
			return;
		}
		boolean doInvalidated = false;
		try {
			if (this.client.isConnected()){
				pool.returnObject(this);
			}
			else {
				doInvalidated = true;
				pool.invalidateObject(this);
			}
		} catch (Exception e) {
			if (!doInvalidated){
				try {
					pool.invalidateObject(this);
				} catch (Exception ie) {
				}
			}
		}
	}
	
	/**
	 * @param e
	 */
	public void close(Throwable error){
		if(error==null){
			close();
		}
		else if (pool != null){
			try {
				pool.invalidateObject(this);
			} catch (Exception e) {
			}
		}else{
			disconnect();
		}
	}

    @Override
    public void nativeExecute(JedisOperation op) {
        op.call(this);
    }

    @Override
    public void nativeExecute(String taggedKey, JedisOperation op) {
        op.call(this);
    }

}