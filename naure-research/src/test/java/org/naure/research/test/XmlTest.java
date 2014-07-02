/*
 * @(#) XmlTest.java 2014-23-02
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.test;

import org.junit.Test;
import org.naure.common.util.RequestClient;

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
public class XmlTest {

    private String stockUri = "http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol={0}&begin_date={1}&end_date={2}&type={3}";
    private String stock = "sz300197";
    private String beginDate = "20140701";
    private String endDate = "20140701";
    private String type = "xml";

    @Test
    public void test() throws IOException {
        String result = RequestClient.getInstance().get(
                MessageFormat.format(stockUri, stock, beginDate, endDate, type)
        );


    }
}
