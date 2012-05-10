package org.naure.web.integrate.service;

import org.naure.common.entities.TraceEventType;
import org.naure.repositories.SessionRepository;
import org.naure.repositories.models.SessionLog;
import org.naure.web.integrate.HttpUtility;
import org.naure.web.integrate.properties.SystemProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/4/12
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class SessionService {

    public List<SessionLog> get(Map params) throws Exception {
        return sessionRepository.get(params);
    }

    public void add(HttpServletRequest request) {
        if (request.getRequestURI().contains("diagnostic")) return;

        SessionLog sessionLog = new SessionLog();
        sessionLog.setApplication(systemProperties.applicationName);
        sessionLog.setSeverity(TraceEventType.Start);
        sessionLog.setSessionId(request.getRequestedSessionId());
        sessionLog.setIpAddress(HttpUtility.getIpAddr(request));
        sessionLog.setHostName(request.getHeader("host"));
        sessionLog.setLanguage((request.getHeader("accept-language").isEmpty() ? "Unknown" : request.getHeader("accept-language")));
        sessionLog.setUserAgent(request.getHeader("user-agent"));
        sessionLog.setRequestType(request.getMethod());
        sessionLog.setRequestUrl(request.getRequestURI());
        sessionLog.setReferrerUrl(request.getHeader("Referer"));
        sessionLog.setTimestamp(new Date(request.getSession().getLastAccessedTime()));
//        logEntry.SessionLog.SessionID = HttpContext.Current.Session.SessionID ?? "";
//        logEntry.SessionLog.IpAddress = IPAddress.Parse(HttpContext.Current.Request.UserHostAddress);
//        logEntry.SessionLog.HostName = HttpContext.Current.Request.UserHostName ?? "";
//        //HostName = System.Net.Dns.GetHostEntry(HttpContext.Current.Request.UserHostAddress).HostName,
//        //HostName = System.Net.Dns.GetHostName(),
//        if (HttpContext.Current.Request.UserLanguages != null)
//            logEntry.SessionLog.Language = HttpContext.Current.Request.UserLanguages[0] ?? "";
//        else
//        logEntry.SessionLog.Language = "Unknown";
//        logEntry.SessionLog.UserAgent = HttpContext.Current.Request.UserAgent ?? "";
//        logEntry.SessionLog.RequestType = HttpContext.Current.Request.RequestType ?? ""; //HttpMethod
//        logEntry.SessionLog.StatusCode = HttpContext.Current.Response.StatusCode; //Status
//        logEntry.SessionLog.ReferrerUrl = (HttpContext.Current.Request.UrlReferrer == null) ? "" : HttpContext.Current.Request.UrlReferrer.ToString();
//        logEntry.SessionLog.RequestUrl = (HttpContext.Current.Request.RawUrl ?? "").ToString();
//        logEntry.Categories.Add("Session Trace");
        try {
            sessionRepository.add(sessionLog);
        } catch (Exception ex) {
        }
    }

    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    SystemProperties systemProperties;
}
