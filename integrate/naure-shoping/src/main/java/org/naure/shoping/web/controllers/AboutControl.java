package org.naure.shoping.web.controllers;

import org.naure.integrate.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 6/27/2014.
 */
@Controller
@RequestMapping(value = "about")
public class AboutControl extends ControllerBase {
    @RequestMapping
    public String view() {
        return view("about");
    }
}
