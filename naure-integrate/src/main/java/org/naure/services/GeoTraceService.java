package org.naure.services;

import org.naure.common.location.GeoTrace;
import org.naure.repositories.GeoTraceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/18/12
 * Time: 6:32 PM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class GeoTraceService {
    public boolean add(GeoTrace geoTrace) throws Exception {
        return geoTraceRepository.add(geoTrace);
    }

    public <T> List<GeoTrace> get(T params) throws Exception {
        return geoTraceRepository.get(params);
    }

    @Autowired
    private GeoTraceRepository geoTraceRepository;
}
