/*
 * @(#) AbstractTask.java 2015-01-19
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private MyTaskExecutionContext context;

    private String name;

    @Override
    public void execute(TaskExecutionContext target)
            throws RuntimeException {
        this.before(target);
        //暂时这么处理，区分手动调用和框架自动调用的情况。
        this.process(null == context ? new MyTaskExecutionContext(target) : context);
        this.after(target);
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
        //暂时这么处理，
        this.context = null;
    }

    public void setContext(MyTaskExecutionContext context) {
        this.context = context;
    }

    @Override
    public boolean supportsStatusTracking() {
        return true;
    }

    @Override
    public boolean supportsCompletenessTracking() {
        return true;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
