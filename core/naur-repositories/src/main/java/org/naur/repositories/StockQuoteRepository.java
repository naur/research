package org.naur.repositories;

import org.naur.common.patterns.Tree;
import org.naur.common.patterns.Type;
import org.naur.repositories.construction.Repository;
import org.naur.repositories.models.finance.StockQuote;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 6/17/14.
 */
@Component
public class StockQuoteRepository extends Repository {

    public List<StockQuote> get(Map<String, Object> params) throws Exception {
        //TODO 如果不是按时间条件查询数据，那么就排除　quotes 的值。
        if (!params.containsKey("data")) {
            params.put(Type.Exclude.name(), new Tree(Type.Exclude, "quotes"));
        }

        return this.get(params, StockQuote.class);
    }

    public boolean exists(final StockQuote quote) throws Exception {
        return this.exists(identifier(quote));
    }

    /**
     * 包含 【Update 文档】和【Update 子文档，只支持更新一行子文档】
     */
    public boolean update(final StockQuote quote) throws Exception {
        Map<String, Object> query = identifier(quote);

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            if (null != quote.getOpen()) put("open", quote.getOpen());
            if (null != quote.getHigh()) put("high", quote.getHigh());
            if (null != quote.getLow()) put("low", quote.getLow());
            if (null != quote.getClose()) put("close", quote.getClose());
            if (null != quote.getVolume()) put("volume", quote.getVolume());
            if (null != quote.getSettle()) put("settle", quote.getSettle());
            if (null != quote.getOpenInterest()) put("openInterest", quote.getOpenInterest());
            if (null != quote.getTurnover()) put("turnover", quote.getTurnover());
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", quote.getClass());
        return update(update);
    }

    /**
     * 包含 【Add 文档】和【Update 文档】【Add 子文档，只支持Add一行子文档，因为包含范围的查询条件也只能返回是否存在，精确度不够】
     */
    public boolean add(final StockQuote quote) throws Exception {
        quote.setCreated(Calendar.getInstance().getTime());
        quote.setUpdated(quote.getCreated());
        return workspace.add(quote);
    }

    /**
     * 即判断 文档，也判断嵌入文档
     */
    private Map identifier(final StockQuote quote) throws Exception {
        if (null == quote.getCode() || null == quote.getType() || null == quote.getDate()) {
            throw new Exception("quote.code, quote.type 或 quote.date 不能为空, " + quote.toString());
        }

        Map<String, Object> identifier = new HashMap<String, Object>();
        identifier.put("code", quote.getCode());
        identifier.put("type", quote.getType());
        identifier.put("date", quote.getDate());
        identifier.put("class", quote.getClass());
        return identifier;
    }
}
