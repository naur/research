package org.naure.work;


import org.naure.utility.excel.ExcelRow;
import org.naure.utility.excel.ExcelTranslate;
import org.naure.utility.excel.strategy.IStrategyBase;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11/1/11
 * Time: 11:31 AM
 * To change this template use File | Settings | File Templates.
 */
public class ExcelStrategy<T>  implements IStrategyBase {

    @Override
    public void execute() {
    }

    @Override
    public void setContext(ExcelRow row) {
        this.row = row;
        this.translate = new ExcelTranslate<T>();
        this.translate.RowIndex = row.RowIndex() + 1;
    }

    @Override
    public ExcelTranslate getTranslate() {
        return translate;
    }

    private ExcelRow row;
    private ExcelTranslate<T> translate;
}
