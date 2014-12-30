/*
 * @(#) PropertiesUtils.java 2014-02-11
 *
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.util;

import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-02-11
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class PropertiesUtils {
    public static String getProperty(String key) {
        String property = "";
        try {
            Properties properties = PropertiesLoaderUtils.loadAllProperties("application.properties");
            property = properties.getProperty(key);

//            Properties properties = new Properties();
//            InputStream input = Application.class.getClassLoader().getResourceAsStream("application.properties");
//            properties.load(input);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return property;
    }
}
