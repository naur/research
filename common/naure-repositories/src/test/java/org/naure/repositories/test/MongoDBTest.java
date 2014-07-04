package org.naure.repositories.test;

import junit.framework.Assert;
import org.junit.Before;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
        Assert.assertEquals(2, result.get(0).getQuotes().size());
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
        Assert.assertEquals(2, result.get(0).getQuotes().size());
    }

    //查询：排除特定字段
    public void testExclude() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Exclude.name(), new Tree<String>("quotes"));
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

        for (int i = 600000; i <= 600004; i++) {
            mongoWorkspace.add(parseStock("test", i));
        }
    }

    private Stock parseStock(String type, int code) throws ParseException {
        Stock stock = new Stock();
        stock.setType(type);
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-07-0" + code), random.nextDouble(), random.nextDouble(), random.nextDouble(), random.nextDouble(), random.nextDouble()
        ));
        stock.getQuotes().add(new StockQuote(
                dateFormat.parse("2014-07-0" + (code + 1)), random.nextDouble(), random.nextDouble(), random.nextDouble(), random.nextDouble(), random.nextDouble()
        ));
        return stock;
    }
}
