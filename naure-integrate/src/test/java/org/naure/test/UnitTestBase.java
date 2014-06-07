package org.naure.test;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestContextManager;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/29/12
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */
@RunWith(value = Parameterized.class)
//@ContextConfiguration(locations = {
//        "classpath*:/spring/applicationContext-*.xml"
//})
public class UnitTestBase extends AbstractJUnit4SpringContextTests {
    @Ignore
    @Test
    public void runtimeTest() {
        System.out.println("-------------运行-runtimeTest----------------");
        try {
            Thread.sleep(2 * 60 * 1000);
        } catch (InterruptedException e) {
        }
    }

    @Before
    public void testGenerateDataSponsor() {
        this.testContextManager = new TestContextManager(getClass());
        try {
            this.testContextManager.prepareTestInstance(this);
        } catch (Exception ex) {
        }
    }

    protected Comparator comparator;
    private TestContextManager testContextManager;

    protected static List<Integer> NULL = Arrays.asList();
}
