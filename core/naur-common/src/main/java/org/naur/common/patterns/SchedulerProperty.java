/*
 * @(#) SchedulerProperty.java 2015-02-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.patterns;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <pre>
 * author Administrator
 *
 *
 * 创建日期: 2015-14-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface SchedulerProperty {
    String cron();
    String name() default "className";
}
