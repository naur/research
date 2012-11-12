package org.naure.work;


import org.apache.poi.ss.usermodel.Workbook;
import org.naure.common.patterns.HandlerBase;
import org.naure.utility.excel.ExcelDocument;
import org.naure.utility.excel.ExcelTranslate;
import org.naure.utility.excel.ExcelType;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.lang.ref.WeakReference;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/21/11
 * Time: 7:06 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ExcelExportContext<T> extends ExcelContext<T> {

    public ExcelExportContext(){
        this(new ExcelDocument(), null);
    }

    public ExcelExportContext(ExcelType excelType){
        this(new ExcelDocument(excelType), null);
    }

    public ExcelExportContext(ExcelDocument document) {
        this(document, null);
    }
    public ExcelExportContext(HandlerBase validateHandler) {
        this(new ExcelDocument(), validateHandler);
    }
    public ExcelExportContext(ExcelDocument document, HandlerBase validateHandler) {
        super(document, validateHandler);
    }

    private void export() throws Exception {
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        createExcel(entities).write(os);
        inputStream = new ByteArrayInputStream(os.toByteArray());
        os.close();
        os = null;
        System.gc();
    }

    private Workbook createExcel(List<T> list) throws Exception {
        ExcelTranslate<T> translate;
        document.sheets(0).setTitle(title, heads.size());
        if (heads != null && !heads.isEmpty()) {
            document.sheets(0).setHead(this.heads);
        }

        WeakReference<List<T>> weak = new WeakReference<List<T>>(list);
        if (weak.get() != null && weak.get().size() > 0) {
            T item;
            for (int i = 0; i < weak.get().size(); i++) {
                item = weak.get().get(i);
                document.sheets(0).createRow();
                //设置 Excel 第一列的序列号
                document.sheets(0).currentRow.setCell(String.valueOf(i + 1), 0);

                //使用 Strategy 解析行信息
                translate = document.sheets(0).currentRow.translate();
                translate.addEntity(item);
                //使用 Override parseRow 解析行信息
                parseRow(document.sheets(0).currentRow, translate);
                //收集 translate 的 Notification 信息；
                notifications.addAll(translate.getNotifications());
            }
        }

        list = null;
        weak = null;
        System.gc();

        for (int l = 0; l < heads.size(); l++) {
            //createExcel.getSheet().autoSizeColumn(l, true);
            document.sheets(0).getHssfSheet().autoSizeColumn(l, true);
        }
        //return createExcel.getWb();
        return document.getWorkbook();
    }

    @Override
    public void execute() throws Exception {
        export();
    }
}
