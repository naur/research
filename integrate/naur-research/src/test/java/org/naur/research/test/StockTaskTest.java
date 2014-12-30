/*
 * @(#) StockTaskTtest.java 2014-59-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.test;

import junit.framework.Assert;
import org.junit.Test;
import org.naur.common.test.UnitTestBase;
import org.naur.repositories.models.Scheduler;
import org.naur.integrate.services.core.scheduler.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-59-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class StockTaskTest extends UnitTestBase {

    @Autowired
    private SchedulerService schedulers;

    @Test
    public void schedulerTest() {
        List<Scheduler> tasks = schedulers.getTasks(false);
        Assert.assertNotNull(tasks);
        Assert.assertEquals(2, tasks.size());
    }
}
