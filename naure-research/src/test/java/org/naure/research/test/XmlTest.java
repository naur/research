/*
 * @(#) XmlTest.java 2014-23-02
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.test;

import org.junit.Test;
import org.naure.common.test.UnitTestBase;
import org.naure.common.util.RequestClient;
import org.naure.research.config.SecurityConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.castor.CastorMarshaller;

import java.io.IOException;
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
        String result = RequestClient.getInstance().get(
                MessageFormat.format(securityConfiguration.stockHistoryUri, stock, beginDate, endDate, type)
        );

        castorMarshaller.unmarshal();
    }
}
