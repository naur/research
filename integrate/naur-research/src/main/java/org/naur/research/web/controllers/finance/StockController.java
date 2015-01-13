/*
 * @(#) StockController.java 2014-16-07
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.research.web.controllers.finance;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.naur.common.entities.Information;
import org.naur.common.patterns.Tree;
import org.naur.common.patterns.Type;
import org.naur.common.patterns.exception.Func;
import org.naur.integrate.web.ControllerBase;
import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockType;
import org.naur.research.config.SecurityConfiguration;
import org.naur.research.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
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

    @Autowired
    private SecurityConfiguration securityConfiguration;

    /**
     * 页面
     */
    @RequestMapping
    public String view() {
        return view("stock-view");
    }

    @RequestMapping("/{code}/{start}/{end}")
    public Information query(@PathVariable final String code,
                             @PathVariable @DateTimeFormat(iso=ISO.DATE) final Date start,
                             @PathVariable @DateTimeFormat(iso=ISO.DATE) final Date end) {
        //TODO 参数验证
        return handler(new HashMap<String, Object>() {{
            put("code", code);
            put("quotes.date", new Tree(Type.Between)
                    .setLeft(new Tree<Date>(start))
                    .setRight(new Tree<Date>(end)));
        }}, new Func<Map, Information>() {
            @Override
            public Information execute(Map map) throws Exception {
                Information<List<Stock>> info = new Information<List<Stock>>();

                if (StringUtils.isEmpty(code)) {
                    throw new Exception("code error.");
                }

                if (null == start || null == end || end.getTime() - start.getTime() > DateUtils.MILLIS_PER_DAY * 365) {
                    throw new Exception("date error.");
                }

                map.put("type", securityConfiguration.stockTypePrefix.get(code.substring(0, 1)));

                info.setData(stockService.get(map));
                return info;
            }
        });
    }

    {
        viewPath = "finance";
    }
}
