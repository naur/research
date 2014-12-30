package org.naur.shoping.web.controllers;

import org.naur.integrate.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 6/27/2014.
 */
@Controller
@RequestMapping(value = "manager")
public class ManagerControl extends ControllerBase {
    @RequestMapping
    public String view() {
        return view("about");
    }
}
