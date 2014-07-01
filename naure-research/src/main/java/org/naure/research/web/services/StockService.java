/*
 * @(#) StockService.java 2014-12-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.web.services;

import com.sun.javafx.binding.StringFormatter;
import org.apache.xerces.parsers.XMLDocumentParser;
import org.apache.xerces.parsers.XMLParser;
import org.exolab.castor.xml.util.XMLParserUtils;
import org.naure.common.util.RequestClient;
import org.naure.research.config.SecurityConfiguration;
import org.naure.repositories.models.finance.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.xml.MarshallingHttpMessageConverter;
import org.springframework.oxm.castor.CastorMarshaller;
import org.springframework.stereotype.Service;

import javax.xml.transform.stream.StreamSource;
import java.beans.XMLDecoder;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringBufferInputStream;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;

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
    //股票配置信息
    @Autowired
    private SecurityConfiguration securityConfiguration;
    @Autowired
    private CastorMarshaller castorMarshaller;
    //请求的类型
    private String type = "xml";

    /**
     * 获取股票历史数据
     *
     * @param stock     [sz000010]
     * @param beginDate [19950802]
     * @param endDate   [20120723]
     */
    public Stock getHistory(String stock, Date beginDate, Date endDate) throws IOException {
        String result = RequestClient.getInstance().get(
                MessageFormat.format(securityConfiguration.stockHistoryUri, stock, beginDate, endDate, type)
        );
        StreamSource stream = new StreamSource(result);
        castorMarshaller.unmarshal(stream);

        return null;
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
