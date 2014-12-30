package org.naur.common.location;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/16/12
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */
//表示由纬度和经度坐标确定的地理位置。也可以包括海拔高度、精度、速度和航向信息。
public class GeoCoordinate implements Serializable {
    public GeoCoordinate() {
    }

    public GeoCoordinate(double longitude, double latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public double getAltitude() {
        return altitude;
    }

    public void setAltitude(double altitude) {
        this.altitude = altitude;
    }

    public double getCourse() {
        return course;
    }

    public void setCourse(double course) {
        this.course = course;
    }

    public double getHorizontalAccuracy() {
        return horizontalAccuracy;
    }

    public void setHorizontalAccuracy(double horizontalAccuracy) {
        this.horizontalAccuracy = horizontalAccuracy;
    }

    public boolean isUnknown() {
        return isUnknown;
    }

    public void setUnknown(boolean unknown) {
        isUnknown = unknown;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public double getVerticalAccuracy() {
        return verticalAccuracy;
    }

    public void setVerticalAccuracy(double verticalAccuracy) {
        this.verticalAccuracy = verticalAccuracy;
    }

    private double altitude; //GeoCoordinate 的海拔高度（以米为单位）。
    private double course; //获取或设置行进方向（以相对于真北的度数为单位）。
    private double horizontalAccuracy; //获取或设置由 GeoCoordinate 给定的纬度和经度的精度（以米为单位）。
    private boolean isUnknown; //获取一个值，该值指示 GeoCoordinate 是否未包含纬度或经度数据。
    private double latitude; //获取或设置 GeoCoordinate 的纬度。
    private double longitude; //获取或设置 GeoCoordinate 的经度。
    private double speed; //获取或设置以米/秒为单位的速度。
    private double verticalAccuracy; //获取或设置由 GeoCoordinate 给定的海拔高度的精度（以米为单位）。
}
