/*
 * @(#) TempTest.java 2014-55-30
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.shoping.test;

import org.junit.Assert;
import org.junit.Test;
import org.naure.shoping.models.Jade;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-55-30
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class TempTest {
    @Test
    public void test() {
        Jade jade = new Jade();
        Assert.assertNotNull(jade.collectionName());
    }
}
