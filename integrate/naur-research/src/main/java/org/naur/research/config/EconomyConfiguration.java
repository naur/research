/*
 * @(#) EconomyConfiguration.java 2015-01-31
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * <pre>
 * author Administrator
 *
 *
 * 创建日期: 2015-01-31
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Configuration
public class EconomyConfiguration {
    @Value("${economy.moneySupply}")
    public String moneySupply;
}
