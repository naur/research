package org.naure.repositories.test;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestContextManager;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/1/12
 * Time: 3:25 PM
 * To change this template use File | Settings | File Templates.
 */
//@RunWith(value = Parameterized.class)
@ContextConfiguration(locations = {
        "classpath*:/spring/applicationContext*.xml"
})
public class UnitTestBase extends AbstractJUnit4SpringContextTests {
    @Test
    @Ignore
    public void runtimeTest() {
        System.out.println("-------------运行-runtimeTest----------------");
        try {
            Thread.sleep(2 * 60 * 1000);
        } catch (InterruptedException e) {
        }
    }

    //用于 【Parameterized】 的情况下。
    @Before
    public void testGenerateDataSponsor() throws Exception {
        this.testContextManager = new TestContextManager(getClass());
        this.testContextManager.prepareTestInstance(this);
    }

    protected Comparator comparator;
    private TestContextManager testContextManager;

    protected static List<Integer> NULL = Arrays.asList();
}
