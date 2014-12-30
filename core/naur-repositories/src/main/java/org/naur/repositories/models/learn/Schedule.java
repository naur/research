package org.naur.repositories.models.learn;

import org.naur.common.entities.Entity;

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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    private int number;
    private int pages;
    private int days;
    private String time;    //格式： 2010-01-01 -> 2010-02-02
    private String path;
    private String heading;
    private String comment;
}
