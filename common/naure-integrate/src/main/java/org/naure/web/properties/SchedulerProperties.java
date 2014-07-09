/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.web.properties;

import org.naure.repositories.models.Scheduler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
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
@Configuration
public class SchedulerProperties {

    @Value("${application.schedulers}")
    public List<Scheduler> schedulers;
}
