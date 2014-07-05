package org.naure.repositories.test;

import junit.framework.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.common.test.UnitTestBase;
import org.naure.repositories.config.MongoConfiguration;
import org.naure.repositories.construction.MongoWorkspace;
import org.naure.repositories.models.Session;
import org.naure.repositories.models.finance.Stock;
import org.naure.repositories.models.finance.StockQuote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/2/12
 * Time: 2:26 PM
 * To change this template use File | Settings | File Templates.
 */
public class MongoDBTest extends UnitTestBase {

    @Autowired
    private MongoConfiguration mongoConfiguration;
    @Autowired
    private MongoWorkspace mongoWorkspace;
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private Random random = new Random();

    //查询：所有数据
    @Test
    public void testGetAll() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
    }

    //查询：所有数据, 指定范围
    @Test
    public void testGetAllRange() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put("quotes.date", new Tree(Type.Between)
                    .setLeft(new Tree(dateFormat.parse("2014-02-02")))
                    .setRight(new Tree(dateFormat.parse("2014-02-04"))));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
    }

    //TODO 查询：排序 代码未完成
    @Ignore
    @Test
    public void testSort() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Sort.name(), new Tree<String>(Type.Sort, "code"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
    }

    //查询：子集合数据-相等查询
    @Test
    public void testGetSubCollection() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put("code", "600003");
            put("quotes", new Tree(Type.Field, new HashMap<String, Object>() {{
                put("date", dateFormat.parse("2014-03-02"));
            }}));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(1, result.get(0).getQuotes().size());
    }

    //查询：子集合数据-指定范围查询
    @Test
    public void testGetSubCollectionRange() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            //put(Type.Sort.name(), new Tree<String>(Type.Sort, "quotes.date"));
            put("match1", new HashMap<String, Object>() {{
                put("type", "test");
                put("code", "600005");
            }});
            put("match2", new HashMap<String, Object>() {{
                put("quotes.date", new Tree(Type.Between)
                        .setLeft(new Tree(dateFormat.parse("2014-05-02")))
                        .setRight(new Tree(dateFormat.parse("2014-05-04"))));
            }});
            put("unwind", "quotes");
            put("group", "quotes");
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(3, result.get(0).getQuotes().size());
        //Assert.assertEquals("2014-07-02", dateFormat.format(result.get(0).getQuotes().get(0).getDate()));
        //Assert.assertEquals("2014-07-04", dateFormat.format(result.get(0).getQuotes().get(2).getDate()));
    }

    //查询：分页数据
    @Test
    public void testPaging() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Paging.name(), new Tree(Type.Paging, new Tree<Integer>(3), new Tree<Integer>(1)));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(3, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
    }

    //查询：排除特定字段
    @Test
    public void testExclude() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Exclude.name(), new Tree<String>(Type.Exclude, "quotes"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(0, result.get(0).getQuotes().size());
    }

    @Before
    public void init() throws Exception {
        mongoWorkspace.delete(new HashMap<String, Object>() {{
            put("type", "test");
            put("class", Stock.class);
        }});

        for (int i = 600001; i <= 600005; i++) {
            mongoWorkspace.add(parseStock("test", i));
        }
    }

    private Stock parseStock(String type, int code) throws ParseException {
        Stock stock = new Stock();
        stock.setCode(String.valueOf(code));
        stock.setType(type);
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-0" + String.valueOf(code).substring(5) + "-01"), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()
        ));
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-0" + String.valueOf(code).substring(5) + "-02"), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()
        ));
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-0" + String.valueOf(code).substring(5) + "-03"), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()
        ));
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-0" + String.valueOf(code).substring(5) + "-04"), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()
        ));
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-0" + String.valueOf(code).substring(5) + "-05"), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()
        ));
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-0" + String.valueOf(code).substring(5) + "-06"), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt(), random.nextInt()
        ));
        return stock;
    }
}
