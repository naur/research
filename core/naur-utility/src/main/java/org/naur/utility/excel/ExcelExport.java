package org.naur.utility.excel;

import org.naur.common.patterns.Handler;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/21/11
 * Time: 7:06 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ExcelExport<T> extends ExcelComponent<T> {

    public ExcelExport() {
        this(null, null, null);
    }

    public ExcelExport(List<T> entities) {
        this(null, null, entities);
    }

    public ExcelExport(ExcelType excelType) {
        this(new ExcelDocument(excelType), null, null);
    }

    public ExcelExport(ExcelDocument document) {
        this(document, null, null);
    }

    public ExcelExport(Handler validateHandler) {
        this(new ExcelDocument(), validateHandler, null);
    }

    public ExcelExport(ExcelDocument document, Handler validateHandler, List<T> entities) {
        super(document, validateHandler);
        if (null != entities) {
            this.setEntities(entities);
        }
    }

    private ExcelDocument createExcel(List<T> list) throws Exception {
        ExcelSheet sheet = currentSheet(true);

        ExcelTranslate<T> translate = null;
        sheet.setTitle(title, heads == null ? 0 : heads.size());

        if (heads != null && !heads.isEmpty()) {
            sheet.setHead(this.heads);
        }

        T item;
        int index = 0;
        for (int i = 0; i < list.size(); i++) {
            item = list.get(i);
            if (null == item) {
                continue;
            }
            //验证数据
            if (validateHandler != null) {
                translate = new ExcelTranslate<T>();
                translate.addEntity(item);
                translate = validateHandler.process(translate);
                if (null != translate && translate.isError()) {
                    //验证数据有错误, 反馈错误信息！
                    notifications.addAll(translate.getNotifications());
                    continue;
                }
            }

            //写入 ExcelRow
            sheet.createRow();
            //设置 Excel 第一列的序列号
            sheet.currentRow.setCell(String.valueOf(index + 1), 0);
            index += 1;

            //使用 Strategy 解析行信息
            translate = sheet.currentRow.translate();
            translate.addEntity(item);
            //使用 Override parseRow 解析行信息
            parseRow(sheet.currentRow, translate);
            //收集 translate 的 Notification 信息；
            notifications.addAll(translate.getNotifications());
        }

        this.autoSizeColumn(sheet);

        return document;
    }

    private void autoSizeColumn(ExcelSheet sheet) {
        for (int l = 0; l < heads.size(); l++) {
            //createExcel.getSheet().autoSizeColumn(l, true);
            sheet.getHssfSheet().autoSizeColumn(l, true);
        }
    }

    @Override
    public void execute() throws Exception {
        this.document = createExcel(entities);
    }
}
