package org.naure.utility.excel;

import com.jd.fce.fdm.common.patterns.Handler;
import org.naure.common.patterns.Handler;

import java.lang.ref.WeakReference;
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
        if (null != entities) this.setEntities(entities);
    }

    private ExcelDocument createExcel(List<T> list) throws Exception {
        ExcelSheet sheet = currentSheet(true);

        ExcelTranslate<T> translate = null;
        sheet.setTitle(title, heads.size());

        if (heads != null && !heads.isEmpty()) {
            sheet.setHead(this.heads);
        }

        WeakReference<List<T>> weak = new WeakReference<List<T>>(list);
        if (weak.get() != null && weak.get().size() > 0) {
            T item;
            for (int i = 0; i < weak.get().size(); i++) {
                item = weak.get().get(i);
                if (null == item) continue;
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
                sheet.currentRow.setCell(String.valueOf(i + 1), 0);

                //使用 Strategy 解析行信息
                translate = sheet.currentRow.translate();
                translate.addEntity(item);
                //使用 Override parseRow 解析行信息
                parseRow(sheet.currentRow, translate);
                //收集 translate 的 Notification 信息；
                notifications.addAll(translate.getNotifications());
            }
        }

        list = null;
        weak = null;

        for (int l = 0; l < heads.size(); l++) {
            //createExcel.getSheet().autoSizeColumn(l, true);
            sheet.getHssfSheet().autoSizeColumn(l, true);
        }
        //return createExcel.getWb();
        return document;
    }

    @Override
    public void execute() throws Exception {
        this.document = createExcel(entities);
    }
}
