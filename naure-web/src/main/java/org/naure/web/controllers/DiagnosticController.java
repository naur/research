package org.naure.web.controllers;


import org.naure.common.entities.Information;
import org.naure.common.location.GeoTrace;
import org.naure.common.pattern.Func;
import org.naure.repositories.models.Session;
import org.naure.web.ControllerBase;
import org.naure.web.HttpSessionFilter;
import org.naure.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

    @RequestMapping(value = "session")
    public Information session() {
//        Information<List<Session>> information = new Information<List<Session>>();
//        try {
//            Map<String, String> params = new HashMap<String, String>();
//            information.setData(sessionService.get(params));
//        } catch (Exception ex) {
//            information.setKeywords(ex.getMessage());
//        }


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
    public Information debug() {
        return handler(new Information<Object[]>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                information.setData(new Object[] {
                        HttpSessionFilter.session.get().getAuthType(),
                        HttpSessionFilter.session.get().getAttributeNames(),
                        HttpSessionFilter.session.get().getContextPath(),
                        HttpSessionFilter.session.get().getCookies(),
                        HttpSessionFilter.session.get().getCharacterEncoding(),
                        HttpSessionFilter.session.get().getContentLength(),
                        HttpSessionFilter.session.get().getContentType(),
                        HttpSessionFilter.session.get().getHeaderNames(),
                        HttpSessionFilter.session.get().getLocalAddr(),
                        HttpSessionFilter.session.get().getLocale(),
                        HttpSessionFilter.session.get().getLocales(),
                        HttpSessionFilter.session.get().getLocalName(),
                        HttpSessionFilter.session.get().getLocalPort(),
                        HttpSessionFilter.session.get().getMethod(),
                        HttpSessionFilter.session.get().getPathInfo(),
                        HttpSessionFilter.session.get().getPathTranslated(),
                        HttpSessionFilter.session.get().getParameterMap(),
                        HttpSessionFilter.session.get().getParameterNames(),
                        HttpSessionFilter.session.get().getProtocol(),
                        HttpSessionFilter.session.get().getQueryString(),
                        HttpSessionFilter.session.get().getRemoteUser(),
                        HttpSessionFilter.session.get().getRequestedSessionId(),
                        HttpSessionFilter.session.get().getRequestURI(),
                        HttpSessionFilter.session.get().getRequestURL(),
                        HttpSessionFilter.session.get().getRemoteAddr(),
                        HttpSessionFilter.session.get().getRemoteHost(),
                        HttpSessionFilter.session.get().getRemotePort(),
                        HttpSessionFilter.session.get().getServletPath(),
                        HttpSessionFilter.session.get().getSession(),
                        HttpSessionFilter.session.get().getScheme(),
                        HttpSessionFilter.session.get().getServerName(),
                        HttpSessionFilter.session.get().getServerPort(),
                        HttpSessionFilter.session.get().getUserPrincipal()
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
