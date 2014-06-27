package org.naure.repositories.test;

import org.junit.Test;
import org.naure.repositories.StockRepository;
import org.naure.repositories.models.finance.Stock;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Administrator on 6/17/14.
 */
public class StockRepositoryTest {

    @Autowired
    private StockRepository stockRepository;

    @Test
    public void initStockInfo_SH() throws Exception {
        //sh: 600000 -- 603993
        for (int i = 600000; i <= 603993; i++) {
            stockRepository.add(parseStock("SH", i));
        }
    }

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
        return stock;
    }
}
