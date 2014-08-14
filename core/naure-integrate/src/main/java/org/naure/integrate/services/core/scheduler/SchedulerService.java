/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.*;
import org.naure.repositories.models.Scheduler;
import org.naure.repositories.models.SchedulerStatus;
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

        TaskExecutionContext context = new MyTaskExecutionContext(scheduler, params);
        task.execute(context);
    }

    /**
     * 获取定时任务运行信息
     */
    public List<Scheduler> getTasks(boolean realtime) {
        if (realtime) {
            TaskExecutor[] list = scheduler.getExecutingTasks();
            String taskId = null;
            for (TaskExecutor executor : list) {
                taskId = executor.getGuid();
                SchedulerStatus temp = new SchedulerStatus();
                temp.setStartTime(new Date(executor.getStartTime()));
                temp.setMessage(executor.getStatusMessage());
                temp.setDuration(executor.getCompleteness());
                temp.setCanStopped(executor.canBeStopped());
                temp.setCanStopped(executor.canBeStopped());
                schedulerContext.updateStatus(taskId, temp);
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
        for (Scheduler item : schedulerContext.getSchedulers()) {
            if (!applicationContext.containsBean(item.getTask().toString())) {
                //TODO
                LOGGER.error("Task: " + item.getTask() + " no exists.");
                continue;
            }
            schedulerContext.updateTask(
                    item.getName(),
                    scheduling(
                            item.getCron(),
                            //解析配置文件配置的 task 对应的 bean
                            (Task) applicationContext.getBean(item.getTask().toString())
                    ));
        }
        attachListener(taskSchedulerListener);
    }
}
