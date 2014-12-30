package org.naur.utility.excel;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

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
        //this.sheets = new ExcelSheet[]{new ExcelSheet(this, this.workbook.createSheet("sheet1"))};
    }

    public ExcelDocument(Workbook workbook) {
        this(workbook, null);
    }

    public ExcelDocument(Workbook workbook, ExcelStrategy strategy) {
        this.workbook = workbook;
        this.strategy = strategy;
    }

    public ExcelDocument(ExcelType excelType) {
        this(excelType, "");
    }

    public ExcelDocument(ExcelType excelType, String defaultSheet) {
        this.excelType = excelType;
        if (this.excelType == ExcelType.Excel2003) {
            this.workbook = new HSSFWorkbook();
        } else {
            this.workbook = new XSSFWorkbook();
        }
        //默认创建 一个名字为 sheet1 的 sheet.
        if (StringUtils.isNotEmpty(defaultSheet)) {
            //this.sheets = new ExcelSheet[]{};
            this.cacheSheet(new ExcelSheet(this, this.workbook.createSheet(defaultSheet)));
        }
    }

    /**
     * 3.8版本的POI对excel的导出操作，一般只使用HSSFWorkbook以及SXSSFWorkbook，
     * HSSFWorkbook用来处理较少的数据量，
     * SXSSFWorkbook用来处理大数据量以及超大数据量的导出。
     * @param excelType
     * @param stream
     * @throws IOException
     */
    public ExcelDocument(ExcelType excelType, InputStream stream) throws IOException {
        this.excelType = excelType;
        if (this.excelType == ExcelType.Excel2003) {
            this.workbook = new HSSFWorkbook(stream);
        } else {
            this.workbook = new XSSFWorkbook(stream);
        }
    }

    public ExcelSheet createSheet(String sheetName) {
        return this.cacheSheet(new ExcelSheet(this, this.workbook.createSheet(sheetName)));
    }

    public ExcelSheet sheets(int index) {
        if (sheets == null){
        	sheets = new ArrayList<ExcelSheet>();
        }

        if (sheets.get(index) == null) {
            //缓存
            if (null != workbook.getSheetAt(index)) {
                return cacheSheet(new ExcelSheet(this, workbook.getSheetAt(index)));
            }
        }
        return null;
    }

    public ExcelSheet sheets(String name) {
        if (sheets == null) {
        	sheets = new ArrayList<ExcelSheet>();
        }

        ExcelSheet sheet = null;
        for (ExcelSheet item : sheets) {
            if (name.equals(item.getName())) {
                sheet = item;
            }
        }

        if (null == sheet && null != workbook.getSheet(name)) {
            //缓存
            return cacheSheet(new ExcelSheet(this, workbook.getSheet(name)));
        }
        return sheet;
    }

    //缓存
    public final ExcelSheet cacheSheet(ExcelSheet sheet) {
        if (sheets == null) {
        	sheets = new ArrayList<ExcelSheet>();
        }
        if (sheet == null) {
        	return sheet;
        }

        for (int i = 0; i < sheets.size(); i++) {
            if (null == sheets.get(i)) {
                sheets.set(i, sheet);
                return sheet;
            }
        }
        //如果没有为空的
        sheets.add(sheet);
        return sheet;
    }

    public ExcelStrategy getStrategy() {
        return strategy;
    }

    public void setStrategy(ExcelStrategy strategy) {
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
        //todo 添加注释的方法在 Excel 2003 和 2007 不一样，待定......
        //HSSFPatriarch patr = sheets[0].getHssfSheet().createDrawingPatriarch();
        Drawing patr = sheets.get(0).getHssfSheet().createDrawingPatriarch();


        //前四个参数是坐标点,后四个参数是编辑和显示批注时的大小.
        HSSFComment comm = ((HSSFPatriarch) patr).createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
        //Comment comm = patr.createCellComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));


        comm.setString(new HSSFRichTextString(comment));
        //comm.setVisible(true);
        //comments.put(comment, comm);
        return comm;
    }


    private CellStyle redCellStyle;
    private List<ExcelSheet> sheets;
    private Workbook workbook;
    private ExcelStrategy strategy;
    private ExcelType excelType;
}