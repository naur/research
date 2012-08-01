package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.Session;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
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

    public boolean add(final Session session) throws Exception {
        if (null == session.getSessionId())
            return workspace.add(session);

        Map<String, Object> query = new HashMap<String, Object>() {{
            put("application", session.getApplication());
            put("sessionId", session.getSessionId());
        }};

        if (this.get(query).size() > 0) {
            Map<String, Object> update = new HashMap<String, Object>();
            update.put("query", query);
            update.put("update", new HashMap<String, Object>(){{
                put("updated", Calendar.getInstance().getTime());
                put("logs", session.getLogs());
            }});
            update.put("class", session.collectionName());
            return update(update);
        } else {
            session.setCreated(Calendar.getInstance().getTime());
            session.setUpdated(session.getCreated());
            return workspace.add(session);
        }
    }

    public <T> List<Session> get(T params) throws Exception {
        return workspace.get(params, Session.class);
    }

    public Session get(int identifier) throws Exception {
        return workspace.get(identifier, Session.class);
    }

    public boolean update(Map params) throws Exception {
        return workspace.update(params);
    }
}
