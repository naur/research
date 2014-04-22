package org.naure.research.web.controllers.math;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/29/12
 * Time: 4:52 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "math/probability", method = {RequestMethod.GET, RequestMethod.POST})
public class ProbabilityController extends ControllerBase {

    @RequestMapping(value = "stochastic")
    public String stochastic() {
        return view("probability-stochastic");
    }

    {
        viewPath = "math";
    }
}
