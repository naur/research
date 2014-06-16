package org.naure.repositories.models.finance;

import java.util.HashMap;
import java.util.Map;

/**
 * 期货市场
 *
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 3:57 PM
 * To change this template use File | Settings | File Templates.
 */
public class Future extends Security {
    public Future() {

    }

    public Future(String species, String contract) {
        this.species = species;
        this.contract = contract;
    }

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

    private String species;     //品种
    private String contract;  //合约代码、交割月

    @Override
    public Map identifier() {
        return new HashMap<String, Object>() {{
            put("species", species);
            put("contract", contract);
        }};
    }
}
