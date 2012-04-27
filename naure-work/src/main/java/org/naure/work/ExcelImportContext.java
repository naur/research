package org.naure.work;


import org.naure.common.pattern.HandlerBase;
import org.naure.utility.excel.ExcelDocument;
import org.naure.utility.excel.ExcelRow;
import org.naure.utility.excel.ExcelSheet;
import org.naure.utility.excel.ExcelTranslate;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/21/11
 * Time: 7:06 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ExcelImportContext<T> extends ExcelContext<T> {

    public ExcelImportContext() {
        this(null, null);
    }

    public ExcelImportContext(ExcelDocument document) {
        this(document, null);
    }

    public ExcelImportContext(HandlerBase validateHandler) {
        this(null, validateHandler);
    }

    public ExcelImportContext(ExcelDocument document, HandlerBase validateHandler) {
        super(document, validateHandler);
    }

    private void importExcel() throws Exception {
        //解析 Excel
        ExcelSheet sheet = document.sheets(0);
        ExcelTranslate<T> translate;
        ExcelRow row;

        //处理第一行
        row = sheet.row(this.startIndex);
        parseHead(row);
        sheet.heads = this.heads;

        //处理每一行数据
        for (int i = this.startIndex + 1; i <= sheet.rowNum(); i++) {
            row = sheet.row(i);

            //已经到 Excel 的最后一行, 该歇息了 ！
            if (row.IsNullOrEmpty() || row.getCells().length < 7) {
                return;
            }

            //使用 Strategy 解析行信息
            translate = row.translate();
            //使用 Override parseRow 解析行信息
            parseRow(row, translate);

            if (translate.isError()) {
                //转换有错误, 反馈错误信息！
                notifications.addAll(translate.getNotifications());
                continue;
            }

            //验证数据
            if (validateHandler != null) {
                validateHandler.process(translate);
            }
            if (translate.isError()) {
                //验证数据有错误, 反馈错误信息！
                notifications.addAll(translate.getNotifications());
                continue;
            }

            this.parseRowSuccess(this, translate);

//            if (!translate.isError()) {
//                //验证数据
//                if (validateHandler != null) {
//                    validateHandler.Process(translate);
//                }
//                if (!translate.isError()) {
//                    this.parseRowSuccess(this, translate.getEntities());
//                } else {
//                    //验证数据有错误, 反馈错误信息！
//                    notification.addAll(translate.getNotification());
//                }
//            } else {
//                //转换有错误, 反馈错误信息！
//              notification  .addAll(translate.getNotification());
//            }
        }
    }

    @Override
    public void execute() throws Exception {
        importExcel();
    }
}