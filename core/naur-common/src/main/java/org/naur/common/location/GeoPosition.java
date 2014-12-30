package org.naur.common.location;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/16/12
 * Time: 10:08 PM
 * To change this template use File | Settings | File Templates.
 */
//包含 GeoPosition(T) 类的类型参数所指定类型的位置数据。
public class GeoPosition<T> implements Serializable {
    public GeoPosition() {

    }

    public GeoPosition(T t) {
        this.location = t;
    }

    public T getLocation() {
        return location;
    }

    public void setLocation(T location) {
        this.location = location;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    private T location;      //获取或设置 GeoPosition(T) 对象的位置数据。
    private Date timestamp;  //获取或设置获得位置数据时的时间。
}
