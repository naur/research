package org.naure.repositories.test;

import junit.framework.Assert;
import org.junit.Test;
import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.repositories.models.finance.Stock;
import org.naure.repositories.models.finance.StockQuote;

import javax.management.Query;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/2/12
 * Time: 2:26 PM
 * To change this template use File | Settings | File Templates.
 */
public class MongoDBEditTest extends MongoDBTest {

    //修改：更新文档某一个字段
    @Test
    public void updateTest() throws Exception {
        final Map<String, Object> query = new HashMap<String, Object>() {{
            put("code", "600004");
        }};

        List<Stock> result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertNull(result.get(0).getCurrcapital());

        final Map<String, Object> update = new HashMap<String, Object>() {{
            put("currcapital", 100d);
        }};

        mongoWorkspace.update(new HashMap<String, Object>() {{
            put("query", query);
            put("update", update);
            put("class", Stock.class);
        }});

        result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(100d, result.get(0).getCurrcapital());
    }

    //修改：【不检查嵌入文档的重复】, 在嵌入的子文档里添加一条记录, 同时修改文档的字段
    @Test
    public void addEmbedTest() throws Exception {
        final Map<String, Object> query = new HashMap<String, Object>() {{
            put("code", "600004");
        }};

        List<Stock> result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertNull(result.get(0).getCurrcapital());

        final Map<String, Object> update = new HashMap<String, Object>() {{
            put("currcapital", 100d);
            put("quotes", Arrays.asList(new StockQuote(dateFormat.parse("2014-04-15"), 1d, 1d, 1d, 1d, 1d)));
        }};

        mongoWorkspace.update(new HashMap<String, Object>() {{
            put("query", query);
            put("update", update);
            put("class", Stock.class);
        }});

        query.put("quotes.date", dateFormat.parse("2014-04-15"));
        query.put(Type.Sort.name(), new Tree(Type.Sort, "desc quotes.date"));
        result = mongoWorkspace.get(query, Stock.class);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(7, result.get(0).getQuotes().size());
        Assert.assertEquals(1d, result.get(0).getQuotes().get(0).getOpen());
    }
}
