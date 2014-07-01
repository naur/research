/*
 * @(#) BeanEntitySetLoader.java 2013-10-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit.entityset;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.core.io.Resource;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2013-10-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class BeanEntitySetLoader extends AbstractEntitySetLoader {
    @Override
    protected EntitySet createEntitySet(Resource resource) throws Exception {
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        return null;
    }
}
