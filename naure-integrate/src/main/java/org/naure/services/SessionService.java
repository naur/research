package org.naure.services;

import org.naure.common.entities.TraceEventType;
import org.naure.repositories.SessionRepository;
import org.naure.repositories.models.Session;
import org.naure.repositories.models.SessionLog;
import org.naure.web.HttpSessionFilter;
import org.naure.web.HttpUtility;
import org.naure.web.properties.SystemProperties;
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

    public List<Session> get(Map params) throws Exception {
        params.put("application", systemProperties.applicationName);
        return sessionRepository.get(params);
    }

    public void add(HttpServletRequest request) {
        if (null == request || request.getRequestURI().contains("diagnostic")) return;
        if (request.getRequestedSessionId() == null) {
            request.getSession();
        }
        //if (null == request.getRequestedSessionId()) return;

        final Session session = new Session();
        session.setApplication(systemProperties.applicationName);
        session.setSessionId(request.getRequestedSessionId());
        SessionLog log = new SessionLog();
        log.setSeverity(TraceEventType.Start);
        log.setIpAddress(HttpUtility.getIpAddr(request));
        log.setHostName(request.getHeader("host"));
        log.setLanguage((request.getHeader("accept-language").isEmpty() ? "Unknown" : request.getHeader("accept-language")));
        log.setUserAgent(request.getHeader("user-agent"));
        log.setRequestType(request.getMethod());
        log.setRequestUrl(request.getRequestURI());
        log.setRefererUrl(request.getHeader("Referer"));
        log.setTimestamp(new Date(request.getSession().getLastAccessedTime()));
        log.setStatusCode(request.getAttribute("javax.servlet.error.status_code") == null ? 200 : Integer.parseInt(request.getAttribute("javax.servlet.error.status_code").toString()));
        session.getLogs().add(log);
//        logEntry.Session.SessionID = HttpContext.Current.Session.SessionID ?? "";
//        logEntry.Session.IpAddress = IPAddress.Parse(HttpContext.Current.Request.UserHostAddress);
//        logEntry.Session.HostName = HttpContext.Current.Request.UserHostName ?? "";
//        //HostName = System.Net.Dns.GetHostEntry(HttpContext.Current.Request.UserHostAddress).HostName,
//        //HostName = System.Net.Dns.GetHostName(),
//        if (HttpContext.Current.Request.UserLanguages != null)
//            logEntry.Session.Language = HttpContext.Current.Request.UserLanguages[0] ?? "";
//        else
//        logEntry.Session.Language = "Unknown";
//        logEntry.Session.UserAgent = HttpContext.Current.Request.UserAgent ?? "";
//        logEntry.Session.RequestType = HttpContext.Current.Request.RequestType ?? ""; //HttpMethod
//        logEntry.Session.StatusCode = HttpContext.Current.Response.StatusCode; //Status
//        logEntry.Session.ReferrerUrl = (HttpContext.Current.Request.UrlReferrer == null) ? "" : HttpContext.Current.Request.UrlReferrer.ToString();
//        logEntry.Session.RequestUrl = (HttpContext.Current.Request.RawUrl ?? "").ToString();
//        logEntry.Categories.Add("Session Trace");
        try {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try{
                        sessionRepository.add(session);
                    } catch (Exception ex) {
                    }
                }
            }).start();
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SystemProperties systemProperties;
}
