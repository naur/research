package org.naure.web.controllers;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Administrator on 4/16/14.
 */
@Controller
@RequestMapping(value = "utility", method = {RequestMethod.GET, RequestMethod.POST})
public class UtilityController extends ControllerBase {

    @RequestMapping("dom/{name}")
    public String html(@PathVariable final String name) {
        return "dom/" + name;
    }

    @RequestMapping("restful-client")
    public String restfulClient() {
        return view("js-test");
    }

    @RequestMapping("js-test")
    public String jsText() {
        return view("restful-client");
    }

    public UtilityController() {
        viewPath = "utility";
    }
}
