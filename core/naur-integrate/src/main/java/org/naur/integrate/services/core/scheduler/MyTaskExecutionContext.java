/*
 * @(#) MyTaskExecutionContext.java 2014-20-14
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.Scheduler;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import it.sauronsoftware.cron4j.TaskExecutor;

import java.util.Map;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-20-14
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class MyTaskExecutionContext implements TaskExecutionContext {

    private Map params;
    private Scheduler scheduler;

    public MyTaskExecutionContext(Scheduler scheduler, Map params) {
        this.scheduler = scheduler;
        this.params = params;
    }

    @Override
    public Scheduler getScheduler() {
        return null;
    }

    @Override
    public TaskExecutor getTaskExecutor() {
        return null;
    }

    @Override
    public void setStatusMessage(String message) {

    }

    @Override
    public void setCompleteness(double completeness) {

    }

    @Override
    public void pauseIfRequested() {

    }

    @Override
    public boolean isStopped() {
        return false;
    }

    public Map getParams() {
        return params;
    }
}
