/*
 * @(#) EntityLoader.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit.entityset;

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
public interface EntitySetLoader {
    public EntitySet loadEntitySet(Class<?> testClass, String location) throws Exception;
}
