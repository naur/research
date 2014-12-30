package org.naur.common.entities;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/25/11
 * Time: 11:59 AM
 * To change this template use File | Settings | File Templates.
 */
public class OffsetInfo {
    public OffsetInfo(int offset, String name){
        this(offset, name, null);
    }
    public OffsetInfo(int offset, String name, String value){
        this.offset = offset;
        this.value = value;
        this.name = name;
    }
    public int offset;
    public String name;
    public String value;
}
