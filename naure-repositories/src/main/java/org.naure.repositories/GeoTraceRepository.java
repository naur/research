package org.naure.repositories;

import org.naure.common.location.GeoTrace;
import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.SessionLog;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/19/12
 * Time: 9:42 AM
 * To change this template use File | Settings | File Templates.
 */
public class GeoTraceRepository extends Repository {
    public boolean add(GeoTrace geoTrace) throws Exception {
        return workspace.add(geoTrace);
    }

    public <T> List<GeoTrace> get(T params) throws Exception {
        return workspace.get(params, GeoTrace.class);
    }
}
