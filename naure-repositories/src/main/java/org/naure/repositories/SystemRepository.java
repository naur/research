package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.construction.Workspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 5/11/14.
 */
@Component
public class SystemRepository extends Repository {
    @Autowired
    @Qualifier("berkeleyWorkspace")
    public void getWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public <T> boolean add(T t) throws Exception {
        return this.workspace.add(t);
    }
}
