/*
 * @(#) ScheduleController.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.web.controllers;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.exception.Func;
import org.naure.repositories.models.Scheduler;
import org.naure.integrate.services.core.scheduler.SchedulerService;
import org.naure.integrate.web.ControllerBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private SchedulerService schedulerService;

    @RequestMapping()
    public String view() {
        return "scheduler";
    }

    /**
     * 获取定时任务信息
     */
    @RequestMapping("task")
    public Information task() {
        return handler(new Information<List<Scheduler>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                information.setData(schedulerService.getTasks(false));
                information.setLevel(InformationLevel.SUCCESS.value());
                return information;
            }
        });
    }

    /**
     * 运行定时任务
     */
    @RequestMapping("task/run/{name}")
    public Information run(
            @PathVariable final String name,
            ServletRequest request) {
        //获取定时任务参数
        final Map params = request.getParameterMap();

        return handler(new Information<List<Scheduler>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                schedulerService.run(name, params);
                information.setLevel(InformationLevel.SUCCESS.value());
                return information;
            }
        });
    }

    /**
     * 开启定时任务
     */
    @RequestMapping("task/start")
    public Information start() {
        return handler(new Information<List<Scheduler>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                schedulerService.start();
                information.setLevel(InformationLevel.SUCCESS.value());
                return information;
            }
        });
    }
}
