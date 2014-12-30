/*
 * @(#) XmlTest.java 2014-23-02
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.test;

import org.junit.Assert;
import org.junit.Test;
import org.naur.common.test.UnitTestBase;
import org.naur.repositories.models.finance.Stock;
import org.naur.research.services.StockService;
import org.naur.research.services.StockWebService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-23-02
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class StockParseTest extends UnitTestBase {

    @Autowired
    private StockWebService stockWebService;
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

    private String stock = "sz300197";
    private String beginDate = "20140701";
    private String endDate = "20140702";

    @Test
    public void test() throws IOException, ParseException {
        Stock result = stockWebService.getHistory(
                stock,
                dateFormat.parse(beginDate),
                dateFormat.parse(endDate));
        Assert.assertNotNull(result);
        Assert.assertEquals(2, result.getQuotes().size());
    }
}
