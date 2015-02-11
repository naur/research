/*
 * @(#) SecurityConfig.java 2014-59-01
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.research.config;

import org.naur.repositories.models.finance.Stock;
import org.naur.repositories.models.finance.StockRange;
import org.naur.repositories.models.finance.StockType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * author Administrator
 *
 * 创建日期: 2014-59-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Configuration
public class SecurityConfiguration {

    private static final String COMMA = ",";
    private static final String WHIPPLETREE = "--";

    private List<StockRange> ranges = null;

    /**
     * 解析 properties 里配置的 stock 范围
     * <pre>
     *     security.stock.sh=600000--603993
     *     security.stock.sz=000001--002725,300001--300383
     * </pre>
     */
    public List<StockRange> getStockRanges() {
        if (null == ranges) {
            ranges = new ArrayList<StockRange>();
        }
        //有值
        if (0 < ranges.size()) {
            return ranges;
        }

        //格式【000001--002725,300001--300383】
        String[] arrs = null;
        for (String item : sh.split(COMMA)) {
            arrs = item.split(WHIPPLETREE);
            ranges.add(new StockRange(StockType.SH, Integer.parseInt(arrs[0]), Integer.parseInt(arrs[1])));
        }
        for (String item : sz.split(COMMA)) {
            arrs = item.split(WHIPPLETREE);
            ranges.add(new StockRange(StockType.SZ, Integer.parseInt(arrs[0]), Integer.parseInt(arrs[1])));
        }
        for (String item : specify.split(COMMA)) {
            ranges.add(new StockRange(Enum.valueOf(StockType.class, item.substring(0, 2).toUpperCase()),
                    Integer.parseInt(item.substring(2)), Integer.parseInt(item.substring(2))));
        }
        return ranges;
    }

    /**
     * 返回 stock 的类型 [sh or sz]
     *
     * @param stock 不包含 sh sz
     */
    public String getType(String stock) {
        int index = specify.indexOf(stock);
        if (-1 < index) {
            //TODO 暂时根据 index 来取值
            return specify.substring(index - 2, index).toUpperCase();
        } else {
            return stockTypePrefix.get(stock.substring(0, 1));
        }
    }

    private final Map<String, String> stockTypePrefix = new HashMap<String, String>() {
        private static final long serialVersionUID = -5892367415336780892L;

        {
            put("0", "SZ");
            put("3", "SZ");
            put("6", "SH");
        }
    };

    @Value("${security.stock.sh}")
    public String sh;
    @Value("${security.stock.sz}")
    public String sz;
    @Value("${security.stock.specify}")
    public String specify;
    @Value("${security.stock.filter}")
    public String filter;
    @Value("${security.stock.realtime.uri}")
    public String stockRealtimeUri;
    @Value("${security.stock.capital.uri}")
    public String stockCapitalUri;
    @Value("${security.stock.history.uri}")
    public String stockHistoryUri;
}
