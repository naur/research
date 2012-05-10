package org.naure.research.web.controllers.algorithms;

import org.naure.common.entities.OffsetInfo;
import org.naure.web.integrate.ControllerBase;
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
@RequestMapping(value = "/algorithms/*")
public class DemoController extends ControllerBase {

    @RequestMapping(value = "demo")
    public String demo() {
        return view("demo");
    }

    @RequestMapping(value = "arbor")
    public String arbor() {
        return view("arbor");
    }

    @RequestMapping(value = "heapsort")
    public String heapsort() {
        return view("heapsort");
    }

    @RequestMapping(value = "analysis")
    public String analysis () {
        return view("analysis");
    }

    private void demoWeak() {
        List<OffsetInfo> list = new ArrayList<OffsetInfo>();

        for (int i = 0; i < 1000000; i++) {
            list.add(new OffsetInfo(1, "aaa"));
        }

        WeakReference weak2 = new WeakReference(list);

        System.out.println("------ step 1 ------");
        System.out.println(weak2.get() == null ? null : "Not NULL");
        System.out.println(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory());

        System.gc();
        System.out.println("------ step 2 ------");
        System.out.println(weak2.get() == null ? null : "Not NULL");
        System.out.println(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory());

        list = null;
        System.out.println("------ step 3 ------");
        System.out.println(weak2.get() == null ? null : "Not NULL");
        System.out.println(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory());
        System.gc();
        System.out.println("------ step 4 ------");
        System.out.println(weak2.get() == null ? null : "Not NULL");
        System.out.println(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory());

        weak2 = null;
        System.gc();
        System.out.println("------ step 5 ------");
        System.out.println(weak2);
        System.out.println(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory());

    }

    private void bitOperation() {
        int a = 923456;
        System.out.println(Integer.toBinaryString(a));
        System.out.println(923456 % 100000);
        System.out.println(1923456 % 100000);
        System.out.println(92883456 % 100000);
        System.out.println(23456 % 100000);
        System.out.println(456 % 100000);
        System.out.println("------------");
    }

    public DemoController(){
        viewPath = "algorithms/";
    }
}
