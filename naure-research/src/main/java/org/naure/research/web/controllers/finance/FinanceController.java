package org.naure.research.web.controllers.finance;

import org.naure.web.ControllerBase;
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
@RequestMapping(value = "finance")
public class FinanceController extends ControllerBase {

    @RequestMapping
    public String view() {
        return view("view");
    }

    public FinanceController() {
        viewPath = "finance";
    }
}
