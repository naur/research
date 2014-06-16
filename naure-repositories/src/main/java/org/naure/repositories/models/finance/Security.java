package org.naure.repositories.models.finance;

import org.naure.common.entities.Entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 有价证券
 *
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Security extends Entity {
    public Security() {

    }

    public List<Quote> getQuotes() {
        if (quotes == null)
            quotes = new ArrayList<Quote>();
        return quotes;
    }

    public void setQuotes(List<Quote> quotes) {
        this.quotes = quotes;
    }

    private List<Quote> quotes;

    public abstract Map identifier();
}
