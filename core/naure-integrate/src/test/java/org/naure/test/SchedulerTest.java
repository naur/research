/*
 * @(#) ScheduleTest.java 2014-54-03
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.test;

import it.sauronsoftware.cron4j.Scheduler;
import org.junit.Assert;
import org.junit.Test;
import org.naure.common.test.UnitTestBase;
import org.naure.services.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-54-03
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class SchedulerTest extends UnitTestBase {

    @Autowired
    private SchedulerService schedulers;

    @Test
    public void SchedulerProperties() {
        List<org.naure.repositories.models.Scheduler> result = schedulers.getTasks(false);
        Assert.assertEquals(2, result.size());
    }

    @Test
    public void cron4jTest() {
        final AtomicInteger atomicInteger = new AtomicInteger();
        atomicInteger.set(0);
        Scheduler scheduler = new Scheduler();
        scheduler.schedule("* * * * *", new Runnable() {
            @Override
            public void run() {
                System.out.println("count: " + String.valueOf(atomicInteger.addAndGet(1)));
            }
        });
        scheduler.start();
        try {
            Thread.sleep(3L * 60L * 1000L);
        } catch (InterruptedException e) {
        }
        scheduler.stop();
    }

    @Test
    public void scheduledTest() {
        final AtomicInteger atomicInteger = new AtomicInteger();
        atomicInteger.set(0);
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        Runnable work = new Runnable() {
            @Override
            public void run() {
                System.out.println("count: " + atomicInteger.get());
            }
        };
        //ScheduledFuture scheduledFuture = scheduler.schedule()
        //scheduler.set
    }
}
