/*
 * @(#) StockTask.java 2014-44-10
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.task;

import org.apache.commons.lang3.StringUtils;
import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import org.naur.common.patterns.Func;
import org.naur.common.patterns.SchedulerProperty;
import org.naur.common.util.DateUtil;
import org.naur.common.util.EnumerableUtils;
import org.naur.integrate.services.core.scheduler.AbstractTask;
import org.naur.integrate.services.core.scheduler.MyTaskExecutionContext;
import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockRange;
import org.naur.repositories.models.finance.StockType;
import org.naur.research.config.SecurityConfiguration;
import org.naur.research.services.StockService;
import org.naur.research.services.StockWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
@SchedulerProperty(cron = "0 16 * * 1,2,3,4,5", name = "StockHistory")
public class StockHistoryTask extends AbstractTask implements Serializable {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockHistoryTask.class);

    private static final long serialVersionUID = 6330820682946511999L;

    private DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private StockWebService stockWebService;
    @Autowired
    private StockService stockService;
    @Autowired
    private SecurityConfiguration securityConfiguration;

    @Override
    public void process(MyTaskExecutionContext context) throws RuntimeException {
        //默认当天
        Date start = new Date(); //DateUtil.getPrevWeekDay(Calendar.getInstance().getTime());
        Date end = start;
        StockRange stockRange = null;
        //TODO 解析 params, 包含【start, end, stock】，stock 不包含sh,sz
        Map params = context.getParams();
        if (null != params) {
            try {
                if (params.containsKey("start")) {
                    start = dateFormat.parse(params.get("start").toString());
                }
                if (params.containsKey("end")) {
                    end = dateFormat.parse(params.get("end").toString());
                }
                //TODO 暂时只支持指定单独一个 stock: 000711
                if (params.containsKey("stock")) {
                    String stock = params.get("stock").toString();
                    if (StringUtils.isNotEmpty(stock)) {
                        String stockType = securityConfiguration.getType(stock);
                        int stockCode = Integer.parseInt(stock);
                        stockRange = new StockRange(StockType.valueOf(stockType), stockCode, stockCode);
                    }
                }
            } catch (ParseException e) {
                LOGGER.error("Task: StockCapitalTask", e);
            }
        }

        if (null != stockRange) {
            acquireStock(stockRange, start, end);
        } else {
            //定时任务
            List<StockRange> tmp = securityConfiguration.getStockRanges();
            context.setLoop(tmp.size());
            for (StockRange range : tmp) {
                acquireStock(range, start, end);
                context.setStatusMessage(range.toString());
                this.loop(context);
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

    private Func<Date, String> func = new Func<Date, String>() {
        @Override
        public String execute(Date date) {
            return dateFormat.format(date);
        }
    };


}
