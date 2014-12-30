package org.naur.utility.excel;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-7-29
 * Time: 上午9:31
 * To change this template use File | Settings | File Templates.
 */
public class ExcelHelper {
    public static String getName(int index){
        switch (index){
            case 0:
                return "A";
            case 1:
                return "B";
            case 2:
                return "C";
            case 3:
                return "D";
            case 4:
                return "E";
            case 5:
                return "F";
            case 6:
                return "G";
            case 7:
                return "H";
            case 8:
                return "I";
            case 9:
                return "J";
            case 10:
                return "K";
            case 11:
                return "L";
            case 12:
                return "M";
            case 13:
                return "N";
            case 14:
                return "O";
            case 15:
                return "P";
            default:
                return String.valueOf(index);
        }
    }
}
