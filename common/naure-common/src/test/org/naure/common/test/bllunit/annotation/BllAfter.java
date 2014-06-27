/*
 * @(#) BllAfter.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit.annotation;

import java.lang.annotation.*;

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
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface BllAfter {
    String[] xml() default {};

    String[] json() default {};

    String[] ini() default {};

    Class<?>[] config() default {};
}
