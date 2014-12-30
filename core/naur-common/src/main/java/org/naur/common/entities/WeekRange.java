/*
 * @(#) WeekRange.java 2014-33-18
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.entities;

import java.util.Date;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-33-18
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class WeekRange {
    private int year;
    private int week;
    private Date start;
    private Date end;
    private String key;
    private String value;

    public WeekRange() {
    }

    public WeekRange(int year, int week, Date start, Date end) {
        this.year = year;
        this.week = week;
        this.start = start;
        this.end = end;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
