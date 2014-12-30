/*
 * @(#) SchedulerStatus.java 2014-41-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.repositories.models;

import org.naure.common.entities.Entity;

import java.util.Date;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-41-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class SchedulerStatus extends Entity {
    //最近运行时间
    private Date recent;
    //正在运行的开始时间
    private Date startTime;
    //是否运行结束
    private Boolean completed;
    //运行信息
    private String message;
    //是否可以暂停
    private Boolean canPaused;
    //是否可以停止
    private Boolean canStopped;
    //运行持续时间
    private Double duration;

    public Date getRecent() {
        return recent;
    }

    public void setRecent(Date recent) {
        this.recent = recent;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getCanPaused() {
        return canPaused;
    }

    public void setCanPaused(Boolean canPaused) {
        this.canPaused = canPaused;
    }

    public Boolean getCanStopped() {
        return canStopped;
    }

    public void setCanStopped(Boolean canStopped) {
        this.canStopped = canStopped;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }
}
