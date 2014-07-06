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

    /**
     * 包含 【Update 文档】和【Update 子文档，只支持更新一行子文档】
     */
    public boolean update(final Stock stock) throws Exception {
        Map<String, Object> query = identifier(stock);

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            if (null != stock.getName()) put("name", stock.getName());
            if (null != stock.getTotalCapital()) put("totalCapital", stock.getTotalCapital());
            if (null != stock.getCurrCapital()) put("currCapital", stock.getCurrCapital());
            if (null != stock.getQuotes() && 0 < stock.getQuotes().size()) {
                if (null != stock.getQuotes().get(0).getOpen())
                    put("quotes.open", stock.getQuotes().get(0).getOpen());
                if (null != stock.getQuotes().get(0).getHigh())
                    put("quotes.high", stock.getQuotes().get(0).getHigh());
                if (null != stock.getQuotes().get(0).getLow())
                    put("quotes.low", stock.getQuotes().get(0).getLow());
                if (null != stock.getQuotes().get(0).getClose())
                    put("quotes.close", stock.getQuotes().get(0).getClose());
                if (null != stock.getQuotes().get(0).getVolume())
                    put("quotes.volume", stock.getQuotes().get(0).getVolume());
                if (null != stock.getQuotes().get(0).getSettle())
                    put("quotes.settle", stock.getQuotes().get(0).getSettle());
                if (null != stock.getQuotes().get(0).getOpenInterest())
                    put("quotes.openInterest", stock.getQuotes().get(0).getOpenInterest());
                if (null != stock.getQuotes().get(0).getTurnover())
                    put("quotes.turnover", stock.getQuotes().get(0).getTurnover());
            }
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", stock.getClass());
        return update(update);
    }

    /**
     * 包含 【Add 文档】和【Update 文档】【Add 子文档，只支持Add一行子文档，因为包含范围的查询条件也只能返回是否存在，精确度不够】
     */
    public boolean add(final Stock stock) throws Exception {
        boolean result = false;

        //没有 quotes 时表示增加文档
        //TODO 多的这一步是因为每次都去判断 exists 太耗性能
        if (null == stock.getQuotes() || 0 >= stock.getQuotes().size()) {
            stock.setCreated(Calendar.getInstance().getTime());
            stock.setUpdated(stock.getCreated());
            result = workspace.add(stock);
        } else {
            //有quotes时，表示【增加子文档并且更新文档】
            Stock temp = new Stock();
            temp.setCode(stock.getCode());
            temp.setType(stock.getType());
            //先判断文档是否存在
            if (!exists(temp)) {
                stock.setCreated(Calendar.getInstance().getTime());
                stock.setUpdated(stock.getCreated());
                result = workspace.add(stock);
            } else {
                //否则添加子文档
                Map<String, Object> query = identifier(stock);
                Map<String, Object> update = new HashMap<String, Object>();
                update.put("query", query);
                update.put("update", new HashMap<String, Object>() {{
                    if (null != stock.getName()) put("name", stock.getName());
                    if (null != stock.getTotalCapital()) put("totalCapital", stock.getTotalCapital());
                    if (null != stock.getCurrCapital()) put("currCapital", stock.getCurrCapital());
                    put("updated", Calendar.getInstance().getTime());
                    put("quotes", stock.getQuotes());

                }});
                update.put("class", stock.getClass());
                return update(update);
            }
        }
        return result;
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
