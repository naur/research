/*
 * @(#) JadeControl.java 2014-11-27
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.shoping.web.controllers;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.exception.Sub;
import org.naure.shoping.models.Jade;
import org.naure.shoping.services.JadeService;
import org.naure.integrate.web.ControllerBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

    @Autowired
    private JadeService jadeService;

    /**
     * jade 页面
     */
    @RequestMapping
    public String view() {
        return view("view");
    }

    /**
     * edit 页面
     */
    @RequestMapping("edit")
    public String edit() {
        return view("edit");
    }

    /**
     * get
     */
    @RequestMapping("get")
    public Information get(@RequestParam final String name, @RequestParam final String classify) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<List<Jade>> info = new Information<List<Jade>>();
                Jade params = new Jade();
                params.setName(name);
                params.setClassify(classify);
                info.setData(jadeService.get(params));
                info.setLevel(InformationLevel.SUCCESS.value());
                return info;
            }
        });
    }

    /**
     * edit
     */
    @RequestMapping("edit/{id}")
    public Information edit(@ModelAttribute final Jade jade) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<String> information = new Information<String>();
                information.setData(jadeService.edit(jade) ? "Success" : "Error");
                information.setLevel(InformationLevel.SUCCESS.value());
                return information;
            }
        });
    }

    /**
     * add
     */
    @RequestMapping("add")
    public Information add(@ModelAttribute final Jade jade) {
        return handler(new Sub<Information>() {
            @Override
            public Information execute() throws Exception {
                Information<String> information = new Information<String>();
                information.setData(jadeService.add(jade) ? "Success" : "Error");
                information.setLevel(InformationLevel.SUCCESS.value());
                return information;
            }
        });
    }

    {
        this.viewPath = "jade";
    }
}
