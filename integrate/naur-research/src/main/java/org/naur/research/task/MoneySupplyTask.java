/*
 * @(#) MoneySupply.java 2015-02-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.task;

import org.naur.common.patterns.SchedulerProperty;
import org.naur.integrate.services.core.scheduler.AbstractTask;
import org.naur.integrate.services.core.scheduler.MyTaskExecutionContext;
import org.naur.research.config.EconomyConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;

import java.io.Serializable;

/**
 * <pre>
 * author Administrator
 *
 *
 * 创建日期: 2015-59-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
@SchedulerProperty(cron = "0 1 1 * *", name = "MoneySupply")
public class MoneySupplyTask extends AbstractTask implements Serializable {
    private static final long serialVersionUID = -7287939853407346039L;

    @Autowired
    private EconomyConfiguration configuration;

    @Override
    public void process(MyTaskExecutionContext context) throws RuntimeException {
        try {
            Jsoup.connect(configuration.moneySupply).get();
        } catch (Exception ex) {
            LOGGER.error("Jsoup.connect errro", ex);
        }
    }
}
