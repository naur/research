/*
 * @(#) StockWebService.java 2014-46-06
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.research.services;

import org.naur.common.util.RequestClient;
import org.naur.repositories.models.finance.Stock;
import org.naur.research.config.SecurityConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.castor.CastorMarshaller;
import org.springframework.stereotype.Service;
import org.springframework.util.PatternMatchUtils;

import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.io.StringReader;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
        String data = RequestClient.getInstance().get(
                MessageFormat.format(securityConfiguration.stockCapitalUri, stock)
        );

        Stock result = null;
        Double totalCapital = null;
        Double currCapital = null;

        //从数据里提取提取[总股本]和[流通股本]
        //格式：
        //      group0 = totalcapital = 16089.84; //×Ü¹É±¾\nvar currcapital = 5089.91;
        //      group1 = 16089.84
        //      group2 = .84
        //      group3 = 5089.91
        //      group4 = .91
        Pattern p = Pattern.compile("totalcapital\\s=\\s(\\d+(\\D\\d+)?);[\\s\\S]+currcapital\\s=\\s(\\d+(\\D\\d+)?);");
        Matcher m = p.matcher(data);
        while (m.find()) {
            totalCapital = Double.parseDouble(m.group(1));
            currCapital = Double.parseDouble(m.group(3));
        }

        if (null != totalCapital && null != currCapital) {
            result = new Stock();
            result.setType(stock.substring(0, 2).toUpperCase());
            result.setCode(stock.substring(2));
            result.setTotalCapital(totalCapital);
            result.setCurrCapital(currCapital);
        }

        return result;
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
