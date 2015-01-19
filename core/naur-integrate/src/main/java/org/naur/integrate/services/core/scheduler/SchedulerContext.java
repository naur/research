/*
 * @(#) SchedulerContext.java 2014-27-07
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.services.core.scheduler;

import org.naur.repositories.models.Scheduler;
import org.naur.repositories.models.SchedulerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    private List<SchedulerProperty> properties;

    private Object lock = new Object();

    //定时任务ID ：Map<taskId, scheduler>
    private Map<String, Scheduler> tasks = new HashMap<String, Scheduler>();
    //定时任务Name ：Map<taskId, scheduler>
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
    public void updateStatus(String taskId, SchedulerStatus status) {

        if (!tasks.containsKey(taskId)) {
            LOGGER.warn("ExecutingTasks not contains in schedulerProperties.tasks");
            return;
        }

        if (null == schedulers.get(taskId).getStatus()) {
            synchronized (lock) {
                schedulers.get(taskId).setStatus(new SchedulerStatus());
            }
        }
        SchedulerStatus temp = schedulers.get(taskId).getStatus();
        if (null != status.getRecent()) {
            temp.setRecent(status.getRecent());
        }
        if (null != status.getCanPaused()) {
            temp.setCanPaused(status.getCanPaused());
        }
        if (null != status.getCanStopped()) {
            temp.setCanStopped(status.getCanStopped());
        }
        temp.setCompleted(status.getCompleted());
        if (null != status.getDuration()) {
            temp.setDuration(status.getDuration());
        }
        if (null != status.getMessage()) {
            temp.setMessage(status.getMessage());
        }
        temp.setStartTime(status.getStartTime());
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
