package org.naur.repositories.test;

import org.junit.Ignore;
import org.junit.Test;
import org.naur.common.test.UnitTestBase;
import org.naur.repositories.StockRepository;
import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockQuote;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by Administrator on 6/17/14.
 */
public class StockRepositoryTest extends UnitTestBase {

    @Autowired
    private StockRepository stockRepository;

    //TODO 数据量太大，不执行
    @Ignore
    @Test
    public void initStockInfo_SH() throws Exception {
        //sh: 600000 -- 603993
        for (int i = 600000; i <= 603993; i++) {
            stockRepository.add(parseStock("SH", i));
        }
    }

    //TODO 数据量太大，不执行
    @Ignore
    @Test
    public void initStockInfo_SZ() throws Exception {
        //sz:  000001 -- 002725
        for (int i = 000001; i <= 002725; i++) {
            stockRepository.add(parseStock("SH", i));
        }
        //sz:  300001 -- 300383
        for (int i = 300001; i <= 300383; i++) {
            stockRepository.add(parseStock("SH", i));
        }
    }

    //http://finance.sina.com.cn/realstock/company/{0}/jsvar.js
    private Stock parseStock(String type, int code) {
        Stock stock = new Stock();
        stock.setType(type);
        stock.setCode(String.valueOf(code));
        stock.getQuotes().add(new StockQuote(
                Calendar.getInstance().getTime(), 1d, 2d, 3d, 4d, 5d
        ));
        return stock;
    }
}
