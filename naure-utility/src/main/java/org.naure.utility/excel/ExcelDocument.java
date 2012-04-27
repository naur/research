package org.naure.utility.excel;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.naure.utility.excel.strategy.IStrategyBase;


/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-7-15
 * Time: 上午11:42
 * To change this template use File | Settings | File Templates.
 */
public class ExcelDocument {

    //对无参数的默认构造函数，默认创建包含一个 sheet 的 workbook。[默认是 Excel 2003]
    public ExcelDocument() {
        this(new HSSFWorkbook(), null);
        //默认创建 一个名字为 sheet1 的 sheet.
        this.sheets = new ExcelSheet[]{new ExcelSheet(this, this.workbook.createSheet("sheet1"))};
    }

    public ExcelDocument(ExcelType excelType) {
        this.excelType = excelType;
        if (this.excelType == ExcelType.Excel2003) {
            this.workbook = new HSSFWorkbook();
        } else {
            this.workbook = new XSSFWorkbook();
        }
        //默认创建 一个名字为 sheet1 的 sheet.
        this.sheets = new ExcelSheet[]{new ExcelSheet(this, this.workbook.createSheet("sheet1"))};
    }

    public ExcelDocument(Workbook workbook) {
        this(workbook, null);
    }

    public ExcelDocument(Workbook workbook, IStrategyBase strategy) {
        this.workbook = workbook;
        this.strategy = strategy;
    }

    public ExcelSheet sheets(int index) {
        if (sheets == null) {
            sheets = new ExcelSheet[workbook.getNumberOfSheets()];
        }
        if (sheets[index] == null) {
            sheets[index] = new ExcelSheet(this, workbook.getSheetAt(index));
        }
        return sheets[index];
    }

    public IStrategyBase getStrategy() {
        return strategy;
    }

    public void setStrategy(IStrategyBase strategy) {
        this.strategy = strategy;
    }

    public Workbook getWorkbook() {
        return workbook;
    }

    public CellStyle redCellStyle(CellStyle style) {
        if (redCellStyle == null) {
            redCellStyle = workbook.createCellStyle();
            redCellStyle.cloneStyleFrom(style);
            redCellStyle.setFillForegroundColor(HSSFColor.RED.index);
            redCellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        }
        return redCellStyle;
    }

    public Comment getComment(String comment) {
        //添加注释的方法在 Excel 2003 和 2007 不一样，待定......
        //HSSFPatriarch patr = sheets[0].getHssfSheet().createDrawingPatriarch();
        Drawing patr = sheets[0].getHssfSheet().createDrawingPatriarch();



        //前四个参数是坐标点,后四个参数是编辑和显示批注时的大小.
        HSSFComment comm = ((HSSFPatriarch)patr).createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
        //Comment comm = patr.createCellComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));


        comm.setString(new HSSFRichTextString(comment));
        //comm.setVisible(true);
        //comments.put(comment, comm);
        return comm;
    }


    private CellStyle redCellStyle;
    private ExcelSheet[] sheets;
    private Workbook workbook;
    private IStrategyBase strategy;
    private ExcelType excelType;
}