/*
 * @(#) SchedulerContext.java 2014-27-07
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.services.core.scheduler;

import it.sauronsoftware.cron4j.TaskExecutor;
import org.naur.repositories.models.Scheduler;
import org.naur.repositories.models.SchedulerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

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
    private List<SchedulerProperty> properties;

    private Object lock = new Object();

    //定时任务ID ：Map<taskId, scheduler>
    private Map<String, Scheduler> tasks = new HashMap<String, Scheduler>();
    //定时任务Name ：Map<taskName, scheduler>
    private Map<String, Scheduler> schedulers;

    /**
     * 根据 taskName 获取 taskId
     */
    public String getTaskId(String taskName) {
        String taskId = null;
        if (schedulers.containsKey(taskName)) {
            taskId = schedulers.get(taskName).getId();
        }
        return taskId;
    }

    /**
     * 根据 taskId 获取 taskName
     */
    public String getTaskName(String taskId) {
        String taskName = null;
        if (tasks.containsKey(taskId)) {
            taskName = tasks.get(taskId).getName();
        }
        return taskName;
    }

    /**
     * 更新定时任务的 ID 号，并放到 tasks 里
     */
    public void updateTask(String taskName, String taskId) {
        if (schedulers.containsKey(taskName)) {
            schedulers.get(taskName).setId(taskId);
        }
        if (!tasks.containsKey(taskId)) {
            tasks.put(taskId, schedulers.get(taskName));
        }
    }

    /**
     * Updatea Task Status
     */
    public void updateStatus(TaskExecutor executor) {
        String taskName = ((AbstractTask) executor.getTask()).getName();
        Scheduler scheduler = schedulers.get(taskName);
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

        temp.setRecent(Calendar.getInstance().getTime());
        temp.setCanPaused(executor.canBePaused());
        temp.setCanStopped(executor.canBeStopped());
        temp.setCompleteness(executor.getCompleteness());
        temp.setCompleted(1D == executor.getCompleteness());
        temp.setMessage(executor.getStatusMessage());
        temp.setStartTime(executor.getStartTime());
        if (-1 != executor.getStartTime()) {
            temp.setDuration(System.currentTimeMillis() - -executor.getStartTime());
        }
        LOGGER.info("Task: " + taskName + ", " + temp.toString());
    }

    /**
     * 初始化定时任务，合并所有 SchedulerProperty 到当前的 schedulers 里
     */
    @PostConstruct
    public void init() {
        schedulers = new HashMap<String, Scheduler>();
        //TODO 空判断
        for (SchedulerProperty property : properties) {
            schedulers.putAll(property.getSchedulers());
        }
    }

    public List<Scheduler> getSchedulers() {
        return new ArrayList<Scheduler>(schedulers.values());
    }

    public List<Scheduler> getTasks() {
        return new ArrayList<Scheduler>(tasks.values());
    }
}
