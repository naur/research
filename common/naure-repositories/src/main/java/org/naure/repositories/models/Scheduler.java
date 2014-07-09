/*
 * @(#) Scheduler.java 2014-07-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.repositories.models;

import org.naure.common.entities.Entity;

import java.util.Date;

/**
 * <pre>
 * author Administrator
 *
 * 定时任务
 *
 * 创建日期: 2014-07-09
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class Scheduler extends Entity {
    //定时任务名字
    private String name;
    //定时任务 cron 表达式
    private String cron;
    //可执行的任务单元
    private Object task;
    //最近运行时间
    private Date recent;

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

    public Date getRecent() {
        return recent;
    }

    public void setRecent(Date recent) {
        this.recent = recent;
    }
}
