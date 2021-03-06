/*
 * @(#) TaskSchedulerListener.java 2014-49-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.SchedulerListener;
import it.sauronsoftware.cron4j.TaskExecutor;
import org.naur.repositories.models.SchedulerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.Override;
import java.lang.Throwable;
import java.util.Calendar;
import java.util.Date;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-49-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
public class TaskSchedulerListener implements SchedulerListener {

    private final static Logger LOGGER = LoggerFactory.getLogger(TaskSchedulerListener.class);

    @Autowired
    private SchedulerContext schedulerContext;

    @Override
    public void taskLaunching(TaskExecutor executor) {
        schedulerContext.updateStatus(executor);
    }

    @Override
    public void taskSucceeded(TaskExecutor executor) {
        schedulerContext.updateStatus(executor);
    }

    @Override
    public void taskFailed(TaskExecutor executor, Throwable exception) {
        schedulerContext.updateStatus(executor);
        LOGGER.info(executor.getStatusMessage());
    }
}
