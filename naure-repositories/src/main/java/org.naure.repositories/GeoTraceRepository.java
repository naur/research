package org.naure.repositories;

import org.naure.common.location.GeoTrace;
import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.Eng;
import org.naure.repositories.models.Session;
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

    public boolean add(GeoTrace geoTrace) throws Exception {
        geoTrace.setCreated(Calendar.getInstance().getTime());
        geoTrace.setUpdated(geoTrace.getCreated());
        return workspace.add(geoTrace);
    }

    public boolean update(final Map params) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", params.get("name"));
        }};
        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            put("positions", params.get("position"));
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", GeoTrace.class);
        return workspace.update(update);
    }
}
