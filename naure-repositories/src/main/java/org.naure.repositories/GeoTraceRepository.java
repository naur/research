package org.naure.repositories;

import org.naure.common.location.GeoTrace;
import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.Eng;
import org.naure.repositories.models.SessionLog;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/19/12
 * Time: 9:42 AM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class GeoTraceRepository extends Repository {
    public boolean add(GeoTrace geoTrace) throws Exception {
        return workspace.add(geoTrace);
    }

    public GeoTrace get(int identifier) throws Exception {
        return workspace.get(identifier, GeoTrace.class);
    }

    public <T> List<GeoTrace> get(T params) throws Exception {
        return workspace.get(params, GeoTrace.class);
    }

    public <T> boolean update(T params) throws Exception {
        return workspace.update(params);
    }
}
