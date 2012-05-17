package org.naure.repositories.test;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import java.util.Comparator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/1/12
 * Time: 3:25 PM
 * To change this template use File | Settings | File Templates.
 */
@ContextConfiguration(locations = {
        "classpath*:applicationContext*.xml"
})
public class UnitTestBase extends AbstractJUnit4SpringContextTests {
    public <T> boolean contains(List<T> list, Comparator comparator, T... value) {
        int compInt;
        for (T item : list) {
            compInt = comparator.compare(item, value.length == 0 ? null : value[0]);
            if (compInt >= 0) {
                return true;
            }
        }
        return false;
    }

    public <T> T find(List<T> list, Comparator comparator, T... value) {
        for (T item : list) {
            if (comparator.compare(item, value.length == 0 ? null : value[0]) >= 0)
                return item;
        }
        return null;
    }
}
