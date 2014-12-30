/*
 * @(#) Funcm.java 2013-39-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.patterns;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2013-39-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public interface Funcm<T, U, TResult> {
    public TResult execute(T t, U u);
}