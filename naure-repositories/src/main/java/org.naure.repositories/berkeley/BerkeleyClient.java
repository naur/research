/*
 * @(#) BerkeleyClient.java 2014-41-30
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package berkeley;

import com.sleepycat.je.DatabaseException;
import com.sleepycat.je.Environment;
import com.sleepycat.je.EnvironmentConfig;

import java.io.File;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-41-30
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class BerkeleyClient {
    private static Environment dbEnvironment = null;

    static {
        try {
            EnvironmentConfig envConfig = new EnvironmentConfig();
            envConfig.setAllowCreate(true);
            dbEnvironment = new Environment(new File("/export/dbEnv"), envConfig);
        } catch (DatabaseException dbe) {
            // Exception handling goes here
        }
    }
}
