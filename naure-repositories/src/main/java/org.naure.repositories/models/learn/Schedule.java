package org.naure.repositories.models.learn;

import org.naure.common.entities.Entity;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/9/12
 * Time: 5:54 PM
 * To change this template use File | Settings | File Templates.
 */
public class Schedule extends Entity {

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    private int number;
    private String heading;
    private Date time;
    private String path;
}
