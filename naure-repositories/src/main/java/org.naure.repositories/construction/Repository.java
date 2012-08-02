package org.naure.repositories.construction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

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

    public boolean update(Map params) throws Exception {
        return workspace.update(params);
    }

    public <T> boolean exists(T params) throws Exception {
        return workspace.exists(params);
    }

    public <T> long count(T t) throws Exception {
        return workspace.count(t);
    }
}
