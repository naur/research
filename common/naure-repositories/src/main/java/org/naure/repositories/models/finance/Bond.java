package org.naure.repositories.models.finance;

import java.util.Map;

/**
 * 债券市场
 *
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/1/12
 * Time: 3:40 PM
 * To change this template use File | Settings | File Templates.
 */
public class Bond extends Security<Quote> {
    @Override
    public Map identifier() {
        return null;
    }
}
