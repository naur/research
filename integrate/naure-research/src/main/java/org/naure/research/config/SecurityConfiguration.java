/*
 * @(#) SecurityConfig.java 2014-59-01
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.config;

import org.naure.repositories.models.finance.Stock;
import org.naure.repositories.models.finance.StockRange;
import org.naure.repositories.models.finance.StockType;
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
        return ranges;
    }

    public final Map<String, String> stockTypePrefix = new HashMap<String, String>() {{
        put("0", "SZ");
        put("3", "SZ");
        put("6", "SH");
    }};

    @Value("${security.stock.sh}")
    public String sh;
    @Value("${security.stock.sz}")
    public String sz;
    @Value("${security.stock.filter}")
    public String filter;
    @Value("${security.stock.realtime.uri}")
    public String stockRealtimeUri;
    @Value("${security.stock.capital.uri}")
    public String stockCapitalUri;
    @Value("${security.stock.history.uri}")
    public String stockHistoryUri;
}
