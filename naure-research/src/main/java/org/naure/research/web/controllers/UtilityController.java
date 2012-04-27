package org.naure.research.web.controllers;

import org.naure.common.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/15/12
 * Time: 8:31 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value="/utility")
public class UtilityController extends ControllerBase {
    @RequestMapping(value = "restful-client", method = RequestMethod.GET)
    public String restfulClient() {
        return view("js-test");
    }

    @RequestMapping(value = "js-test", method = RequestMethod.GET)
    public String jsText() {
        return view("restful-client");
    }

    public UtilityController(){
        viewPath = "utility/";
    }
}
