/*
 * @(#) StockRange.java 2014-29-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.repositories.models.finance;

import org.naur.common.entities.Entity;

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
public class StockRange extends Entity {
    private static final long serialVersionUID = 8700781440991060420L;
    public int start;
    public int end;
    public StockType type;

    public StockRange(StockType type, int start, int end) {
        this.type = type;
        this.start = start;
        this.end = end;
    }

    //证券代码, 包含sh,sz
    public String getCode(int stock) {
        return String.format(type + "%1$06d", stock);
    }
}
