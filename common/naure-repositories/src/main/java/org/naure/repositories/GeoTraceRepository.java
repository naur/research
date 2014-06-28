package org.naure.repositories;

import org.naure.common.location.GeoCoordinate;
import org.naure.common.location.GeoPosition;
import org.naure.common.location.GeoTrace;
import org.naure.repositories.construction.Repository;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
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

    public boolean exists(final GeoTrace geoTrace) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", geoTrace.getName());
            put("class", geoTrace.collectionName());
        }};

        return this.exists(query);
    }

    public boolean add(final GeoTrace geoTrace) throws Exception {
        geoTrace.setCreated(Calendar.getInstance().getTime());
        geoTrace.setUpdated(geoTrace.getCreated());
        return workspace.add(geoTrace);
    }

    public boolean update(final GeoTrace geoTrace) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", geoTrace.getName());
            put("class", new GeoTrace().collectionName());
        }};

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            //TODO 以前这个参数是数组，未验证 List 是否可以存储。
            put("positions", geoTrace.getPositions().toArray());
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", new GeoTrace().collectionName());
        return workspace.update(update);
    }
}
