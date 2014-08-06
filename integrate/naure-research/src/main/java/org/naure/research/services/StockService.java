/*
 * @(#) StockService.java 2014-12-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.services;

import org.naure.repositories.StockRepository;
import org.naure.repositories.models.finance.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-12-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> get(Map<String, Object> params) throws Exception {
        return stockRepository.get(params);
    }

    public boolean edit(Stock stock) throws Exception {
        boolean result = false;

        if (stockRepository.exists(stock)) {
            result = stockRepository.update(stock);
        } else {
            result = stockRepository.add(stock);
        }
        return result;
    }
}