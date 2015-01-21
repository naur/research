/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.*;
import org.naur.repositories.models.Scheduler;
import org.naur.repositories.models.SchedulerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

/**
 * <pre>
 * author Administrator
 *
 * 定时任务管理服务
 *
 * 创建日期: 2014-01-09
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
public class SchedulerService {

    private final static Logger LOGGER = LoggerFactory.getLogger(SchedulerService.class);

    @Autowired
    private ApplicationContext applicationContext;
    @Autowired
    private TaskSchedulerListener taskSchedulerListener;
    @Autowired
    private SchedulerContext schedulerContext;
    //任务调度
    private it.sauronsoftware.cron4j.Scheduler scheduler = new it.sauronsoftware.cron4j.Scheduler();

    /**
     * scheduling，返回 TaskId
     */
    public String scheduling(String cron, Task task) {
        return scheduler.schedule(cron, task);
    }

    /**
     * 手动运行定时任务
     */
    public void run(String taskName, Map params) throws Exception {
        Task task = null;
        String taskId = schedulerContext.getTaskId(taskName);
        if (null == taskId || (task = scheduler.getTask(taskId)) == null) {
            return;
        }

        ((AbstractTask) task).setContext(new MyTaskExecutionContext(scheduler, params));
        //通过框架调用可以 notifyTaskLaunching
        scheduler.launch(task);
    }

    /**
     * 获取定时任务运行信息
     */
    public List<Scheduler> getTasks(boolean realtime) {
        if (realtime) {
            TaskExecutor[] list = scheduler.getExecutingTasks();
            for (TaskExecutor executor : list) {
                schedulerContext.updateStatus(executor);
            }
        }
        return schedulerContext.getTasks();
    }

    /**
     * 开启定时任务
     */
    public void start(String... taskIds) {
        //如果没有传值，那么开始所有的定时任务
        if (0 >= taskIds.length) {
            scheduler.start();
        } else {
            for (String id : taskIds) {
                //TODO 不支持开启单独的定时任务
                //scheduler.deschedule(id);
            }
        }
    }

    /**
     * 停止定时任务
     */
    public void stop(String... taskIds) {
        //如果没有传值，那么停止所有的定时任务
        if (0 >= taskIds.length) {
            scheduler.stop();
        } else {
            for (String id : taskIds) {
                //TODO 停止了的定时任务就不能重新开启了
                scheduler.deschedule(id);
            }
        }
    }

    /**
     * attach listener
     */
    public void attachListener(SchedulerListener listener) {
        scheduler.addSchedulerListener(listener);
    }

    /**
     * remove listener
     */
    public void removeListener(SchedulerListener listener) {
        scheduler.removeSchedulerListener(listener);
    }

    /**
     * 初始化定时任务
     */
    @PostConstruct
    public void init() {
        LOGGER.info("SchedulerService init.");

        for (Scheduler item : schedulerContext.getSchedulers()) {
            if (!applicationContext.containsBean(item.getTask().toString())) {
                //TODO
                LOGGER.error("Task: " + item.getTask() + " no exists.");
                continue;
            }
            //解析配置文件配置的 task 对应的 bean
            AbstractTask task = (AbstractTask) applicationContext.getBean(item.getTask().toString());
            task.setName(item.getName());

            schedulerContext.updateTask(
                    item.getName(),
                    scheduling(item.getCron(), task)
            );
            LOGGER.info("Task: " + item.getTask() + " scheduling.");
        }
        attachListener(taskSchedulerListener);
    }
}
