/*
 * @(#) XmlEntityLoader.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit.entityset;

import org.springframework.core.io.Resource;

import java.io.InputStream;

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
public class XmlEntitySetLoader extends AbstractEntitySetLoader {
    @Override
    protected EntitySet createEntitySet(Resource resource) throws Exception {
        //FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
        InputStream inputStream = resource.getInputStream();
        try {
            //return builder.build(inputStream);
        } finally {
            inputStream.close();
        }

        this.getClass().getClassLoader().loadClass("");
        //Thread.currentThread().getContextClassLoader();
        return null;
    }
}
