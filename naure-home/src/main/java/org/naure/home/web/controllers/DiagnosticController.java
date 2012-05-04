package org.naure.home.web.controllers;


import org.naure.web.integrate.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/diagnostic")
public class DiagnosticController extends ControllerBase {
    @RequestMapping(method = RequestMethod.GET)
    public String test() {
        return view("test");
    }

    public DiagnosticController() {
        viewPath = "diagnostic/";
    }
}
