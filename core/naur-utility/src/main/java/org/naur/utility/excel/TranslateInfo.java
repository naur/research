package org.naur.utility.excel;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-7-28
 * Time: 上午10:34
 * To change this template use File | Settings | File Templates.
 */
@XmlRootElement(name = "info")
public class TranslateInfo {

    public TranslateInfo(String message) {
        this(0, "0", message);
    }

    public TranslateInfo(int row, String message) {
        this(row, "0", message);
    }

    public TranslateInfo(int row, String column, String message) {
        this.row = row;
        this.column = column;
        this.message = message;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

//    public String getError() {
//        return error;
//    }
//
//    public void setError(String error) {
//        this.error = error;
//    }

    private int row;
    private String column;
    private String message;
    //private String error;
}
