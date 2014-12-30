/*
 * @(#)StringUtil.java 2013-5-14
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.util;

import org.naure.common.GlobalConstants;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;


/**
 * 数值工具类
 * 
 * <pre>
 * @author heliang
 *
 *
 * 创建日期: 2013-10-9
 * 修改人 :  
 * 修改说明: 
 * 评审人 ：
 * </pre>
 */
public class NumberUtil {

    public static final int DEFAULT_SCALE = 2;

    public static Double DOUBLE_ZERO = Double.valueOf("0");

    /**
     * 如果d1为null，返回d2
     * 
     * @param d1
     * @param d2
     * @return
     */
    public static Double nvl(Double d1, Double d2) {
        if (d1 == null)
            return d2;
        else
            return d1;
    }

    public static Double nvl(Double d1) {
        if (d1 == null)
            return 0.00D;
        else
            return d1;
    }

    public static Long nvl(Long d1, Long d2) {
        if (d1 == null)
            return d2;
        else
            return d1;
    }

    public static Long nvl(Long d1) {
        if (d1 == null)
            return 0L;
        else
            return d1;
    }

    public static Integer nvl(Integer d1, Integer d2) {
        if (d1 == null)
            return d2;
        else
            return d1;
    }

    public static Integer nvl(Integer d1) {
        if (d1 == null)
            return 0;
        else
            return d1;
    }

    /**
     * 两个数字是否相等
     */
    public static boolean equals(Short n1, Short n2) {
        return equalsImpl(n1, n2);
    }

    /**
     * 两个数字是否相等
     */
    public static boolean equals(Integer n1, Integer n2) {
        return equalsImpl(n1, n2);
    }

    /**
     * 两个数字是否相等
     */
    public static boolean equals(Long n1, Long n2) {
        return equalsImpl(n1, n2);
    }

    /**
     * 两个数字是否相等
     */
    public static boolean equals(Double n1, Double n2) {
        return equalsImpl(n1, n2);
    }

    private static boolean equalsImpl(Number n1, Number n2) {
        if (n1 == null && n2 == null) {
            return true;
        }

        if (n1 == null || n2 == null) {
            return false;
        }

        return n1.equals(n2);
    }

    /**
     * 第一个数字，是否和后面任一数字相等
     */
    public static boolean equalsAnyone(Integer n1, Integer... n2) {
        return equalsAnyoneImpl(n1, n2);
    }

    /**
     * 第一个数字，是否和后面任一数字相等
     */
    public static boolean equalsAnyone(Long n1, Long... n2) {
        return equalsAnyoneImpl(n1, n2);
    }

    /**
     * 第一个数字，是否和后面任一数字相等
     */
    public static boolean equalsAnyone(Double n1, Double... n2) {
        return equalsAnyoneImpl(n1, n2);
    }

    private static boolean equalsAnyoneImpl(Number n1, Number... n2) {
        if (n1 == null && (n2 == null || n2.length == 0)) {
            return true;
        }

        for (Number n : n2) {
            if (equalsImpl(n1, n)) {
                return true;
            }
        }

        return false;
    }

    public static String getPercent(Double d) {
        if (d == null) {
            return GlobalConstants.ZERO_PERCENTAGE;
        }

        // 获取格式化类实例
        NumberFormat nf = NumberFormat.getPercentInstance();
        // 设置小数位
        nf.setMinimumFractionDigits(2);
        nf.setGroupingUsed(false);

        return nf.format(d);
    }

    /**
     * getPercent重载，根据录入精度要求显示对应小数位
     * 
     * @param d
     * @param scale 保留小数位个数
     * @return
     */
    public static String getPercent(Double d,int scale) {
        if (d == null) {
            return GlobalConstants.ZERO_PERCENTAGE;
        }

        // 获取格式化类实例
        NumberFormat nf = NumberFormat.getPercentInstance();
        // 设置小数位
        nf.setMinimumFractionDigits(scale);
        nf.setGroupingUsed(false);

        return nf.format(d);
    }
    
    /**
     * 保留小数精度
     * 
     * @param db
     * @param num
     *            保留小数位个数
     * @return
     */
    public static Double parseScale(Double db, int num) {
        if (null == db)
            return Double.valueOf(0);
        return new BigDecimal(db).setScale(num, RoundingMode.HALF_UP).doubleValue();
    }
    
    public static boolean isNotNullOrZero(Integer num){
        if (null != num && num !=0) {
            return true;
        }
        return false;
    }
    
    public static boolean isNotNullOrZero(Long num){
        if (null != num && num !=0) {
            return true;
        }
        return false;
    }


    /**
     * 四舍五入-保留两位小数
     * 
     * @param d
     * @return
     */
    public static Double round(Double d) {
        return round(d, DEFAULT_SCALE, false);
    }

    /**
     * 四舍五入-保留两位小数
     * 
     * @param d
     * @param scale
     *            保留的位数
     * @return
     */
    public static Double round(Double d, int scale) {
        return round(d, scale, false);
    }

    /**
     * 四舍五入保留指定的小数
     * 
     * @param d
     * @param scale
     *            保留的位数
     * @param isGroupingUsed
     *            是否显示千分位
     * @return 返回处理后的结果，出现异常则返回d
     */
    public static Double round(Double d, int scale, boolean isGroupingUsed) {
        NumberFormat nf = NumberFormat.getInstance();
        nf.setMaximumFractionDigits(scale);
        nf.setGroupingUsed(isGroupingUsed);
        try {
            return Double.valueOf(nf.format(d));
        } catch (RuntimeException e) {
            return Double.valueOf(d);
        }
    }
}
