/*
 * @(#) BllUnitTestContext.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit;

import org.springframework.context.ApplicationContext;

import java.lang.reflect.Method;
import java.util.List;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2013-10-11
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
interface BllUnitTestContext {

    /**
     * 测试类
     */
    Class<?> getTestClass();

    /**
     * 测试方法
     */
    Method getTestMethod();

    /**
     * 测试异常
     */
    List<Throwable> getErrors();

    /**
     * 增加异常
     */
    void addError(Throwable e);

    <T extends ApplicationContext> T getConfigContext(Class<T> clazz);
}
