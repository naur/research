/* 
 * LogBasedAlarm.java
 * 
 * Created on 2012-2-6
 * 
 * Copyright(C) 2012, by 360buy.com.
 * 
 * Original Author: zhumiaowen
 * Contributor(s):
 * 
 * Changes 
 * -------
 * $Log$
 */
package org.naure.repositories.redis.support;

import labs.repositories.redis.shard.Alarm;
import labs.repositories.redis.shard.Node;
import labs.repositories.redis.shard.Shard;
import org.apache.log4j.Logger;

/**
 * do nothing,when event come just record the log
 *
 * @author zhumiaowen
 *
 * @version $Id: LogBasedAlarm.java 982 2012-02-06 07:16:13Z zhumiaowen $
 */

public class LogBasedAlarm implements Alarm {
    private final static Logger logger = Logger.getLogger(LogBasedAlarm.class);
	@Override
	public void onNodeWeak(Node node) {
        logger.warn("invoke onNodeWeak(),node=" + node.toString());
	}

	@Override
	public void onRepositoryWeak(String servers) {
        logger.warn("invoke onRepositoryWeak(),servers=" + servers);
	}

	@Override
	public void onMasterFailed(Node node) {
        logger.warn("invoke onMasterFailed(),node=" + node.toString());
	}

	@Override
	public void onNoDataSource(Shard shard) {
        logger.warn("invoke onNoDataSource(),node=" + shard.toString());
	}

}
