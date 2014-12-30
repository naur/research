package org.naur.utility.excel.strategy;


import org.naur.utility.excel.*;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-7-25
 * Time: 上午10:06
 * To change this template use File | Settings | File Templates.
 */
public interface IStrategyBase {
    void execute();
    void setContext(ExcelRow row);
    ExcelTranslate getTranslate();
}
