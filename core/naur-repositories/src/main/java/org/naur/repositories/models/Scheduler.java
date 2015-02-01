/*
 * @(#) Scheduler.java 2014-07-09
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.repositories.models;

import org.naur.common.entities.Entity;

/**
 * 定时任务
 * <p>
 * 创建日期: 2014-07-09
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 */
public class Scheduler extends Entity {
    private static final long serialVersionUID = -6380269181051050555L;
    //定时任务名字
    private String name;
    //定时任务名字
    private String friendlyName;
    //定时任务 cron 表达式
    private String cron;
    //可执行的任务单元
    private Object task;
    //任务运行状态
    private SchedulerStatus status;

    public Scheduler(Object task) {
        this.task = task;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }

    public Object getTask() {
        return task;
    }

    public void setTask(Object task) {
        this.task = task;
    }

    public SchedulerStatus getStatus() {
        return status;
    }

    public void setStatus(SchedulerStatus status) {
        this.status = status;
    }

    public String getFriendlyName() {
        return friendlyName;
    }

    public void setFriendlyName(String friendlyName) {
        this.friendlyName = friendlyName;
    }
}
