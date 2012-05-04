package org.naure.repositories;

import org.naure.repositories.config.MongoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class MongoWorkspace implements Workspace {

    @Override
    public <U, T> List<T> get(U params, Class<T> tClass) throws Exception {
        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        return mongoOperations.find(query, tClass);
    }

    @Override
    public <U, T> T put(U entity, Class<T>... tClass) throws Exception {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public <U, T> T post(U entity, Class<T>... tClass) throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
        mongoOps.insert(entity);
        return null;
    }

    @Override
    public <T> boolean delete(T t) throws Exception {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Autowired
    MongoConfiguration mongoConfiguration;
}
