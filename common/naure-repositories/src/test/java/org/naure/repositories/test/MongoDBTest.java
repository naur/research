package org.naure.repositories.test;

import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
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

    @Test
    public void getTest() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(5, result.size());
    }

    @Test
    public void operationsTest() throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
    }

    @Test
    public void init() throws Exception {
        mongoWorkspace.delete(new HashMap<String, Object>() {{
            put("type", "test");
            put("class", Stock.class);
        }});

//        for (int i = 600000; i <= 600004; i++) {
//            mongoWorkspace.add(parseStock("test", i));
//        }
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
