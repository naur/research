package org.naure.common.pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/3/12
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */
public enum TreeType {
    //2,3,4,5,6,7  ln,neg,+,-,*,/
    Add(4), In(101), Between(102);

    private final int value;

    TreeType(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }
}
