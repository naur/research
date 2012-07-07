package org.naure.research.web.controllers.algorithms;

import org.naure.common.entities.OffsetInfo;
import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 12/3/11
 * Time: 11:13 AM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "algorithms/math")
public class MathController extends ControllerBase {

    public String view() {
        return view("math-view");
    }

    public MathController() {
        viewPath = "algorithms";
    }
}
