/*
 * @(#) XmlTest.java 2014-23-02
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.test;

import org.junit.Assert;
import org.junit.Test;
import org.naure.common.test.UnitTestBase;
import org.naure.common.util.RequestClient;
import org.naure.repositories.models.finance.Stock;
import org.naure.research.config.SecurityConfiguration;
import org.naure.research.web.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.castor.CastorMarshaller;

import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.io.StringReader;
import java.text.MessageFormat;
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
public class XmlTest extends UnitTestBase {

    @Autowired
    private StockService stockService;
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

    private String stock = "sz300197";
    private String beginDate = "20140701";
    private String endDate = "20140702";

    @Test
    public void test() throws IOException, ParseException {
        Stock result = stockService.getHistory(
                stock,
                dateFormat.parse(beginDate),
                dateFormat.parse(endDate));
        Assert.assertNotNull(result);
        Assert.assertEquals(2, result.getQuotes().size());
    }
}
