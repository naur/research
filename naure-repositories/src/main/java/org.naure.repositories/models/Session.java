package org.naure.repositories.models;

import org.naure.common.entities.Entity;
import org.naure.common.entities.TraceEventType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
public class Session extends Entity {
    public Session() {
        this.logs = new ArrayList<SessionLog>();
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public List<SessionLog> getLogs() {
        return logs;
    }

    public void setLogs(List<SessionLog> logs) {
        this.logs = logs;
    }

    private String application;
    private String sessionId;
    private List<SessionLog> logs;
}
