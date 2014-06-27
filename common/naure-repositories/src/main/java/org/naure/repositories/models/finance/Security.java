package org.naure.repositories.models.finance;

import org.naure.common.entities.Entity;

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

    public List<T> getQuotes() {
        if (quotes == null)
            quotes = new ArrayList<T>();
        return quotes;
    }

    public void setQuotes(List<T> quotes) {
        this.quotes = quotes;
    }

    private List<T> quotes;

    //有价证券标识符，可能由多种信息来表示一种有价证券
    public abstract Map identifier();
}
