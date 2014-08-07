/*
 * @(#) TaskSchedulerProperties.java 2014-04-07
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.properties;

import org.naure.integrate.services.core.scheduler.SchedulerProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-04-07
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Configuration
public class TaskSchedulerProperty extends SchedulerProperty {

    @Value("${stockSchedulers}")
    public void schedulers(String schedluers) {
        super.schedulers(schedluers);
    }
}
