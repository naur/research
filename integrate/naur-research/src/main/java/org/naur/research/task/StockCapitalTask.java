/*
 * @(#) StockTask.java 2014-44-10
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.task;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;
import org.apache.commons.lang3.StringUtils;
import org.naur.common.patterns.SchedulerProperty;
import org.naur.common.patterns.exception.Action;
import org.naur.common.util.DateUtil;
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
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
@SchedulerProperty(cron = "0 1 1 1/3 *", name = "StockCapital")
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
        StockRange stockRange = null;
        //TODO 解析 params, 包含【stock】，stock 不包含sh,sz
        Map params = context.getParams();
        if (null != params) {
            //TODO 暂时只支持指定单独一个 stock: 000711
            if (params.containsKey("stock")) {
                String stock = params.get("stock").toString();
                if (StringUtils.isNotEmpty(stock)) {
                    String stockType = securityConfiguration.getType(stock);
                    int stockCode = Integer.parseInt(stock);
                    stockRange = new StockRange(StockType.valueOf(stockType), stockCode, stockCode);
                }
            }
        }

        if (null != stockRange) {
            acquireStock(stockRange, date);
        } else {
            //定时任务
            List<StockRange> tmp = securityConfiguration.getStockRanges();
            context.setLoop(tmp.size());
            for (StockRange range : tmp) {
                acquireStock(range, date);
                context.setStatusMessage(range.toString());
                this.loop(context);
            }
        }
    }

    //date 参数无效
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
}
