/*
 * @(#) StockTask.java 2014-44-10
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.task;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import org.apache.commons.lang3.time.DateUtils;
import org.naure.common.patterns.Func;
import org.naure.common.patterns.exception.Action;
import org.naure.common.util.DateUtil;
import org.naure.common.util.EnumerableUtils;
import org.naure.integrate.services.core.scheduler.MyTaskExecutionContext;
import org.naure.repositories.models.finance.Stock;
import org.naure.repositories.models.finance.StockRange;
import org.naure.repositories.models.finance.StockType;
import org.naure.research.config.SecurityConfiguration;
import org.naure.research.services.StockService;
import org.naure.research.services.StockWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/**
 * <pre>
 * author jiaruizhi
 * 定时任务获取前一个工作日的历史数据
 * 创建日期: 2014-44-10
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
public class StockHistoryTask extends Task implements Serializable {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockHistoryTask.class);
    private DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private StockWebService stockWebService;
    @Autowired
    private StockService stockService;
    @Autowired
    private SecurityConfiguration securityConfiguration;


    @Override
    public void execute(TaskExecutionContext context) throws RuntimeException {
        //默认当天的前一个工作日
        Date startDate = DateUtil.getPrevWeekDay(Calendar.getInstance().getTime());
        Date endDate = startDate;
        StockRange stockRange = null;
        //TODO 解析 params, 包含【startDate, endDate, stock】
        if (context instanceof MyTaskExecutionContext) {
            Map params = ((MyTaskExecutionContext) context).getParams();
            try {
                if (params.containsKey("startDate")) {
                    startDate = dateFormat.parse(params.get("startDate").toString());
                }
                if (params.containsKey("endDate")) {
                    endDate = dateFormat.parse(params.get("endDate").toString());
                }
                //TODO 暂时只支持指定单独一个 stock: SH000711
                if (params.containsKey("stock")) {
                    String stock = params.get("stock").toString();
                    String stockType = stock.substring(0, 2).toUpperCase();
                    int stockCode = Integer.parseInt(stock.substring(2));
                    stockRange = new StockRange(StockType.valueOf(stockType), stockCode, stockCode);
                }
            } catch (ParseException e) {
                LOGGER.error("Task: StockCapitalTask", e);
            }
        }

        if (null != stockRange) {
            //页面传值
            acquireStock(stockRange, startDate, endDate);
        } else {
            //定时任务
            for (StockRange range : securityConfiguration.getStockRanges()) {
                acquireStock(range, startDate, endDate);
            }
        }
    }

    private void acquireStock(StockRange range, Date... date) {
        Stock stock = null;
        String id = null;
        for (int i = range.start; i <= range.end; i++) {

            id = range.getCode(i);

            if (securityConfiguration.filter.contains(id)) {
                continue;
            }

            try {
                stock = stockWebService.getHistory(id, date);
                //验证
                if (!CollectionUtils.isEmpty(stock.getQuotes())) {
                    stock.setType(range.type.name());
                    stock.setCode(id.substring(2));
                    stockService.edit(stock);
                } else {
                    LOGGER.info("Task: Date=" + EnumerableUtils.select(date, func) + ", Stock=" + id + ", Quotes=NULL");
                }

            } catch (Exception e) {
                LOGGER.error("Task: Date=" + EnumerableUtils.select(date, func) + ", Stock=" + id, e);
            }
        }
    }

    @Override
    public boolean supportsStatusTracking() {
        return true;
    }

    private Func<Date, String> func = new Func<Date, String>() {
        @Override
        public String execute(Date date) {
            return dateFormat.format(date);
        }
    };
}
