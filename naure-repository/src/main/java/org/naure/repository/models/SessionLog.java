package org.naure.repository.models;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
public class SessionLog {
    private String sessionId;
    //private IPAddress ipAddress;
    private String hostName;
    //private TraceEventType severity;
    private String language;
    private String userAgent;
    private String requestType;
    private int statusCode;
    private String referrerUrl;
    private String requestUrl;
    private Date timestamp;
}
