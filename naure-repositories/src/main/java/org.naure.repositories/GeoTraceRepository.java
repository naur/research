package org.naure.repositories;

import org.naure.common.location.GeoCoordinate;
import org.naure.common.location.GeoPosition;
import org.naure.common.location.GeoTrace;
import org.naure.repositories.construction.Repository;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/19/12
 * Time: 9:42 AM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class GeoTraceRepository extends Repository {
    public GeoTrace get(int identifier) throws Exception {
        return workspace.get(identifier, GeoTrace.class);
    }

    public <T> List<GeoTrace> get(T params) throws Exception {
        return workspace.get(params, GeoTrace.class);
    }

    public boolean add(final GeoTrace geoTrace) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", geoTrace.getName());
            put("class", geoTrace.collectionName());
        }};
        if (this.exists(query)) {
            throw new Exception(String.format("GeoTrace: 已经存在 name=%0$s, 的记录", geoTrace.getName()));
        }
        geoTrace.setCreated(Calendar.getInstance().getTime());
        geoTrace.setUpdated(geoTrace.getCreated());
        return workspace.add(geoTrace);
    }

    public boolean update(final Map params) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", params.get("name"));
            put("class", params.get("class"));
        }};

        if (!this.exists(query)) {
            //throw new Exception(String.format("GeoTrace: 不存在 name=%0$s, 的记录",  params.get("name")));
            //当没有时进行 【增加】操作
            GeoPosition<GeoCoordinate>[] positions = (GeoPosition<GeoCoordinate>[])params.get("position");
            GeoTrace geoTrace = new GeoTrace();
            geoTrace.setName(String.valueOf(params.get("name")));
            geoTrace.getPositions().add(new GeoPosition<GeoCoordinate>(new GeoCoordinate(positions[0].getLocation().getLongitude(), positions[0].getLocation().getLatitude())));
            return this.add(geoTrace);
        }

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            put("positions", params.get("position"));
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", new GeoTrace().collectionName());
        return workspace.update(update);
    }
}
