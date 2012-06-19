package org.naure.repositories;

import org.naure.repositories.config.MongoConfiguration;
import org.naure.repositories.construction.Workspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:13 PMgit
 * To change this template use File | Settings | File Templates.
 */
@Component
public class MongoWorkspace implements Workspace {

    @Override
    public <T, U> List<U> get(T t, Class<U> resultClass) throws Exception {
        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        int pageSize = 30;
        int pageIndex = 1;
        Map params = (Map) t;
        for (Object key : params.keySet()) {
            if ("pageSize".equals(key)) {
                pageSize = Integer.parseInt(params.get(key).toString());
                continue;
            }
            if ("pageIndex".equals(key)) {
                pageIndex = Integer.parseInt(params.get(key).toString());
                if (pageIndex == 0)
                    pageIndex = 1;
                continue;
            }
            query.addCriteria(Criteria.where(key.toString()).is(params.get(key)));
        }
        query.skip(pageSize * (pageIndex - 1));
        query.limit(pageSize);
        return mongoOperations.find(query, resultClass);
    }

    @Override
    public <U> U get(int identifier, Class<U> resultClass) throws Exception {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }


    @Override
    public <T, U> U add(T t, Class<U>... resultClass) throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
        mongoOps.insert(t);
        return null;
    }

    @Override
    public <T> boolean add(T t) throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
        mongoOps.insert(t);
        return true;
    }

    @Override
    public <T, U> U delete(T t, Class<U>... resultClass) throws Exception {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public <T> boolean delete(T t) throws Exception {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public <T, U> U update(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    @Override
    public <T> boolean update(T t) throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
        Map params = (Map) t;
        Query query = new Query();
        Update update = new Update();
        Map subMap = null;
        for (Object key : params.keySet()) {
            if ("class".equals(key))
                continue;
            subMap = (Map) params.get(key);
            if ("query".equals(key))
                for (Object key1 : subMap.keySet())
                    query.addCriteria(Criteria.where(key1.toString()).is(subMap.get(key1)));
            if ("update".equals(key))
                for (Object key2 : subMap.keySet()) {
                    //文档参考：http://hi.baidu.com/farmerluo/item/15ba88579b8bbb9409be17bb
                    //对 pushAll 支持有问题 【can't serialize class org.naure.common.location.GeoPosition】
                    if (subMap.get(key2) instanceof Object[])
                        update.push(key2.toString(), ((Object[]) subMap.get(key2))[0]);
                    else if (subMap.get(key2) instanceof List)
                        update.push(key2.toString(), ((List) subMap.get(key2)).get(0));
                    else
                        update.set(key2.toString(), subMap.get(key2));
                }
        }

        mongoOps.updateMulti(query, update, (Class) (params.get("class")));
        return true;
    }

    @Autowired
    MongoConfiguration mongoConfiguration;
}
