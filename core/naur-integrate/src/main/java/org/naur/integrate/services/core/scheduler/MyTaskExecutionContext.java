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

    //保存要循环的次数和计数器值，暂时这么定义
    private int loop;
    private int counter = 0;
    private Map params;
    private Scheduler scheduler;
    private TaskExecutionContext target;

    public MyTaskExecutionContext(TaskExecutionContext target) {
        this(null, target, null);
    }

    public MyTaskExecutionContext(Scheduler scheduler, Map params) {
        this(scheduler, null, params);
    }

    public MyTaskExecutionContext(Scheduler scheduler, TaskExecutionContext target, Map params) {
        this.scheduler = scheduler;
        this.target = target;
        this.params = params;
    }

    @Override
    public Scheduler getScheduler() {
        return this.scheduler;
    }

    @Override
    public TaskExecutor getTaskExecutor() {
        return null;
    }

    @Override
    public void setStatusMessage(String message) {
        if (null != target) {
            target.setStatusMessage(message);
        }
    }


    @Override
    public void setCompleteness(double completeness) {
        if (null != target) {
            target.setCompleteness(completeness);
        }
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

    public int getCounter() {
        return counter;
    }

    public void setCounter(int counter) {
        this.counter = counter;
    }

    public int getLoop() {
        return loop;
    }

    public void setLoop(int loop) {
        this.loop = loop;
    }

    public void counter() {
        this.counter++;
    }
}
