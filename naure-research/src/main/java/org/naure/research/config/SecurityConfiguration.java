/*
 * @(#) SecurityConfig.java 2014-59-01
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.research.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

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
    public @Value("${security.stock.realtime.uri}") String stockRealtimeUri;
    public @Value("${security.stock.capital.uri}")  String stockCapitalUri;
    public @Value("${security.stock.history.uri}")  String stockHistoryUri;
}
