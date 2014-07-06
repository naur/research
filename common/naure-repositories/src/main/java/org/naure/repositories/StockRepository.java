package org.naure.repositories;

import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.finance.Stock;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 6/17/14.
 */
@Component
public class StockRepository extends Repository {

    public List<Stock> get(Map<String, Object> params) throws Exception {
        //TODO 如果不是按时间条件查询数据，那么就排除　quotes 的值。
        if (!params.containsKey("quotes.data")) {
            params.put(Type.Exclude.name(), new Tree(Type.Exclude, "quotes"));
        }

        return this.get(params, Stock.class);
    }

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

    /**
     * 即判断 文档，也判断嵌入文档
     */
    private Map identifier(final Stock stock) {
        Map<String, Object> identifier = new HashMap<String, Object>();
        identifier.put("code", stock.getCode());
        identifier.put("type", stock.getType());
        identifier.put("class", stock.getClass());
        if (stock.getQuotes().size() > 0 && null != stock.getQuotes().get(0).getDate()) {
            identifier.put("quotes.date", stock.getQuotes().get(0).getDate());
        }
        return identifier;
    }
}
