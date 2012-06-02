package org.naure.web.controllers;

import org.naure.web.integrate.ControllerBase;
import org.naure.web.integrate.HttpSessionFilter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/1/12
 * Time: 3:16 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "error", method = {RequestMethod.GET, RequestMethod.POST})
public class ErrorController extends ControllerBase {
    @RequestMapping()
    public String view() {
        HttpSessionFilter.session.get();
        return view("error");
    }
}
