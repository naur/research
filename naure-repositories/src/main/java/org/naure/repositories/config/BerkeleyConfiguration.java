/*
 * @(#) BerkeleyClient.java 2014-41-30
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.repositories.config;

import com.sleepycat.je.*;
import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.lang3.SerializationUtils;
import org.naure.common.patterns.Func;
import org.naure.common.util.FileUtil;
import org.naure.repositories.construction.ObjectKeyCreator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import java.io.File;
import java.util.List;

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
@Configuration
public class BerkeleyConfiguration {

    // Env
    private Environment dbEnvironment = null;
    // 二级库键创建器
    private ObjectKeyCreator keyCreator = new ObjectKeyCreator();

    /**
     * 包含了 get 和 put 操作
     * 1: 当 dbName 为空时，遍历所有数据库
     * 2: 当 data 为空时：get
     * <pre>
     *      当 data 为空并且 key 有值时：get
     *      当 data 为空并且 key 为空时：游标 get
     * </pre>
     * 3: 当 data 有值时：put
     */
    public boolean execute(String dbName, DatabaseEntry key, DatabaseEntry data, Action action) {
        Database db = null;
        Cursor cursor = null;
        OperationStatus status = null;
        //如果 dbName 为空，那么循环所有数据库，获取所有数据
        if (null == dbName) {
            for (String name : this.dbs()) {
                this.execute(name, key, data, action);
            }
        }
        try {
            db = this.db(dbName);
            //如果 data 为空，那么是从数据库获取数据。注：data == null 的时候，action 也为空，这种情况用于判断数据库是否存在记录。
            if (null == data || null == data.getData()) {
                //如果 key 不为空，获取特定 Key 对应的数据
                if (null != key.getData()) {
                    if ((status = db.get(null, key, data, LockMode.DEFAULT)) ==
                            OperationStatus.SUCCESS) {
                        if (null != action) {
                            action.execute(key, data);
                            data.setData(null);
                        }
                    } else {
                        //TODO
                    }
                } else {
                    //就通过游标获取所有数据
                    cursor = db.openCursor(null, null);

                    // 通过cursor.getNex方法来遍历记录
                    while ((status = cursor.getNext(key, data, LockMode.DEFAULT)) ==
                            OperationStatus.SUCCESS) {
                        if (null != action) {
                            action.execute(key, data);
                        }
                    }
                }
            } else {
                //否则是 add
                status = db.put(null, key, data);
            }
        } catch (Exception ex) {
            //TODO
        } finally {
            try {
                if (null != db) {
                    db.close();
                }
            } catch (Exception e) {
                //TODO
            }
        }
        return status != null && status == OperationStatus.SUCCESS;
    }

    /**
     * 数据库 Env
     */
    private EnvironmentConfig getEnv() {
        EnvironmentConfig envConfig = new EnvironmentConfig();
        envConfig.setReadOnly(readOnly);
        envConfig.setAllowCreate(allowCreate);
        envConfig.setSharedCache(sharedCache);
        envConfig.setTransactional(isTransactional);
        return envConfig;
    }

    /**
     * 主库
     */
    private Database db(String databaseName) throws Exception {
        if (null == dbEnvironment) {
            File dbFile = new File(file);
            if (!dbFile.exists()) {
                dbFile.mkdirs();
            }
            dbEnvironment = new Environment(dbFile, getEnv());
        }
        return dbEnvironment.openDatabase(null, databaseName, getCnf());
    }

    /**
     * 二级库
     */
    private SecondaryDatabase indexDb(String databaseName) throws Exception {
        if (null == dbEnvironment) {
            File dbFile = new File(file);
            if (!dbFile.exists()) {
                dbFile.mkdirs();
            }
            dbEnvironment = new Environment(dbFile, getEnv());
        }
        return dbEnvironment.openSecondaryDatabase(null, secondaryDatabaseName, db(databaseName), getSecCnf());
    }

    /**
     * 返回所有数据库名字
     */
    private List<String> dbs() {
        return dbEnvironment.getDatabaseNames();
    }

    /**
     * 主库配置
     */
    private DatabaseConfig getCnf() {
        DatabaseConfig dbConfig = new DatabaseConfig();
        dbConfig.setAllowCreate(allowCreate);
        dbConfig.setDeferredWrite(deferredWrite);
        return dbConfig;
    }

    /**
     * 二级数据库配置
     */
    private SecondaryConfig getSecCnf() {
        SecondaryConfig dbConfig = new SecondaryConfig();
        dbConfig.setAllowCreate(allowCreate);
        dbConfig.setDeferredWrite(deferredWrite);
        dbConfig.setSortedDuplicates(true);
        dbConfig.setKeyCreator(keyCreator);
        return dbConfig;
    }

    public interface Action {
        void execute(DatabaseEntry key, DatabaseEntry data);
    }

    @Value("${berkeley.file}")
    private String file;
    //二级数据库用于索引
    @Value("${berkeley.secondaryDatabaseName}")
    private String secondaryDatabaseName;
    @Value("${berkeley.allowCreate}")
    private boolean allowCreate;
    @Value("${berkeley.sharedCache}")
    private boolean sharedCache;
    @Value("${berkeley.isTransactional}")
    private boolean isTransactional;
    @Value("${berkeley.readOnly}")
    private boolean readOnly;
    @Value("${berkeley.deferredWrite}")
    private boolean deferredWrite;
}
