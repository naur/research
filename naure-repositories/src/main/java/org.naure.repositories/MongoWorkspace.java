package org.naure.repositories;

import org.naure.repositories.config.MongoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

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
    public <T> List<T> get(Map params, Class<T> tClass) throws Exception {
        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        for (Object key : params.keySet()) {
            query.addCriteria(Criteria.where(key.toString()).is(params.get(key)));
        }
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
    public <U, T> boolean delete(U u, Class<T>... tClass) throws Exception {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Autowired
    MongoConfiguration mongoConfiguration;
}
