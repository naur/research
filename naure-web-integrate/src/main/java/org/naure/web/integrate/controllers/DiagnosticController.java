package org.naure.web.integrate.controllers;


import com.sun.syndication.feed.atom.Feed;
import org.naure.common.Information;
import org.naure.repositories.models.SessionLog;
import org.naure.web.integrate.ControllerBase;
import org.naure.web.integrate.HttpUtility;
import org.naure.web.integrate.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.xstream.XStreamMarshaller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;
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
@RequestMapping(value = "/diagnostic/", method = {RequestMethod.GET, RequestMethod.POST})
public class DiagnosticController extends ControllerBase {
    @RequestMapping(value = "session")
    public Information session() {
        Information<List<SessionLog>> information = new Information<List<SessionLog>>();
        try {
            Map<String, String> params = new HashMap<String, String>();
            information.setData(sessionService.get(params));
        } catch (Exception ex) {

        }
        return information; //.getData().get(1);
    }

    @RequestMapping(value = "a")
    public SessionLog a() {
        Information<List<SessionLog>> information = new Information<List<SessionLog>>();
        try {
            Map<String, String> params = new HashMap<String, String>();
            information.setData(sessionService.get(params));
        } catch (Exception ex) {

        }
        information.setCategory("session log");
        information.setKeywords("aaaaaaaaaaaaaaaaaaaaa");
        return information.getData().get(0);
    }

    @RequestMapping(value = "b")
    public Feed b() throws IOException {
        Information<List<SessionLog>> information = new Information<List<SessionLog>>();
        try {
            Map<String, String> params = new HashMap<String, String>();
            information.setData(sessionService.get(params));
        } catch (Exception ex) {

        }
        information.setCategory("session log");
        information.setKeywords("aaaaaaaaaaaaaaaaaaaaa");
        return HttpUtility.getFeed(information.getData(), xStreamMarshaller);
    }

//    @RequestMapping(value = "session/json", headers="Accept=application/json")
//    @ResponseBody
//    public Information sessionJsom() {
//        Information<List<SessionLog>> information = new Information<List<SessionLog>>();
//        try {
//            Map<String, String> params = new HashMap<String, String>();
//            information.setData(sessionService.get(params));
//        } catch (Exception ex) {
//
//        }
//        return information;
//    }
//
//    @RequestMapping(value = "session/atom", headers="Accept=application/atom+xml")
//    @ResponseBody
//    public Feed sessionAtom() {
//        Information<List<SessionLog>> information = new Information<List<SessionLog>>();
//        try {
//            Map<String, String> params = new HashMap<String, String>();
//            information.setData(sessionService.get(params));
//        } catch (Exception ex) {
//
//        }
//        Feed feed = new Feed();
//        feed.setFeedType("atom_1.0");
//        feed.setTitle("Session Logger Atom Feed");
//        //feed.setEntries(information.getData());
//        return feed;
//    }

    public DiagnosticController() {
        viewPath = "diagnostic/";
    }

    @Autowired
    private SessionService sessionService;
//    @Autowired
    private XStreamMarshaller xStreamMarshaller;
    private String XML_VIEW_NAME = "marshallingView";
}
