/*
 * @(#) HouseController.java 2014-22-03
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.web.controllers;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-22-03
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Controller
@RequestMapping(value = "house")
public class HouseController extends ControllerBase {
    @RequestMapping
    public String view(){
        return view("house");
    }
}