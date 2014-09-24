package org.naure.research.web.controllers.learn;

import org.codehaus.jackson.map.ObjectMapper;
import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.Tree;
//import org.naure.common.patterns.TreeType;
import org.naure.common.patterns.Type;
import org.naure.common.patterns.exception.Sub;
import org.naure.repositories.models.learn.Schedule;
import org.naure.research.services.ScheduleService;
import org.naure.integrate.web.ControllerBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/9/12
 * Time: 7:01 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "learn/schedule", method = {RequestMethod.GET, RequestMethod.POST})
public class ScheduleController extends ControllerBase {
    @RequestMapping("")
    public String view() {
        return view("schedule-view");
    }

    /**
     * delete
     *
     * @param params 1,2,3,...
     * @return
     */
    @RequestMapping("delete/{params}")
    public Information delete(@PathVariable final String params) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<Boolean> info = new Information<Boolean>();
                Schedule schedule = new Schedule();
                schedule.setPath(params);
                info.setData(scheduleService.delete(schedule));
                info.setLevel(InformationLevel.SUCCESS.value());
                return info;
            }
        });
    }

    /**
     * get
     *
     * @param params 1,2,3...
     * @return
     */
    @RequestMapping("{params}")
    public Information get(@PathVariable final String params) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<List<Schedule>> info = new Information<List<Schedule>>();
                Map<String, Object> map = new HashMap<String, Object>();
                if (params.isEmpty() || "all".equals(params))
                    map.put("path", new Tree<String>(Type.Regex, "^\\d+,"));
                else {
                    //map.put("path", new Tree<String>(Type.Regex, "^[" + params.replace(",", "|") + "]+,"));
                    map.put("path", new Tree<String>(Type.Regex, "^" + params));
                }
                map.put("pageSize", 100);

                info.setData(scheduleService.get(map));
                info.setLevel(InformationLevel.SUCCESS.value());
                return info;
            }
        });
    }

    @RequestMapping("edit/{params}")
    public Information edit(@PathVariable final String params) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<String> information = new Information<String>();
                if (params.isEmpty()) {
                    information.setData("params is empty!");
                    information.setLevel(InformationLevel.ERROR.value());
                } else {
                    String jsonParams = String.format(
                            "{%0$s}",
                            params.replaceAll("([^=^,]+)=([^=^,]+)", "\"$1\":\"$2\"")
                    );
                    Schedule schedule = new ObjectMapper().readValue(jsonParams, Schedule.class);
                    information.setData(scheduleService.edit(schedule) ? "Success" : "Error");
                    information.setLevel(InformationLevel.SUCCESS.value());
                }
                return information;
            }
        });
    }

    @RequestMapping("edit/{path}/{params}")
    public Information add(@PathVariable final String path, @PathVariable final String params) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<String> information = new Information<String>();
                if (params.isEmpty()) {
                    information.setData("params is empty!");
                    information.setLevel(InformationLevel.ERROR.value());
                } else {
                    String jsonParams = String.format(
                            "{%0$s}",
                            //替换 [pages=11,days=3,heading=XXX,time=2014] 为 [pages:11,days:3,heading:XXX,time:2014]
                            params.replaceAll("([^=^,]+)=([^=^,]+)", "\"$1\":\"$2\"")
                    );
                    Schedule schedule = new ObjectMapper().readValue(jsonParams, Schedule.class);
                    schedule.setPath(path);
                    information.setData(scheduleService.edit(schedule) ? "Success" : "Error");
                    information.setLevel(InformationLevel.SUCCESS.value());
                }
                return information;
            }
        });
    }

    public ScheduleController() {
        viewPath = "learn";
    }

    @Autowired
    private ScheduleService scheduleService;
}
