package org.naure.common.location;

import org.naure.common.entities.Entity;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/18/12
 * Time: 9:55 AM
 * To change this template use File | Settings | File Templates.
 */
public class GeoTrace extends Entity {
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<GeoPosition<GeoCoordinate>> getPositions() {
        return positions;
    }

    public void setPositions(List<GeoPosition<GeoCoordinate>> positions) {
        this.positions = positions;
    }

    private String name;
    private List<GeoPosition<GeoCoordinate>> positions;
}
