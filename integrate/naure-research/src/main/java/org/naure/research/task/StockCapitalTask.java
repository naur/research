/*
 * @(#) StockTask.java 2014-44-10
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.task;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import org.naure.common.patterns.exception.Action;
import org.naure.common.util.DateUtil;
import org.naure.repositories.models.finance.Stock;
import org.naure.repositories.models.finance.StockRange;
import org.naure.research.config.SecurityConfiguration;
import org.naure.research.services.StockService;
import org.naure.research.services.StockWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

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
public class StockCapitalTask extends Task implements Serializable {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockCapitalTask.class);

    @Autowired
    private StockWebService stockWebService;
    @Autowired
    private StockService stockService;
    @Autowired
    private SecurityConfiguration securityConfiguration;

    @Override
    public void execute(TaskExecutionContext context) throws RuntimeException {
        Date date = DateUtil.getPrevWeekDay(Calendar.getInstance().getTime());
        Stock stock = null;
        String id = null;
        for (StockRange range : securityConfiguration.getStockRanges()) {
            for (int i = range.start; i <= range.end; i++) {
                id = range.getCode(i);

                if (securityConfiguration.filter.contains(id)) {
                    continue;
                }

                try {
                    stock = stockWebService.getCapital(id);
                    //验证
                    if (null != stock) {
                        stockService.edit(stock);
                    } else {
                        LOGGER.info("Stock: " + id + ", NULL");
                    }

                } catch (Exception e) {
                    LOGGER.error("Stock: " + id + ", Date: " + date, e);
                }
            }
        }
    }

    @Override
    public boolean supportsStatusTracking() {
        return true;
    }
}
