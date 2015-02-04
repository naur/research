/*
 * @(#) SchedulerContext.java 2014-27-07
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.TaskExecutor;
import org.naur.common.patterns.SchedulerProperty;
import org.naur.repositories.models.Scheduler;
import org.naur.repositories.models.SchedulerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * author Administrator
 *
 * 定时任务管理服务
 *
 * 创建日期: 2014-27-07
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
public class SchedulerContext {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerContext.class);

    @Autowired
    private List<AbstractTask> tasks;

    private final Object lock = new Object();

    //定时任务ID ：Map<taskId, scheduler>
    private Map<String, Scheduler> taskIds = new HashMap<String, Scheduler>();
    //定时任务Name ：Map<taskName, scheduler>
    private Map<String, Scheduler> taskNames;

    /**
     * 根据 taskName 获取 taskId
     */
    public String getTaskId(String taskName) {
        String taskId = null;
        if (taskNames.containsKey(taskName)) {
            taskId = taskNames.get(taskName).getId();
        }
        return taskId;
    }

    /**
     * 根据 taskId 获取 taskName
     */
    public String getTaskName(String taskId) {
        String taskName = null;
        if (taskIds.containsKey(taskId)) {
            taskName = taskIds.get(taskId).getName();
        }
        return taskName;
    }

    /**
     * 更新定时任务的 ID 号，并放到 tasks 里
     */
    public void updateTask(String taskName, String taskId) {
        if (taskNames.containsKey(taskName)) {
            taskNames.get(taskName).setId(taskId);
        }
        if (!taskIds.containsKey(taskId)) {
            taskIds.put(taskId, taskNames.get(taskName));
        }
    }

    /**
     * Updatea Task Status
     */
    public void updateStatus(TaskExecutor executor) {
        String taskName = ((AbstractTask) executor.getTask()).getName();
        Scheduler scheduler = taskNames.get(taskName);
        if (null == scheduler) {
            LOGGER.warn("ExecutingTasks not contains in schedulerProperties.tasks");
            return;
        }

        SchedulerStatus temp = scheduler.getStatus();
        if (null == temp) {
            synchronized (lock) {
                temp = new SchedulerStatus();
                scheduler.setStatus(temp);
            }
        }

        temp.setRecent(System.currentTimeMillis());
        temp.setCanPaused(executor.canBePaused());
        temp.setCanStopped(executor.canBeStopped());
        temp.setCompleteness(executor.getCompleteness());
        temp.setCompleted(1D == executor.getCompleteness());
        temp.setMessage(executor.getStatusMessage());
        if (-1 != executor.getStartTime()) {
            temp.setStartTime(executor.getStartTime());
            temp.setDuration(System.currentTimeMillis() - executor.getStartTime());
        }
        LOGGER.info("Task: " + taskName + ", " + temp.toString());
    }

    /**
     * 初始化定时任务，合并所有 SchedulerProperty 到当前的 schedulers 里
     */
    @PostConstruct
    public void init() {
        LOGGER.info("SchedulerContext init.");

        taskNames = new HashMap<String, Scheduler>();
        //TODO 空判断
        for (AbstractTask task : tasks) {
            SchedulerProperty schedulerProperty = AnnotationUtils.getAnnotation(task.getClass(), SchedulerProperty.class);
            if (null != schedulerProperty) {
                String name = task.getClass().getSimpleName();
                task.setName(name);
                Scheduler scheduler = new Scheduler(task);
                scheduler.setName(name);
                scheduler.setFriendlyName(schedulerProperty.name());
                scheduler.setCron(schedulerProperty.cron());
                taskNames.put(name, scheduler);
            }
        }
    }

    public List<Scheduler> getTasks() {
        return new ArrayList<Scheduler>(taskNames.values());
    }
}
