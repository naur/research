package org.naure.web.controllers;

import org.naure.integrate.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/23/12
 * Time: 4:44 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "welcome", method = {RequestMethod.GET, RequestMethod.POST})
public class WelcomeController extends ControllerBase {
    @RequestMapping(method = RequestMethod.GET)
    public String welcome() {
        return "welcome";
    }
}
