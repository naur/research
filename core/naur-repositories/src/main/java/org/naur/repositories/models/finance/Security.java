package org.naur.repositories.models.finance;

import org.naur.common.entities.Entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 有价证券
 * <p/>
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Security<T extends Quote> extends Entity {

    //价格信息
    private List<T> quotes;
    //统计指标
    private Stat stat;

    public List<T> getQuotes() {
        if (quotes == null)
            quotes = new ArrayList<T>();
        return quotes;
    }

    public void setQuotes(List<T> quotes) {
        this.quotes = quotes;
    }

    public Stat getStat() {
        return stat;
    }

    public void setStat(Stat stat) {
        this.stat = stat;
    }
}
