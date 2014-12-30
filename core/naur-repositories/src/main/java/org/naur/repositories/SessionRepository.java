package org.naur.repositories;

import org.naur.repositories.construction.Repository;
import org.naur.repositories.construction.Workspace;
import org.naur.repositories.models.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

    public boolean exists(final Session session) throws Exception {
        return this.exists(identifier(session));
    }

    public boolean update(final Session session) throws Exception {
        Map<String, Object> query = identifier(session);

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("updated", Calendar.getInstance().getTime());
        update.put("update", new HashMap<String, Object>() {{
            put("updated", Calendar.getInstance().getTime());
            put("logs", session.getLogs());
        }});
        update.put("class", session.getClass());
        return update(update);
    }

    public boolean add(final Session session) throws Exception {
        session.setCreated(Calendar.getInstance().getTime());
        session.setUpdated(session.getCreated());
        return workspace.add(session);
    }


//    @Autowired
//    @Qualifier("berkeleyWorkspace")
//    public void getWorkspace(Workspace workspace) {
//        this.workspace = workspace;
//    }

    /**
     * 【未使用】berkeley 版本
     */
    @Deprecated
    public boolean addBerkeley(final Session session) throws Exception {
        //对 berkeley 来说，默认是用 id 作为 key
        session.setId(session.getSessionId());

        //以当前毫秒数作为 id
        if (null == session.getId()) {
            session.setId(String.valueOf(System.currentTimeMillis()));
        }

        if (this.exists(session)) {
            List<Session> temp = this.workspace.get(session, Session.class);
            session.getLogs().addAll(temp.get(0).getLogs());
        }

        return this.workspace.add(session);
    }

    /**
     * MongoDB 版本
     */
//    public boolean add(final Session session) throws Exception {
//        if (null == session.getSessionId())
//            return workspace.add(session);
//
//        Map<String, Object> query = new HashMap<String, Object>() {{
//            put("application", session.getApplication());
//            put("sessionId", session.getSessionId());
//            put("class", session.collectionName());
//        }};
//
//        if (this.exists(query)) {
//            Map<String, Object> update = new HashMap<String, Object>();
//            update.put("query", query);
//            update.put("update", new HashMap<String, Object>() {{
//                put("updated", Calendar.getInstance().getTime());
//                put("logs", session.getLogs());
//            }});
//            update.put("class", session.collectionName());
//            return update(update);
//        } else {
//            session.setCreated(Calendar.getInstance().getTime());
//            session.setUpdated(session.getCreated());
//            return workspace.add(session);
//        }
//    }

    /**
     * identifier
     */
    private Map identifier(final Session session) throws Exception {
        return new HashMap<String, Object>() {{
            put("application", session.getApplication());
            put("sessionId", session.getSessionId());
            put("class", session.getClass());
        }};
    }
}
