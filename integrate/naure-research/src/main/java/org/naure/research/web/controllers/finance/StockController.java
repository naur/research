/*
 * @(#) StockController.java 2014-16-07
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.web.controllers.finance;

import org.naure.common.entities.Information;
import org.naure.common.patterns.exception.Func;
import org.naure.integrate.web.ControllerBase;
import org.naure.repositories.models.finance.Stock;
import org.naure.research.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private StockService stockService;

    /**
     * 页面
     */
    @RequestMapping
    public String view() {
        return view("stock-view");
    }

    @RequestMapping("query")
    public Information query() {
        final Map<String, Object> params = new HashMap<String, Object>();
        //TODO 参数验证
        return handler(params, new Func<Map, Information>() {
            @Override
            public Information execute(Map map) throws Exception {
                Information<List<Stock>> info = new Information<List<Stock>>();
                info.setData(stockService.get(params));
                return info;
            }
        });
    }

    {
        viewPath = "finance";
    }
}
