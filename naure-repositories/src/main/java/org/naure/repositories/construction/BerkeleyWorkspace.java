package org.naure.repositories.construction;

import com.sleepycat.je.DatabaseEntry;
import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.lang3.SerializationUtils;
import org.naure.common.entities.Entity;
import org.naure.common.util.ByteSerializer;
import org.naure.repositories.config.BerkeleyConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:13 PMgit
 * To change this template use File | Settings | File Templates.
 */
@Component
public class BerkeleyWorkspace implements Workspace {
    @Autowired
    BerkeleyConfiguration configuration;

    @Override
    public <T, U> List<U> get(T t, Class<U> resultClass) throws Exception {
        return null;
    }

    @Override
    public <U> U get(int identifier, Class<U> resultClass) throws Exception {
        return null;
    }

    @Override
    public <T, U> U add(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    @Override
    public <T> boolean add(T t) throws Exception {
        DatabaseEntry key = new DatabaseEntry(t.getClass().getName().getBytes(CharEncoding.UTF_8));
        DatabaseEntry value = new DatabaseEntry(SerializationUtils.serialize((Entity) t));
        configuration.db().put(null, key, value);
        return false;
    }

    @Override
    public <T, U> U delete(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    @Override
    public <T> boolean delete(T t) throws Exception {
        return false;
    }

    @Override
    public <T, U> U update(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    @Override
    public <T> boolean update(T t) throws Exception {
        return false;
    }

    @Override
    public <T> boolean exists(T t) throws Exception {
        return false;
    }

    @Override
    public <T> long count(T t) throws Exception {
        return 0;
    }
}
