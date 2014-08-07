/*
 * @(#) TaskSchedulerListener.java 2014-49-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.SchedulerListener;
import it.sauronsoftware.cron4j.TaskExecutor;
import org.naure.repositories.models.SchedulerStatus;
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
        //TODO
        this.updateStatus(executor.getGuid(), null, "Launching");
        LOGGER.info(executor.getStatusMessage());
    }

    @Override
    public void taskSucceeded(TaskExecutor executor) {
        //TODO
        this.updateStatus(executor.getGuid(), Calendar.getInstance().getTime(), "Succeeded");
        LOGGER.info(executor.getStatusMessage());
    }

    @Override
    public void taskFailed(TaskExecutor executor, Throwable exception) {
        //TODO
        this.updateStatus(executor.getGuid(), Calendar.getInstance().getTime(), "Failed");
        LOGGER.info(executor.getStatusMessage());
    }

    private void updateStatus(String taskId, Date recent, String message) {
        SchedulerStatus status = new SchedulerStatus();
        status.setRecent(recent);
        status.setMessage(message);
        schedulerContext.updateStatus(taskId, status);
    }
}
