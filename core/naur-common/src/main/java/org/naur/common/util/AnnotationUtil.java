/*
 * @(#) AnnotationUtils.java 2015-02-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.util;

import org.springframework.core.annotation.AnnotationUtils;

import java.lang.annotation.Annotation;

/**
 * <pre>
 * author Administrator
 *
 *
 * 创建日期: 2015-45-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class AnnotationUtil {
    public static <T, A extends Annotation> T getValue(Class<T> resultClass, Class<?> clazz, Class<A> annotationType, String attributeName) {
        A a = AnnotationUtils.findAnnotation(clazz, annotationType);
        return (T) AnnotationUtils.getValue(a, attributeName);
    }
}
