/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.services;

import org.naure.common.patterns.exception.Action;
import org.naure.common.patterns.Context;
import org.naure.repositories.models.Scheduler;
import org.naure.properties.SchedulerProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

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

    private it.sauronsoftware.cron4j.Scheduler scheduler = new it.sauronsoftware.cron4j.Scheduler();

    /**
     * 获取定时任务信息
     */
    public Map<String, Scheduler> get() {
        return schedulerProperties.schedulers;
    }

    /**
     * 手动运行定时任务
     */
    public void run(String taskName, Context context) throws Exception {
        if (get().containsKey(taskName)) {
            get().get(taskName).getTask().execute(context);
        }
    }

    /**
     * 停止定时任务
     *
     * @param taskName
     */
    public void stop(String taskName) {

    }

    /**
     * 初始化定时任务
     */
    @PostConstruct
    public void init() {
        for (Map.Entry<String, Scheduler> entry : get().entrySet()) {
            //scheduler.schedule(entry.getValue().getCron(), );
        }
    }
}
