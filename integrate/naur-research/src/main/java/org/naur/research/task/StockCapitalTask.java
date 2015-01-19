/*
 * @(#) StockTask.java 2014-44-10
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.task;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import org.naur.common.patterns.exception.Action;
import org.naur.common.util.DateUtil;
import org.naur.integrate.services.core.scheduler.AbstractTask;
import org.naur.integrate.services.core.scheduler.MyTaskExecutionContext;
import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockRange;
import org.naur.research.config.SecurityConfiguration;
import org.naur.research.services.StockService;
import org.naur.research.services.StockWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
public class StockCapitalTask extends AbstractTask implements Serializable {
    private final static Logger LOGGER = LoggerFactory.getLogger(StockCapitalTask.class);
    private static final long serialVersionUID = -349618193169585445L;

    @Autowired
    private StockWebService stockWebService;
    @Autowired
    private StockService stockService;
    @Autowired
    private SecurityConfiguration securityConfiguration;

    @Override
    public void process(MyTaskExecutionContext context) throws RuntimeException {
        Date date = DateUtil.getPrevWeekDay(Calendar.getInstance().getTime());
        List<StockRange> tmp = securityConfiguration.getStockRanges();
        context.setLoop(tmp.size());
        for (StockRange range : tmp) {
            acquireStock(range, date);
            context.setStatusMessage(range.toString());
            this.loop(context);
        }
    }

    private void acquireStock(StockRange range, Date date) {
        Stock stock = null;
        String id = null;

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

    @Override
    public boolean supportsStatusTracking() {
        return true;
    }
}
