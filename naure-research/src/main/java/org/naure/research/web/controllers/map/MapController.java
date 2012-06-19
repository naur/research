package org.naure.research.web.controllers.map;

import org.naure.common.entities.Information;
import org.naure.common.pattern.Func;
import org.naure.common.location.GeoCoordinate;
import org.naure.common.location.GeoPosition;
import org.naure.common.location.GeoTrace;
import org.naure.services.GeoTraceService;
import org.naure.web.ControllerBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/16/12
 * Time: 9:02 AM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "map", method = {RequestMethod.GET, RequestMethod.POST})
public class MapController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return view("view");
    }

    @RequestMapping(value = "path")
    public Information path() {
        Information<List<GeoTrace>> information = handler(new Information<List<GeoTrace>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                Information<List<GeoTrace>> info = (Information<List<GeoTrace>>) information;
                Map<String, String> params = new HashMap<String, String>();
                info.setData(MapController.this.geoTraceService.get(params));
                return info;
            }
        });

        return information;
    }

    @RequestMapping(value = "trace/{longitude}/latitude")
    public Information trace(@PathVariable double longitude, @PathVariable double latitude) {
        Information<String> information = information = handler(new Information<String>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) {
                return null;  //To change body of implemented methods use File | Settings | File Templates.
            }
        });

        return information;
    }

    public MapController() {
        this.viewPath = "map";
    }

    @Autowired
    private GeoTraceService geoTraceService;
}
