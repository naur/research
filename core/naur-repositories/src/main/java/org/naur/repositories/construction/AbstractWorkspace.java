package org.naur.repositories.construction;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 3:06 PM
 * To change this template use File | Settings | File Templates.
 */
public class AbstractWorkspace implements Workspace {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public <T, U> List<U> get(T t, Class<U> resultClass) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <U> U get(int identifier, Class<U> resultClass) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T, U> U add(T t, Class<U>... resultClass) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T> boolean add(T t) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T, U> U delete(T t, Class<U>... resultClass) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T> boolean delete(T t) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T, U> U update(T t, Class<U>... resultClass) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T> boolean update(T t) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T> boolean exists(T t) throws Exception {
        throw new Exception("Not implemented");
    }

    @Override
    public <T> long count(T t) throws Exception {
        throw new Exception("Not implemented");
    }
}
