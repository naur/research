package org.naure.research.services;

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
        if (geoTraceRepository.exists(geoTrace)) {
            throw new Exception(String.format("GeoTrace: 已经存在 name=%0$s, 的记录", geoTrace.getName()));
        }
        return geoTraceRepository.add(geoTrace);
    }

    public boolean update(final GeoTrace geoTrace) throws Exception {

        if (!geoTraceRepository.exists(geoTrace)) {
            //throw new Exception(String.format("GeoTrace: 不存在 name=%0$s, 的记录",  params.get("name")));
            //当没有时进行 【增加】操作
            return this.add(geoTrace);
        }

        return geoTraceRepository.update(geoTrace);
    }

    @Autowired
    private GeoTraceRepository geoTraceRepository;
}
