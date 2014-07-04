package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.Session;
import org.naure.repositories.models.finance.Stock;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 6/17/14.
 */
@Component
public class StockRepository extends Repository {

    public boolean exists(final Stock stock) throws Exception {
        return this.exists(identifier(stock));
    }

    public boolean update(final Stock stock) throws Exception {
        Map<String, Object> query = identifier(stock);

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            put("updated", Calendar.getInstance().getTime());
            put("quotes", stock.getQuotes());
        }});
        update.put("class", stock.getClass());
        return update(update);
    }

    public boolean add(final Stock stock) throws Exception {
        stock.setCreated(Calendar.getInstance().getTime());
        stock.setUpdated(stock.getCreated());
        return workspace.add(stock);
    }

    private Map identifier(final Stock stock) {
        return new HashMap<String, Object>() {{
            put("code", stock.getCode());
            put("type", stock.getType());
            put("class", stock.getClass());
        }};
    }

    private Map identifierQuote(final Stock stock) {
        return new HashMap<String, Object>() {{
            put("code", stock.getCode());
            put("type", stock.getType());
            put("class", stock.getClass());
        }};
    }
}
