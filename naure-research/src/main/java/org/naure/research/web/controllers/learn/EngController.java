package org.naure.research.web.controllers.learn;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.research.web.models.Eng;
import org.naure.web.integrate.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/18/12
 * Time: 5:58 PM
 * To change this template use File | Settings | File Templates.
 */

@Controller
@RequestMapping(value="learn/eng", method = {RequestMethod.GET, RequestMethod.POST})
public class EngController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return view("eng-view");
    }

    @RequestMapping(value = "get")
    public Information get() {
        Information<Eng> information = new Information<Eng>();
        return information;
    }

    @RequestMapping(value = "add/{name}")
    public Information<String> add(@PathVariable String name) {
        Information<String> information = new Information<String>();
        information.setLevel(InformationLevel.SUCCESS.value());
        return information;
    }

    @RequestMapping(value = "del")
    public Information<String> del() {
        Information<String> information = new Information<String>();
        return information;
    }

    public EngController() {
        viewPath = "learn";
    }
}
