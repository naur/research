package org.naur.repositories.test;

import com.mongodb.util.JSON;
import junit.framework.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.naur.common.patterns.Tree;
import org.naur.common.patterns.Type;
import org.naur.common.test.UnitTestBase;
import org.naur.repositories.config.MongoConfiguration;
import org.naur.repositories.construction.MongoWorkspace;
import org.naur.repositories.models.Session;
import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockQuote;
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
public abstract class MongoDBTest extends UnitTestBase {

    @Autowired
    protected MongoWorkspace mongoWorkspace;
    protected SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private Random random = new Random();

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
