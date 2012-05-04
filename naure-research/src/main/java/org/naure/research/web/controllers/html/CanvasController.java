package org.naure.research.web.controllers.html;

import org.naure.web.integrate.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/12/12
 * Time: 11:42 AM
 * To change this template use File | Settings | File Templates.
 */

@Controller
@RequestMapping(value="/html/canvas")
public class CanvasController extends ControllerBase {

    @RequestMapping(method= RequestMethod.GET)
    public String graph() {
        return "html/canvas-graph";
    }
}
