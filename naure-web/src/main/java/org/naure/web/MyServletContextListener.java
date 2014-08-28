/*
 * @(#) MyServletContextListener.java 2014-04-28
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.web;

import org.naure.integrate.services.core.scheduler.SchedulerService;
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

    private ServletContext servletContext;
    private ApplicationContext applicationContext;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        servletContext = servletContextEvent.getServletContext();
        applicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        SchedulerService schedulerService = applicationContext.getBean(SchedulerService.class);
        schedulerService.stop();
    }
}
