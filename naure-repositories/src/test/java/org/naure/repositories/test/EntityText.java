package org.naure.repositories.test;

import org.junit.Test;
import org.naure.repositories.models.learn.Eng;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 2:32 PM
 * To change this template use File | Settings | File Templates.
 */
public class EntityText extends UnitTestBase {
    @Test
    public void test1() {
        Eng eng = new Eng();
        String colName = eng.collectionName();
    }
}
