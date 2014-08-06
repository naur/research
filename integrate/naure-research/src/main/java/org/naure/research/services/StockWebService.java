/*
 * @(#) StockWebService.java 2014-46-06
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.services;

import org.naure.common.util.RequestClient;
import org.naure.repositories.models.finance.Stock;
import org.naure.research.config.SecurityConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.castor.CastorMarshaller;
import org.springframework.stereotype.Service;

import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.io.StringReader;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * <pre>
 * author Administrator
 * 通过 web api 获取股票相关信息
 * 创建日期: 2014-46-06
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Service
public class StockWebService {

    //股票配置信息
    @Autowired
    private SecurityConfiguration securityConfiguration;
    //xml解析
    @Autowired
    private CastorMarshaller castorMarshaller;
    //请求的类型
    private String type = "xml";
    //日期解析
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

    /**
     * 获取股票历史数据
     *
     * @param stock [sz000010]
     * @param dates beginDate: [19950802], endDate: [20120723]
     */
    public Stock getHistory(String stock, Date... dates) throws IOException {
        Date beginDate = dates[0];
        Date endDate = dates.length > 1 ? dates[1] : beginDate;

        String xml = RequestClient.getInstance().get(
                MessageFormat.format(
                        securityConfiguration.stockHistoryUri,
                        stock, dateFormat.format(beginDate), dateFormat.format(endDate),
                        type)
        );
        return (Stock) castorMarshaller.unmarshal(new StreamSource(new StringReader(xml)));
    }

    /**
     * 获取股票股本相关信息
     *
     * @param stock [sz300197]
     */
    public Stock getCapital(String stock) throws IOException {
        String result = RequestClient.getInstance().get(
                MessageFormat.format(securityConfiguration.stockCapitalUri, stock)
        );
        StreamSource stream = new StreamSource(result);
        castorMarshaller.unmarshal(stream);

        return null;
    }

    /**
     * 获取股票实时信息
     *
     * @param stock [shxxxxxx,szxxxxxx]
     */
    public List<Stock> getRealtime(String... stock) throws IOException {
        String result = RequestClient.getInstance().get(
                MessageFormat.format(securityConfiguration.stockCapitalUri, stock.toString())
        );
        StreamSource stream = new StreamSource(result);
        castorMarshaller.unmarshal(stream);

        return null;
    }
}