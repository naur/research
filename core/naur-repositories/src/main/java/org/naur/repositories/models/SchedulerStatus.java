/*
 * @(#) SchedulerStatus.java 2014-41-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.repositories.models;

import org.naur.common.entities.Entity;

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
    private long startTime;
    //运行的进度
    private boolean completed;
    private double completeness;
    //运行信息
    private String message;
    //是否可以暂停
    private Boolean canPaused;
    //是否可以停止
    private Boolean canStopped;
    //运行持续时间
    private Long duration;

    public Date getRecent() {
        return recent;
    }

    public void setRecent(Date recent) {
        this.recent = recent;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }
    
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public double getCompleteness() {
        return completeness;
    }

    public void setCompleteness(double completeness) {
        this.completeness = completeness;
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

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }
}
