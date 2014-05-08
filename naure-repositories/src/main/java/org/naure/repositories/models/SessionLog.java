package org.naure.repositories.models;

import org.naure.common.entities.TraceEventType;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
public class SessionLog {

    public SessionLog(String ipAddress,
                      String hostName,
                      String cpu,
                      String user,
                      String language,
                      String platform,
                      String userAgent,
                      Integer port,
                      int statusCode,
                      TraceEventType severity,
                      String requestType,  //HttpMethod
                      String requestHost,
                      String requestPath,
                      String refererUrl,
                      Date timestamp) {
        this.ipAddress = ipAddress;
        this.hostName = hostName;
        this.cpu = cpu;
        this.user = user;
        this.language = language;
        this.platform = platform;
        this.port = port;
        this.severity = severity;
        this.userAgent = userAgent;
        this.requestType = requestType;
        this.statusCode = statusCode;
        this.timestamp = timestamp;
        this.requestHost = requestHost;
        this.requestPath = requestPath;
        this.refererUrl = refererUrl;
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

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getRequestHost() {
        return requestHost;
    }

    public void setRequestHost(String requestHost) {
        this.requestHost = requestHost;
    }

    public String getRequestPath() {
        return requestPath;
    }

    public void setRequestPath(String requestPath) {
        this.requestPath = requestPath;
    }

    private String ipAddress;
    private String hostName;
    private String cpu;
    private String user;
    private String language;
    private String platform;
    private Integer port;

    private TraceEventType severity;
    private String userAgent;
    private String requestType;  //HttpMethod
    private int statusCode;
    private Date timestamp;
    private String requestHost;
    private String requestPath;
    private String refererUrl;
}
