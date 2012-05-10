package org.naure.utility.excel;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.naure.common.entities.OffsetInfo;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-7-15
 * Time: 上午11:42
 * To change this template use File | Settings | File Templates.
 */
public class ExcelSheet {
    public ExcelSheet(ExcelDocument document, Sheet hssfSheet) {
        this.document = document;
        this.hssfSheet = hssfSheet;
        this.heads = new LinkedHashMap<String, OffsetInfo>();
    }

    public void setTitle(String title, int num) {
        this.createRow();
        this.currentRow.createCell(0);

        Font titlefont = this.document.getWorkbook().createFont();
        titlefont.setFontName("Arial");
        titlefont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        titlefont.setFontHeight((short) 400);
        CellStyle titleStyle = this.document.getWorkbook().createCellStyle();
        titleStyle.setFont(titlefont);
        titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        this.currentRow.currentCell.getHssfCell().setCellStyle(titleStyle);
        this.currentRow.currentCell.getHssfCell().setCellValue(title);
        hssfSheet.addMergedRegion(new CellRangeAddress(0, 0, 0, (num - 1)));
    }

    public void setHead(Map<String, OffsetInfo> heads) {
        this.heads = heads;
        if (!this.heads.isEmpty()) {
            createRow();
            int tempInt = 0;
            for (Map.Entry<String, OffsetInfo> item : this.heads.entrySet()) {
                this.currentRow.setCell(item.getKey(), tempInt);
                tempInt++;
            }
        }
    }


    public void createRow() {
        this.currentRow = new ExcelRow(this, this.hssfSheet.createRow(rowNum));
        rowNum++;
    }

    public ExcelRow row(int index) {
        return new ExcelRow(this, hssfSheet.getRow(index));
    }

    public int rowNum() {
        return hssfSheet.getLastRowNum();
    }

    public ExcelDocument getDocument() {
        return document;
    }

    public Sheet getHssfSheet() {
        return hssfSheet;
    }

    //private List<ExcelRow> rows;
    private ExcelDocument document;
    private Sheet hssfSheet;
    public Map<String, OffsetInfo> heads;
    public ExcelRow currentRow;
    private int rowNum = 0;
}
