package org.naure.repositories;

import org.naure.repositories.config.MongoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
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
    public <U, T> List<T> get(U params, Class<T> clazz) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public <U, T> U put(T entity, Class<U>... clazz) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public <U, T> U post(T entity, Class<T> clazz) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public <T> boolean delete(T t) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Autowired
    MongoConfiguration mongoConfiguration;
}
