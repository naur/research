/*
 * @(#) MyServletContextListener.java 2014-04-28
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.web;

import org.naur.integrate.services.core.scheduler.SchedulerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-04-28
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class MyServletContextListener implements ServletContextListener {

    private final static Logger LOGGER = LoggerFactory.getLogger(MyServletContextListener.class);

    private ServletContext servletContext;
    private ApplicationContext applicationContext;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        LOGGER.info("contextInitialized.");

        servletContext = servletContextEvent.getServletContext();
        applicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);

//        try {
//            SchedulerService schedulerService = applicationContext.getBean(SchedulerService.class);
//            if (null != schedulerService) {
//                schedulerService.start();
//                LOGGER.info("schedulerService start.");
//            }
//        } catch (Exception ex) {
//            LOGGER.info("schedulerService exception.", ex);
//        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        SchedulerService schedulerService = applicationContext.getBean(SchedulerService.class);
        schedulerService.stop();

        LOGGER.info("schedulerService stop.");
    }
}
