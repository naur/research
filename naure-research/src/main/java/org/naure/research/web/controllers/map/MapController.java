package org.naure.research.web.controllers.map;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.exception.*;
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

import java.util.*;

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

    @RequestMapping(value = "geo")
    public String geo() {
        return view("geo");
    }

    @RequestMapping(value = "path/{name}")
    public Information path(@PathVariable final String name) {
        return handler(new Information<List<GeoTrace>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                Information<List<GeoTrace>> info = (Information<List<GeoTrace>>) information;
                Map<String, String> params = new HashMap<String, String>();
                params.put("name", name);
                info.setData(geoTraceService.get(params));
                return info;
            }
        });
    }

    //增加 GeoTrace
//    @RequestMapping(value = "trace/{name}/{longitude}/{latitude}/start")
//    public Information traceStart(@PathVariable final String name, @PathVariable final double longitude, @PathVariable final double latitude) {
//        return handler(new Information<String>(), new Func<Information, Information>() {
//            @Override
//            public Information execute(Information information) throws Exception {
//                GeoTrace geoTrace = new GeoTrace();
//                geoTrace.setName(name);
//                geoTrace.getPositions().add(new GeoPosition<GeoCoordinate>(new GeoCoordinate(longitude, latitude)));
//                information.setData(geoTraceService.add(geoTrace) ? "Success" : "Error");
//                information.setLevel(InformationLevel.SUCCESS.value());
//                return information;
//            }
//        });
//    }

    //增加 或 更新 GeoTrace
    @RequestMapping(value = "trace/{name}/{longitude},{latitude}")
    public Information trace(@PathVariable final String name, @PathVariable final double longitude, @PathVariable final double latitude) {
        return handler(new Information<String>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                Map<String, Object> params = new HashMap<String, Object>();
                params.put("name", name);
                params.put("position", new GeoPosition[]{
                        new GeoPosition<GeoCoordinate>(new GeoCoordinate(longitude, latitude))
                });
                information.setData(geoTraceService.update(params) ? "Success" : "Error");
                information.setLevel(InformationLevel.SUCCESS.value());
                return information;
            }
        });
    }

    public MapController() {
        this.viewPath = "map";
    }

    @Autowired
    private GeoTraceService geoTraceService;
}
