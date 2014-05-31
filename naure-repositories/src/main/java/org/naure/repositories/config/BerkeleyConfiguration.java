/*
 * @(#) BerkeleyClient.java 2014-41-30
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.repositories.config;

import com.sleepycat.je.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

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
@Configuration
public class BerkeleyConfiguration {

    private Environment dbEnvironment = null;

    @Bean
    public Database db() throws Exception {
        dbEnvironment = new Environment(new File(file), getEnv());
        return dbEnvironment.openDatabase(null, databaseName, getCnf());
    }

    private EnvironmentConfig getEnv() {
        EnvironmentConfig envConfig = new EnvironmentConfig();
        envConfig.setReadOnly(readOnly);
        envConfig.setAllowCreate(allowCreate);
        envConfig.setSharedCache(sharedCache);
        envConfig.setTransactional(isTransactional);
        return envConfig;
    }

    /**
     * 数据库配置
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
    private DatabaseConfig getSecCnf() {
        SecondaryConfig dbConfig = new SecondaryConfig();
        dbConfig.setAllowCreate(allowCreate);
        dbConfig.setDeferredWrite(deferredWrite);
        return dbConfig;
    }

    @Value("${berkeley.file}") private String file;
    @Value("${berkeley.databaseName}") private String databaseName;
    @Value("${berkeley.allowCreate}") private boolean allowCreate;
    @Value("${berkeley.sharedCache}") private boolean sharedCache;
    @Value("${berkeley.isTransactional}") private boolean isTransactional;
    @Value("${berkeley.readOnly}") private boolean readOnly;
    @Value("${berkeley.deferredWrite}") private boolean deferredWrite;
}
