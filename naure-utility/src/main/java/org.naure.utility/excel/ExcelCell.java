package org.naure.utility.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;

import java.text.NumberFormat;
import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 1/9/12
 * Time: 3:51 PM
 * To change this template use File | Settings | File Templates.
 */
public class ExcelCell {
    public ExcelCell(ExcelRow row, Cell hssfCell) {
        this.row = row;
        this.hssfCell = hssfCell;
    }

    //解析 Excel  值
    public String value() {
        String ret = "";

        if (hssfCell == null || "".equals(hssfCell.toString()))
            return ret;

        switch (hssfCell.getCellType()) {
            case Cell.CELL_TYPE_NUMERIC:     //数值型和日期型都是「CELL_TYPE_NUMERIC」
                if (DateUtil.isCellDateFormatted(hssfCell)) {
                    /* 日期型 */
                    ret = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(hssfCell.getDateCellValue());
                } else {
                    ret = getNumericValue(hssfCell);
                }
                break;
            case Cell.CELL_TYPE_BOOLEAN:
                ret = String.valueOf(hssfCell.getBooleanCellValue());
                break;
            case Cell.CELL_TYPE_FORMULA:
                ret = getFormulaValue(hssfCell);
                break;
            case Cell.CELL_TYPE_BLANK:
                break;
            case Cell.CELL_TYPE_ERROR:
                break;
            default:
                ret = hssfCell.getStringCellValue();
                break;
        }

        if (ret == null)
            ret = "";

        return ret.trim();
    }


    private String getFormulaValue(Cell cell) {
        String ret;
        try {
            ret = getNumericValue(cell);
        } catch (Exception ex) {
            ret = cell.getStringCellValue();
        }
        return ret;
    }

    private String getNumericValue(Cell cell) {
        String ret;
        //误删， 备用
//            NumberFormat nf = NumberFormat.getInstance();
//            nf.setGroupingUsed(false);//true时的格式：1,234,567,890
//            ret = nf.format(hssfCell.getNumericCellValue());
        ret = String.valueOf(cell.getNumericCellValue());
        //如果读取的是科学计数法的格式，则转换为普通格式
        if (null != ret && ret.indexOf(".") != -1 && ret.indexOf("E") != -1) {
            //DecimalFormat formatter = new DecimalFormat();
            //DecimalFormat formatter = new DecimalFormat("########");
            //ret = df.parse(ret).toString();
            //ret = formatter.format(hssfCell.getNumericCellValue());
            NumberFormat nf = NumberFormat.getInstance();
            nf.setGroupingUsed(false);//true时的格式：1,234,567,890
            ret = nf.format(hssfCell.getNumericCellValue());
        }
        //如果读取的是数字格式，并且以".0"结尾格式，则转换为普通格式
        if (ret.endsWith(".0")) {
            int size = ret.length();
            ret = ret.substring(0, size - 2);
        }

        return ret;
    }

    public void setCellValue(String data) {
        hssfCell.setCellValue(data);
    }
    public void setCellValue(double data) {
        hssfCell.setCellValue(data);
    }
    public void setCellValue(Date data) {
        hssfCell.setCellValue(data);
    }
    public void setCellValue(boolean data) {
        hssfCell.setCellValue(data);
    }
    public void setCellFormula(String data){
        hssfCell.setCellFormula(data);
    }

    public void setComment(String comment) {
        this.hssfCell.setCellComment(
                this.row.getSheet().getDocument().getComment(comment)
        );
    }

    public int row() {
        return hssfCell.getRowIndex();
    }

    public int ColumnIndex() {
        return hssfCell.getColumnIndex();
    }

    public String ColumnName() {
        return ExcelHelper.getName(ColumnIndex());
    }

    public CellStyle style() {
        return hssfCell.getCellStyle();
    }

    public void setStyle(CellStyle style) {
        hssfCell.setCellStyle(row.getSheet().getDocument().redCellStyle(style));
    }

    public Cell getHssfCell() {
        return hssfCell;
    }

    public ExcelRow getRow() {
        return row;
    }

    private ExcelRow row;
    private Cell hssfCell;
}

