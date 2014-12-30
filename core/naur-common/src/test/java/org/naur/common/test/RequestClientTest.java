/*
 * @(#) RequestClientTest.java 2014-07-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.test;

import org.junit.Test;
import org.naur.common.util.RequestClient;

import java.io.IOException;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-07-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class RequestClientTest {

    //http://www.google.com/ig/api?stock=600455
    //http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=19950802&end_date=20120723&type=xml
    //http://qt.gtimg.cn/q=
    //realtime: http://hq.sinajs.cn/list=shxxxxxx,szxxxxxx
    //capital: http://finance.sina.com.cn/realstock/company/{0}/jsvar.js

    private String uri = "http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000609&begin_date=19950802&end_date=20120723&type=xml";

    @Test
    public void getStockTest() throws IOException {
        String result = RequestClient.getInstance().get(uri);
        System.out.println(result);
    }
}
