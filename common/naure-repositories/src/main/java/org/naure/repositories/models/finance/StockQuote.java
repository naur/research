package org.naure.repositories.models.finance;

import java.util.Date;

/**
 * Created by Administrator on 6/17/14.
 */
public class StockQuote extends Quote {

    public StockQuote() {

    }

    public StockQuote(Date date, double open, double close, double high, double low, double volume) {
        this.date = date;
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
        this.volume = volume;
    }

    //证券代码
    private String code;
    //type
    private String type;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
