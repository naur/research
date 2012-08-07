package org.naure.web.controllers;


import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.entities.TraceEventType;
import org.naure.common.pattern.Func;
import org.naure.repositories.models.Session;
import org.naure.repositories.models.SessionLog;
import org.naure.services.SessionService;
import org.naure.web.ControllerBase;
import org.naure.web.HttpSessionFilter;
import org.naure.web.HttpUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "diagnostic", method = {RequestMethod.GET, RequestMethod.POST})
public class DiagnosticController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return view("view");
    }

    @RequestMapping(value = "session/add")
    public Information sessionAdd(ServletRequest request) {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        return handler(new Information<String>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                if (null == httpRequest) return information;
                if (httpRequest.getRequestedSessionId() == null) {
                    httpRequest.getSession();
                }

                final Session session = new Session();
                session.setSessionId(httpRequest.getRequestedSessionId());

                SessionLog log = new SessionLog(
                        HttpUtility.getIpAddr(httpRequest),
                        httpRequest.getParameter("host"),
                        httpRequest.getParameter("cpu"),
                        httpRequest.getParameter("user"),
                        httpRequest.getParameter("language") != null ?
                                httpRequest.getParameter("language") :
                                (httpRequest.getHeader("accept-language").isEmpty() ? "Unknown" : httpRequest.getHeader("accept-language")),
                        httpRequest.getParameter("platform"),
                        httpRequest.getHeader("user-agent"),
                        httpRequest.getParameter("port") != null ? Integer.parseInt(httpRequest.getParameter("port")) : null, //port
                        httpRequest.getParameter("statusCode") != null ?
                                Integer.parseInt(httpRequest.getParameter("statusCode")) :
                                (httpRequest.getAttribute("javax.servlet.error.status_code") == null ? 200 : Integer.parseInt(httpRequest.getAttribute("javax.servlet.error.status_code").toString())), //statusCode
                        TraceEventType.Start,
                        httpRequest.getParameter("type") != null ? httpRequest.getParameter("type") : httpRequest.getMethod(),
                        httpRequest.getHeader("host"),
                        httpRequest.getParameter("requestPath") != null ? httpRequest.getParameter("requestPath") : httpRequest.getRequestURI(),
                        httpRequest.getParameter("refererUrl"),
                        new Date(httpRequest.getSession().getLastAccessedTime())
                );
                //log.setRefererUrl(httpRequest.getHeader("Referer"));

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

                sessionService.add(session);
                information.setData(InformationLevel.SUCCESS);
                return information;
            }
        });
    }

    @RequestMapping(value = "session")
    public Information session() {
        return handler(new Information<List<Session>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                Information<List<Session>> info = (Information<List<Session>>) information;
                Map<String, String> params = new HashMap<String, String>();
                info.setData(sessionService.get(params));
                return info;
            }
        });
    }

    @RequestMapping(value = "debug")
    public Information debug(ServletRequest request) {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;

        return handler(new Information<Object[]>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                information.setData(new Object[]{
                        httpRequest.getAuthType(),
                        httpRequest.getAttributeNames(),
                        httpRequest.getContextPath(),
                        httpRequest.getCookies(),
                        httpRequest.getCharacterEncoding(),
                        httpRequest.getContentLength(),
                        httpRequest.getContentType(),
                        httpRequest.getHeaderNames(),
                        httpRequest.getLocalAddr(),
                        httpRequest.getLocale(),
                        httpRequest.getLocales(),
                        httpRequest.getLocalName(),
                        httpRequest.getLocalPort(),
                        httpRequest.getMethod(),
                        httpRequest.getPathInfo(),
                        httpRequest.getPathTranslated(),
                        httpRequest.getParameterMap(),
                        httpRequest.getParameterNames(),
                        httpRequest.getProtocol(),
                        httpRequest.getQueryString(),
                        httpRequest.getRemoteUser(),
                        httpRequest.getRequestedSessionId(),
                        httpRequest.getRequestURI(),
                        httpRequest.getRequestURL(),
                        httpRequest.getRemoteAddr(),
                        httpRequest.getRemoteHost(),
                        httpRequest.getRemotePort(),
                        httpRequest.getServletPath(),
                        httpRequest.getSession(),
                        httpRequest.getScheme(),
                        httpRequest.getServerName(),
                        httpRequest.getServerPort(),
                        httpRequest.getUserPrincipal()
                });

                return information;
            }
        });
    }

    @RequestMapping(value = "debug/session")
    public Information debugSession() {
        return handler(new Information<HttpSession>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                information.setData(HttpSessionFilter.session.get().getSession());
                return information;
            }
        });
    }


    public DiagnosticController() {
        viewPath = "diagnostic";
    }

    @Autowired
    private SessionService sessionService;
}
