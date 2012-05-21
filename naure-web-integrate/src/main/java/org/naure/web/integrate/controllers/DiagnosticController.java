package org.naure.web.integrate.controllers;


import org.naure.common.entities.Information;
import org.naure.repositories.models.SessionLog;
import org.naure.web.integrate.ControllerBase;
import org.naure.web.integrate.HttpSessionFilter;
import org.naure.web.integrate.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
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
    @RequestMapping(value = "view")
    public String view() {
        return view("view");
    }

    @RequestMapping(value = "session")
    public Information session() {
        Information<List<SessionLog>> information = new Information<List<SessionLog>>();
        try {
            Map<String, String> params = new HashMap<String, String>();
            information.setData(sessionService.get(params));
        } catch (Exception ex) {
            information.setKeywords(ex.getMessage());
        }
        return information;
    }

    @RequestMapping(value = "debug")
    public Information debug() {
        Information<HttpServletRequest> information = new Information<HttpServletRequest>();
        information.setData(HttpSessionFilter.session.get());
        return information;
    }


    public DiagnosticController() {
        viewPath = "diagnostic/";
    }

    @Autowired
    private SessionService sessionService;
}
