package org.naure.services;

import org.naure.common.location.GeoTrace;
import org.naure.repositories.GeoTraceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return geoTraceRepository.get(identifier, GeoTrace.class);
    }

    public List<GeoTrace> get(Map params) throws Exception {
        return geoTraceRepository.get(params, GeoTrace.class);
    }

    public boolean add(final GeoTrace geoTrace) throws Exception {
        return geoTraceRepository.add(geoTrace);
    }

    public boolean update(final Map params) throws Exception {
        return geoTraceRepository.update(params);
    }

    @Autowired
    private GeoTraceRepository geoTraceRepository;
}
