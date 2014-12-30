package org.naur.research.web.controllers.map;

import org.naur.common.entities.Information;
import org.naur.common.entities.InformationLevel;
import org.naur.common.patterns.exception.*;
import org.naur.common.location.GeoCoordinate;
import org.naur.common.location.GeoPosition;
import org.naur.common.location.GeoTrace;
import org.naur.research.services.GeoTraceService;
import org.naur.integrate.web.ControllerBase;
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
                //TODO 参数由  Map<String, Object> 改为  GeoTrace, 未验证
//                Map<String, Object> params = new HashMap<String, Object>();
//                params.put("name", name);
//                params.put("position", new GeoPosition[]{
//                        new GeoPosition<GeoCoordinate>(new GeoCoordinate(longitude, latitude))
//                });

                GeoTrace geoTrace = new GeoTrace();
                geoTrace.setName(name);
                geoTrace.getPositions().add(new GeoPosition<GeoCoordinate>(new GeoCoordinate(longitude, latitude)));

                information.setData(geoTraceService.update(geoTrace) ? "Success" : "Error");
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
