package org.naure.repositories.models.finance;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
public class Quote {
    public double getOpen() {
        return open;
    }

    public void setOpen(double open) {
        this.open = open;
    }

    public double getHigh() {
        return high;
    }

    public void setHigh(double high) {
        this.high = high;
    }

    public double getLow() {
        return low;
    }

    public void setLow(double low) {
        this.low = low;
    }

    public double getClose() {
        return close;
    }

    public void setClose(double close) {
        this.close = close;
    }

    public double getSettle() {
        return settle;
    }

    public void setSettle(double settle) {
        this.settle = settle;
    }

    public double getVolume() {
        return volume;
    }

    public void setVolume(double volume) {
        this.volume = volume;
    }

    public double getTurnover() {
        return turnover;
    }

    public void setTurnover(double turnover) {
        this.turnover = turnover;
    }

    public double getOpenInterest() {
        return openInterest;
    }

    public void setOpenInterest(double openInterest) {
        this.openInterest = openInterest;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    //今开盘 最高价 最低价 收盘价 结算价
    private double open;
    private double high;
    private double low;
    private double close;
    private double settle;

    // 【成交量、持仓量：手（按单边计算） 】
    // 【成交额：万元（按单边计算）】
    private double volume;  //成交量
    private double turnover; //成交金额
    private double openInterest; //持仓量

    private Date date;
}
