package org.naure.utility.excel;


import org.naure.common.patterns.Strategy;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/11/12
 * Time: 5:12 PM
 * To change this template use File | Settings | File Templates.
 */
public class ExcelStrategy<T> implements Strategy<ExcelRow> {
    @Override
    public void execute() {
    }

    @Override
    public void setContext(ExcelRow row) {
        this.row = row;
        this.translate = new ExcelTranslate<T>();
        this.translate.setRowIndex(this.row.rowIndex() + 1);
    }

    public ExcelTranslate getTranslate() {
        return translate;
    }

    private ExcelRow row;
    private ExcelTranslate<T> translate;
}
