package org.naure.repositories.models.finance;

import org.naure.common.entities.Entity;

import java.util.Date;

/**
 * 报价
 * <p>
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Quote extends Entity {
    //日期
    protected Date date;
    //今开盘
    protected Double open;
    //最高价
    protected Double high;
    //最低价
    protected Double low;
    //收盘价
    protected Double close;
    //成交量：手（按单边计算） 】
    protected Double volume;
    //结算价
    protected Double settle;
    //持仓量：手（按单边计算）
    protected Double openInterest;
    // 成交金额：万元（按单边计算）
    protected Double turnover;
    //统计指标
    protected Stat stat;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getOpen() {
        return open;
    }

    public void setOpen(Double open) {
        this.open = open;
    }

    public Double getHigh() {
        return high;
    }

    public void setHigh(Double high) {
        this.high = high;
    }

    public Double getLow() {
        return low;
    }

    public void setLow(Double low) {
        this.low = low;
    }

    public Double getClose() {
        return close;
    }

    public void setClose(Double close) {
        this.close = close;
    }

    public Double getVolume() {
        return volume;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }

    public Double getSettle() {
        return settle;
    }

    public void setSettle(Double settle) {
        this.settle = settle;
    }

    public Double getOpenInterest() {
        return openInterest;
    }

    public void setOpenInterest(Double openInterest) {
        this.openInterest = openInterest;
    }

    public Double getTurnover() {
        return turnover;
    }

    public void setTurnover(Double turnover) {
        this.turnover = turnover;
    }

    public Stat getStat() {
        return stat;
    }

    public void setStat(Stat stat) {
        this.stat = stat;
    }
}
