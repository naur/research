/*
 * @(#) StockRange.java 2014-29-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.repositories.models.finance;

/**
 * <pre>
 * author jiaruizhi
 * 存储 stock 范围
 *
 * 创建日期: 2014-29-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class StockRange {
    public int start;
    public int end;
    public StockType type;

    public StockRange(StockType type, int start, int end) {
        this.type = type;
        this.start = start;
        this.end = end;
    }

    public String getCode(int stock) {
        return String.format(type + "%1$06d", stock);
    }
}
