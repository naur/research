/*
 * @(#) LabsController.java 2014-04-22
 *
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.web.controllers;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-04-22 13:11
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Controller
@RequestMapping(value = "labs")
public class LabsController extends ControllerBase {

    @RequestMapping
    public String view() {
        return view("view");
    }

    {
        viewPath = "labs";
    }
}
