package org.naure.repositories;

import org.naure.repositories.models.SessionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 2:08 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class SessionRepository {

    public void add(SessionLog sessionLog) throws Exception {
        workspace.post(sessionLog);
    }

    public List<SessionLog> get(Map params) throws Exception {
        return workspace.get(params, SessionLog.class);
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    @Autowired
    @Qualifier("mongoWorkspace")
    private Workspace workspace;
}
