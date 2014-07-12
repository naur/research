/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.properties;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.ObjectMapper;
import org.naure.common.patterns.exception.Action;
import org.naure.repositories.models.Scheduler;
import org.naure.repositories.models.SchedulerStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;

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
@Configuration
public class SchedulerProperties {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerProperties.class);

    private Object lock = new Object();

    //定时任务ID ：Map<taskId, scheduler>
    private Map<String, Scheduler> tasks = new HashMap<String, Scheduler>();
    //定时任务Name ：Map<taskId, scheduler>
    private Map<String, Scheduler> schedulers;
    @Autowired
    private ApplicationContext applicationContext;

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
        if (null != status.getCompleted()) {
            temp.setCompleted(status.getCompleted());
        }
        if (null != status.getDuration()) {
            temp.setDuration(status.getDuration());
        }
        if (null != status.getMessage()) {
            temp.setMessage(status.getMessage());
        }
        if (null != status.getStartTime()) {
            temp.setStartTime(status.getStartTime());
        }
    }

    @Value("${schedulers}")
    public void schedulers(String schedluers) {
        schedulers = new HashMap<String, Scheduler>();

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonParser jp = new JsonFactory().createJsonParser(schedluers);
            jp.nextToken();
            while (jp.nextToken() == JsonToken.START_OBJECT) {
                Scheduler scheduler = mapper.readValue(jp, Scheduler.class);
                if (applicationContext.containsBean(scheduler.getTask().toString())) {
                    scheduler.setTask(applicationContext.getBean(scheduler.getTask().toString()));
                } else {
                    //TODO
                    LOGGER.error("Task:" + scheduler.getTask() + "no exists.");
                }
                schedulers.put(scheduler.getId(), scheduler);
            }
        } catch (Exception ex) {
            LOGGER.equals(ex);
        }
    }

    public List<Scheduler> getSchedulers() {
        return new ArrayList<Scheduler>(schedulers.values());
    }

    public List<Scheduler> getTasks() {
        return new ArrayList<Scheduler>(tasks.values());
    }
}
