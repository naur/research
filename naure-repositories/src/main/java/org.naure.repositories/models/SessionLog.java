package org.naure.repositories.models;

import org.naure.common.entities.Entity;
import org.naure.common.entities.TraceEventType;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
public class SessionLog extends Entity {
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

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public TraceEventType getSeverity() {
        return severity;
    }

    public void setSeverity(TraceEventType severity) {
        this.severity = severity;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getRefererUrl() {
        return refererUrl;
    }

    public void setRefererUrl(String refererUrl) {
        this.refererUrl = refererUrl;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return String.format("SessionLog [application=%1$s, sessionId=%1$s, ipAddress=%2$s, hostName=%3$s, severity=%4$s, language=%5$s, userAgent=%6$s, requestType=%7$s, statusCode=%8$s, referrerUrl=%9$s, requestUrl=%10$s, timestamp=%11$s]",
                sessionId, ipAddress, hostName, severity, language, userAgent, requestType, statusCode, refererUrl, requestUrl, timestamp);
    }

    private String application;
    private String sessionId;
    private String ipAddress;
    private String hostName;
    private TraceEventType severity;
    private String language;
    private String userAgent;
    private String requestType;
    private int statusCode;
    private String refererUrl;
    private String requestUrl;
    private Date timestamp;
}
