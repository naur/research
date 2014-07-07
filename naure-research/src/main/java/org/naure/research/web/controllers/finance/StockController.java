/*
 * @(#) StockController.java 2014-16-07
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.web.controllers.finance;

import org.naure.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <pre>
 * author Administrator
 * 股票
 * 创建日期: 2014-16-07
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Controller
@RequestMapping(value = "finance/stock")
public class StockController extends ControllerBase {

    @RequestMapping
    public String view() {
        return view("stock-view");
    }

    {
        viewPath = "finance";
    }
}
