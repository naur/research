/*
 * @(#) ScheduleController.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.web.controllers;

import it.sauronsoftware.cron4j.SchedulerListener;
import org.naure.common.entities.Information;
import org.naure.common.patterns.exception.Func;
import org.naure.repositories.models.Scheduler;
import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * <pre>
 * author Administrator
 *
 * 定时任务
 *
 * 创建日期: 2014-01-09
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Controller
@RequestMapping(value = "scheduler", method = {RequestMethod.GET, RequestMethod.POST})
public class SchedulerController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return "scheduler";
    }

    /**
     * 获取定时任务信息
     */
    public Information task() {
        return handler(new Information<Scheduler>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                return null;
            }
        });
    }
}
