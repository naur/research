/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.services;

import org.naure.repositories.models.Scheduler;
import org.naure.properties.SchedulerProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    @Autowired
    private SchedulerProperties schedulerProperties;

    /**
     * 获取定时任务信息
     */
    public List<Scheduler> get() {
        return schedulerProperties.schedulers;
    }

    /**
     * 运行定时任务
     */
    public boolean run(String taskName) {
        for (Scheduler scheduler : get()) {

        }

        return true;
    }
}
