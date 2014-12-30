/*
 * @(#) TestSchedulerProperty.java 2014-58-08
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.test;

import org.naur.integrate.services.core.scheduler.SchedulerProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-58-08
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Configuration
public class TestSchedulerProperty extends SchedulerProperty {

    @Value("${schedulers}")
    public void schedulers(String schedluers) {
        super.schedulers(schedluers);
    }

}
