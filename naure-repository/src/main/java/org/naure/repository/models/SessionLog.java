package org.naure.repository.models;

import com.mongodb.DBObject;
import org.bson.BSONObject;
import org.naure.common.TraceEventType;

import java.util.Date;
import java.util.Map;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
public class SessionLog implements DBObject {
    private String sessionId;
    private String ipAddress;
    private String hostName;
    private TraceEventType severity;
    private String language;
    private String userAgent;
    private String requestType;
    private int statusCode;
    private String referrerUrl;
    private String requestUrl;
    private Date timestamp;

    public SessionLog(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public void markAsPartialObject() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean isPartialObject() {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Object put(String s, Object o) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void putAll(BSONObject bsonObject) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void putAll(Map map) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Object get(String s) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Map toMap() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Object removeField(String s) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean containsKey(String s) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean containsField(String s) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public Set<String> keySet() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public String toString() {
        return String.format("SessionLog [sessionId={}, ipAddress={}, hostName={}, severity={}, language={}, userAgent={}, requestType={}, statusCode={}, referrerUrl={}, requestUrl={}, timestamp]",
                sessionId, ipAddress, hostName, severity, language, userAgent, requestType, statusCode, referrerUrl, requestUrl, timestamp);
    }
}
