package org.naure.research.web.controllers.map;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/16/12
 * Time: 9:02 AM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "map", method = {RequestMethod.GET, RequestMethod.POST})
public class MapController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return view("view");
    }

    @RequestMapping(value = "path")
    public String path() {
        return view("eng-view");
    }

    public MapController() {
        this.viewPath = "map";
    }
}
