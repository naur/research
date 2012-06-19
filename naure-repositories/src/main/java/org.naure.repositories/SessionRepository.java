package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.SessionLog;
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
public class SessionRepository extends Repository {

    public boolean add(SessionLog sessionLog) throws Exception {
        return workspace.add(sessionLog);
    }

    public <T> List<SessionLog> get(T params) throws Exception {
        return workspace.get(params, SessionLog.class);
    }
}
