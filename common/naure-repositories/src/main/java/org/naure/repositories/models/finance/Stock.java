package org.naure.repositories.models.finance;

import java.util.HashMap;
import java.util.Map;

/**
 * 股票市场
 * <p/>
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 3:35 PM
 * To change this template use File | Settings | File Templates.
 */
public class Stock extends Security<StockQuote> {
    //证券代码
    private String code;
    //证券名称
    private String name;
    //type
    private String type;
    //总股本
    private Double totalCapital;
    //流通股本
    private Double currCapital;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Double getTotalCapital() {
        return totalCapital;
    }

    public void setTotalCapital(Double totalCapital) {
        this.totalCapital = totalCapital;
    }

    public Double getCurrCapital() {
        return currCapital;
    }

    public void setCurrCapital(Double currCapital) {
        this.currCapital = currCapital;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
