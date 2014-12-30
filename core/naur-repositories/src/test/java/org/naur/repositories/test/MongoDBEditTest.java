package org.naur.repositories.test;

import junit.framework.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.naur.common.patterns.Tree;
import org.naur.common.patterns.Type;
import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockQuote;

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
        Assert.assertNull(result.get(0).getCurrCapital());

        final Map<String, Object> update = new HashMap<String, Object>() {{
            put("currCapital", 100d);
        }};

        mongoWorkspace.update(new HashMap<String, Object>() {{
            put("query", query);
            put("update", update);
            put("class", Stock.class);
        }});

        result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(100d, result.get(0).getCurrCapital());
    }

    //修改：在嵌入的子文档里添加2条记录, 同时修改文档的字段
    //TODO 错误单元测试
    @Ignore
    @Test
    public void addEmbedTest() throws Exception {
        final Map<String, Object> query = new HashMap<String, Object>() {{
            put("code", "600004");
        }};

        List<Stock> result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertNull(result.get(0).getCurrCapital());

        final Map<String, Object> update = new HashMap<String, Object>() {{
            put("currCapital", 100d);
            put("quotes", Arrays.asList(
                    new StockQuote(dateFormat.parse("2014-04-15"), 1d, 1d, 1d, 1d, 1d),
                    new StockQuote(dateFormat.parse("2014-04-17"), 2d, 2d, 2d, 2d, 2d)));
        }};

        mongoWorkspace.update(new HashMap<String, Object>() {{
            put("query", query);
            put("update", update);
            put("class", Stock.class);
        }});

        //TODO No property quote found for type Stock!
        query.put(Type.Sort.name(), new Tree(Type.Sort, "desc quotes.date"));
        result = mongoWorkspace.get(query, Stock.class);
        Assert.assertEquals(1, result.size());
        //TODO Assert.assertEquals(100d, result.get(0).getCurrCapital());
        Assert.assertEquals(8, result.get(0).getQuotes().size());
        Assert.assertEquals(2d, result.get(0).getQuotes().get(0).getOpen());
        Assert.assertEquals("2014-04-17", dateFormat.format(result.get(0).getQuotes().get(0).getDate()));
        Assert.assertEquals(1d, result.get(0).getQuotes().get(1).getOpen());
        Assert.assertEquals("2014-04-15", dateFormat.format(result.get(0).getQuotes().get(1).getDate()));
    }

    //修改：更新嵌入的子文档里的一条记录,
    @Test
    public void updateEmbedTest() throws Exception {
        final Map<String, Object> query = new HashMap<String, Object>() {{
            put("code", "600004");
            put("quotes.date", dateFormat.parse("2014-04-03"));
        }};

        List<Stock> result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(1, result.get(0).getQuotes().size());
        Assert.assertNotNull(result.get(0).getQuotes().get(0).getOpen());
        Assert.assertNotSame(9.98d, result.get(0).getQuotes().get(0).getOpen());

        final Map<String, Object> update = new HashMap<String, Object>() {{
            put("quotes.open", 9.98d);
        }};

        mongoWorkspace.update(new HashMap<String, Object>() {{
            put("query", query);
            put("update", update);
            put("class", Stock.class);
        }});

        result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(1, result.get(0).getQuotes().size());
        Assert.assertNotNull(result.get(0).getQuotes().get(0).getOpen());
        Assert.assertEquals(9.98d, result.get(0).getQuotes().get(0).getOpen());

    }

    //删除：文档
    @Test
    public void deleteTest() throws Exception {
        final Map<String, Object> query = new HashMap<String, Object>() {{
            put("code", "600004");
        }};

        List<Stock> result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertNull(result.get(0).getCurrCapital());
        Assert.assertEquals(6, result.get(0).getQuotes().size());


        query.put("class", Stock.class);
        mongoWorkspace.delete(query);

        query.remove("class");
        result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(0, result.size());
    }

    //删除：移除子文档的某几项
    @Test
    public void deleteEmbedTest() throws Exception {
        final Map<String, Object> query = new HashMap<String, Object>() {{
            put("code", "600004");
        }};

        List<Stock> result = mongoWorkspace.get(query, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertNull(result.get(0).getCurrCapital());
        Assert.assertEquals(6, result.get(0).getQuotes().size());

        //TODO
    }
}
