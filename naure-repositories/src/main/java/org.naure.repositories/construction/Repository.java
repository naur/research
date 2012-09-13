package org.naure.repositories.construction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/10/12
 * Time: 9:46 AM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Repository {
    @Autowired
    @Qualifier("mongoWorkspace")
    protected Workspace workspace;

    public <T, U> List<U> get(T params, Class<U> resultClass) throws Exception {
        return workspace.get(params, resultClass);
    }

    public <U> U get(int identifier, Class<U> resultClass) throws Exception {
        return workspace.get(identifier, resultClass);
    }

    public boolean update(Map params) throws Exception {
        return workspace.update(params);
    }

    public <T, U> List<U> delete(T params, Class<U> resultClass) throws Exception {
        return workspace.get(params, resultClass);
    }

    public <T> boolean delete(T params) throws Exception {
        return workspace.delete(params);
    }

    public <T> boolean exists(T params) throws Exception {
        return workspace.exists(params);
    }

    public <T> long count(T t) throws Exception {
        return workspace.count(t);
    }
}
