/*
 * @(#) JadeControl.java 2014-11-27
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.shoping.web.controllers;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.exception.Sub;
import org.naure.shoping.model.Jade;
import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-11-27
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Controller
@RequestMapping(value = "jade")
public class JadeControl extends ControllerBase {
    @RequestMapping
    public String view() {
        return view("jade");
    }

    /**
     * get
     */
    @RequestMapping("{params}")
    public Information get(@PathVariable final String params) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<List<Jade>> info = new Information<List<Jade>>();
                //info.setData(scheduleService.get(map));
                info.setLevel(InformationLevel.SUCCESS.value());
                return info;
            }
        });
    }
}
