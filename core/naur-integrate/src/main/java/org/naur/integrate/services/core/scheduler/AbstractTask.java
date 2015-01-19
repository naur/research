/*
 * @(#) AbstractTask.java 2015-01-19
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2015-37-19
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public abstract class AbstractTask extends Task {

    public void execute(TaskExecutionContext context)
            throws RuntimeException {
        this.before(context);
        this.process((MyTaskExecutionContext) context);
        this.after(context);
    }

    public abstract void process(MyTaskExecutionContext context) throws RuntimeException;

    protected void before(TaskExecutionContext context) {
        context.setCompleteness(0);
        context.setStatusMessage(TaskStatus.Start.name());
    }

    protected void loop(MyTaskExecutionContext context) {
        context.counter();
        context.setCompleteness(context.getCounter() / context.getLoop());
    }

    protected void after(TaskExecutionContext context) {
        context.setStatusMessage(TaskStatus.End.name());
        context.setCompleteness(1);
    }
}
