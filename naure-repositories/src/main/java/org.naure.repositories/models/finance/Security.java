package org.naure.repositories.models.finance;

import org.naure.common.entities.Entity;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 5:04 PM
 * To change this template use File | Settings | File Templates.
 */
public class Security extends Entity {
    public List<Quote> getQuotes() {
        return quotes;
    }

    public void setQuotes(List<Quote> quotes) {
        this.quotes = quotes;
    }

    private List<Quote> quotes;
}
