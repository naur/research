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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.castor.CastorMarshaller;
import org.w3c.dom.Document;

import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.io.StringReader;
import java.text.MessageFormat;

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
    private SecurityConfiguration securityConfiguration;
    @Autowired
    private CastorMarshaller castorMarshaller;
    private String stock = "sz300197";
    private String beginDate = "20140701";
    private String endDate = "20140701";
    private String type = "xml";

    @Test
    public void test() throws IOException {
        String xml = RequestClient.getInstance().get(
                MessageFormat.format(securityConfiguration.stockHistoryUri, stock, beginDate, endDate, type)
        );

        Object result = castorMarshaller.unmarshal(new StreamSource(new StringReader(xml)));
        Assert.assertTrue(result instanceof Stock);
    }
}
