package org.naure.home.web.controllers;


import org.naure.repositories.models.SessionLog;
import org.naure.web.integrate.ControllerBase;
import org.naure.web.integrate.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/diagnostic/")
public class DiagnosticController extends ControllerBase {
    @RequestMapping(method = RequestMethod.GET,  value = "session")
    @ResponseBody
    public List<SessionLog> log() {
        return sessionService.get();
    }

    public DiagnosticController() {
        viewPath = "diagnostic/";
    }

    @Autowired
    SessionService sessionService;
}
