package org.naure.utility.excel;


import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.patterns.Handler;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/21/11
 * Time: 7:06 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ExcelImport<T> extends ExcelComponent<T> {

    public ExcelImport() {
        this(null, null);
    }

    public ExcelImport(ExcelDocument document) {
        this(document, null);
    }

    public ExcelImport(Handler validateHandler) {
        this(null, validateHandler);
    }

    public ExcelImport(ExcelDocument document, Handler validateHandler) {
        super(document, validateHandler);
    }

    protected boolean isEmpty(ExcelRow row, ExcelTranslate<T> translate, int col) {
        if (row.cells(col).value().isEmpty()) {
            this.addNotification(new Information<TranslateInfo>("translate", InformationLevel.ERROR.value(), new TranslateInfo(row.rowIndex() + 1, row.cells(col).columnName(), "值不能为空！")));
            //row.cells(col).setStyle(row.cells(col).style());
            //row.cells(col).setComment("值不能为空！");
            return true;
        }
        return false;
    }

    private void importExcel() throws Exception {
        //解析 Excel
        ExcelSheet sheet = currentSheet(); //todo document.sheets(0);
        if (null == sheet) {
            this.addNotification(new Information<TranslateInfo>("", InformationLevel.ERROR.value(), "名称为 [" + sheetName + "] 的 Sheet 不存在！"));
            return;
        }

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
            if (row.isNullOrEmpty() || row.getCells().length < this.columns) {
                return;
            }

            //使用 Strategy 解析行信息
            translate = row.translate();
            //使用 Override parseRow 解析行信息
            parseRow(row, translate);

            if (translate.isError()) {
                //转换有错误, 反馈错误信息！
                this.addNotification(translate.getNotifications());
                continue;
            }

            //验证数据
            if (validateHandler != null) {
                translate = validateHandler.process(translate);
            }
            if (translate.isError()) {
                //验证数据有错误, 反馈错误信息！
                this.addNotification(translate.getNotifications());
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