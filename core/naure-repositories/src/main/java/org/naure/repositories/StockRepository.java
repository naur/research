package org.naure.repositories;

import org.apache.commons.lang3.StringUtils;
import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.finance.Stock;
import org.naure.repositories.models.finance.StockQuote;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private StockQuoteRepository stockQuoteRepository;

    /**
     * 查询文档以及子文档：
     * <pre>
     *     TODO stat 的功能未实现
     *      查询价格子文档的入参必须是这种格式【quotes.date】或【quotes.stat.xxx】
     *      查询统计指标的入参必须是【stat.xxx】
     * </pre>
     */
    public List<Stock> get(Map<String, Object> params) throws Exception {
        Map<String, Object> stocksParams = new HashMap<String, Object>();
        Map<String, Object> quotesParams = new HashMap<String, Object>();
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            if (entry.getKey().contains("quotes.")) {
                quotesParams.put(StringUtils.substringAfter(entry.getKey(), "."), entry.getValue());
            } else {
                quotesParams.put(entry.getKey(), entry.getValue());
                stocksParams.put(entry.getKey(), entry.getValue());
            }
        }
        List<Stock> stocks = this.get(stocksParams, Stock.class);
        List<StockQuote> quotes = this.get(quotesParams, StockQuote.class);
        return stocks;
    }

    /**
     * 如果 stock 存在，就要判断 quotes 是否存在，quotes 只要有一个不存在，就返回不存在
     */
    public boolean exists(final Stock stock) throws Exception {
        boolean result = true;
        if (result = this.exists(identifier(stock))) {
            for (StockQuote quote : stock.getQuotes()) {
                if (!(result = stockQuoteRepository.exists(quote))) break;
            }
        }
        return result;
    }

    /**
     * 新版本：包含 【Update Stock 文档】和【Update Quotes文档】
     * 旧版本：包含 【Update 文档】和【Update 子文档】
     */
    public boolean update(final Stock stock) throws Exception {
        return this.updateStock(stock) && this.updateQuotes(stock);
    }

    /**
     * 包含 【Add 文档】和【Update 文档】【Add 子文档】
     */
    public boolean add(final Stock stock) throws Exception {
        boolean result = true;

        //【Add 文档】【Update 文档】
        if (!this.exists(identifier(stock))) {
            stock.setCreated(Calendar.getInstance().getTime());
            stock.setUpdated(stock.getCreated());
            result = workspace.add(stock);
        } else {
            result = this.updateStock(stock);
        }

        //【Add 子文档】
        for (StockQuote quote : stock.getQuotes()) {
            if (null == quote.getCode()) quote.setCode(stock.getCode());
            if (null == quote.getType()) quote.setType(stock.getType());
            if (result && !stockQuoteRepository.exists(quote)) {
                result = stockQuoteRepository.add(quote);
            }
        }

        return result;
    }

    //只更新文档
    private boolean updateStock(final Stock stock) throws Exception {
        //【Update 文档】
        Map<String, Object> query = identifier(stock);
        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            if (null != stock.getName()) put("name", stock.getName());
            if (null != stock.getTotalCapital()) put("totalCapital", stock.getTotalCapital());
            if (null != stock.getCurrCapital()) put("currCapital", stock.getCurrCapital());
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", stock.getClass());
        return update(update);
    }

    //新版本：只更新 Quotes
    //旧版本：只更新子文档
    private boolean updateQuotes(final Stock stock) throws Exception {
        boolean result = true;
        //【Update 子文档】
        for (StockQuote quote : stock.getQuotes()) {
            if (!result) break;
            quote.setCode(stock.getCode());
            quote.setType(stock.getType());
            result = stockQuoteRepository.update(quote);
        }
        return result;
    }

    /**
     * 新版本：只判断 文档，嵌入文档或者 Quotes 在 StockQuoteRepository 里判断
     * 旧版本：即判断 文档，也判断嵌入文档
     */
    private Map identifier(final Stock stock) throws Exception {
        if (null == stock.getCode() || null == stock.getType()) {
            throw new Exception("stock.code 或 stock.type 不能为空, " + stock.toString());
        }
        Map<String, Object> identifier = new HashMap<String, Object>();
        identifier.put("code", stock.getCode());
        identifier.put("type", stock.getType());
        identifier.put("class", stock.getClass());
        return identifier;
    }
}
