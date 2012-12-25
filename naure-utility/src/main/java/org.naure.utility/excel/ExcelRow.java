package org.naure.utility.excel;

import org.apache.poi.ss.usermodel.Row;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 1/9/12
 * Time: 3:49 PM
 * To change this template use File | Settings | File Templates.
 */
public class ExcelRow {
    public ExcelRow(ExcelSheet sheet, Row hssfRow) {
        this.sheet = sheet;
        this.hssfRow = hssfRow;
        this.initCells();
    }

    public void createCell(int cellNum) {
        currentCell = new ExcelCell(this, this.hssfRow.createCell(cellNum));
    }

    public void setCell(String data, int cellNum) {
        createCell(cellNum);
        //cell.setEncoding(HSSFCell.ENCODING_UTF_16);
        currentCell.setCellValue(data);
    }
    public void setCell(double data, int cellNum) {
        createCell(cellNum);
        currentCell.setCellValue(data);
    }
    public void setCell(Date data, int cellNum) {
        createCell(cellNum);
        currentCell.setCellValue(data);
    }
    public void setCell(boolean data, int cellNum) {
        createCell(cellNum);
        currentCell.setCellValue(data);
    }
    public void setCellFormula(String data, int cellNum){
        createCell(cellNum);
        currentCell.setCellFormula(data);
    }

    public ExcelCell getCurrentCell() {
        return currentCell;
    }

    private void initCells() {
        if (hssfRow == null)
            return;

        //此处要确认新的 hssfRow 的 getLastCellNum() 值为多少。
        if (-1 == this.hssfRow.getLastCellNum())
            return;

        this.cells = new ExcelCell[this.hssfRow.getLastCellNum()];
        for (int i = 0; i < this.cells.length; i++) {
            if (this.hssfRow.getCell(i) == null) {
                this.hssfRow.createCell(i);
            }
            cells[i] = new ExcelCell(this, this.hssfRow.getCell(i));
        }
    }

    public ExcelTranslate translate() {
        strategy = this.sheet.getDocument().getStrategy();
        strategy.setContext(this);
        strategy.execute();
        return strategy.getTranslate();
    }

    public ExcelCell cells(int offset) {
        return cells[offset];
    }

    public Row getHssfRow() {
        return hssfRow;
    }

    public ExcelSheet getSheet() {
        return sheet;
    }

    public ExcelCell[] getCells() {
        return cells;
    }

    public int RowIndex() {
        return hssfRow.getRowNum();
    }

    public boolean IsNullOrEmpty() {
        if (cells == null || cells.length <= 0) {
            return true;
        }

        boolean temp = true;
        for (ExcelCell cell : cells) {
            temp = temp && "".equals(cell.value());
            if (!temp)
                return temp;
        }
        return temp;
    }

    private ExcelStrategy strategy;
    private Row hssfRow;
    private ExcelSheet sheet;
    public ExcelCell[] cells;
    public ExcelCell currentCell;
}