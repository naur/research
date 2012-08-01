package org.naure.repositories.models.finance;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 3:57 PM
 * To change this template use File | Settings | File Templates.
 */
//期货市场
public class Future {
    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
        this.contract = contract;
    }

    public List<Quote> getQuotes() {
        return quotes;
    }

    public void setQuotes(List<Quote> quotes) {
        this.quotes = quotes;
    }

    private String species;     //品种
    private String contract;  //合约代码、交割月
    private List<Quote> quotes;
}
