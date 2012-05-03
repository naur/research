package org.naure.repositories;

import org.naure.repositories.models.SessionLog;
import org.springframework.stereotype.Component;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 2:08 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class SessionRepository {

    public void add(SessionLog sessionLog) {
        workspace.put(sessionLog);
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    private Workspace workspace;
}
