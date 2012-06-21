package org.naure.services;

import org.naure.common.location.GeoCoordinate;
import org.naure.common.location.GeoPosition;
import org.naure.common.location.GeoTrace;
import org.naure.repositories.GeoTraceRepository;
import org.naure.repositories.models.Eng;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/18/12
 * Time: 6:32 PM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class GeoTraceService {

    public GeoTrace get(int identifier) throws Exception {
        return geoTraceRepository.get(identifier);
    }

    public List<GeoTrace> get(Map params) throws Exception {
        return geoTraceRepository.get(params);
    }

    public boolean add(final GeoTrace geoTrace) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", geoTrace.getName());
        }};
        if (this.get(query).size() > 0) {
            throw new Exception(String.format("GeoTrace: 已经存在 name=%0$s, 的记录", geoTrace.getName()));
        }
        return geoTraceRepository.add(geoTrace);
    }

    public boolean update(final Map params) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", params.get("name"));
        }};

        if (this.get(query).size() <= 0) {
            //throw new Exception(String.format("GeoTrace: 不存在 name=%0$s, 的记录",  params.get("name")));
            //当没有时进行 【增加】操作
            GeoPosition<GeoCoordinate>[] positions = (GeoPosition<GeoCoordinate>[])params.get("position");
            GeoTrace geoTrace = new GeoTrace();
            geoTrace.setName(String.valueOf(params.get("name")));
            geoTrace.getPositions().add(new GeoPosition<GeoCoordinate>(new GeoCoordinate(positions[0].getLocation().getLongitude(), positions[0].getLocation().getLatitude())));
            return this.add(geoTrace);
        }
        return geoTraceRepository.update(params);
    }

    @Autowired
    private GeoTraceRepository geoTraceRepository;
}
