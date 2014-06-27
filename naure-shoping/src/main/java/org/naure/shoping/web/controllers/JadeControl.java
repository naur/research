/*
 * @(#) JadeControl.java 2014-11-27
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.shoping.web.controllers;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
