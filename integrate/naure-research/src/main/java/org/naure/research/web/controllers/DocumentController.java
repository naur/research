package org.naure.research.web.controllers;

import org.naure.integrate.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 7/6/12
 * Time: 9:43 AM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "document")
public class DocumentController extends ControllerBase {

    @RequestMapping
    public String view(){
        return view("document");
    }
}
