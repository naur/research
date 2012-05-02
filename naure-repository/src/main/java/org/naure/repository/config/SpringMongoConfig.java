package org.naure.repository.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoFactoryBean;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/2/12
 * Time: 11:31 AM
 * To change this template use File | Settings | File Templates.
 */
@Configuration
public class SpringMongoConfig {
    @Bean
    public MongoFactoryBean mongo() {
        MongoFactoryBean mongo = new MongoFactoryBean();
        mongo.setHost(host);
        return mongo;
    }

    private @Value("#{mongodb.host}") String host;
    private @Value("#{mongodb.port}")  int port;
    private @Value("#{mongodb.username}")  String username;
    private @Value("#{mongodb.password}")  String password;
}
