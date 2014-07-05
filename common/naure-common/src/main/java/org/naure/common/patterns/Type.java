package org.naure.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/3/12
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */
public enum Type {
    //2,3,4,5,6,7  ln,neg,+,-,*,/
    Add(4), In(101), Between(102), And(103), All(104), Regex(201), Match(202), Include(501), Exclude(501), Paging(700), Sort(701);

    private final int value;

    Type(int value) {
        this.value = value;
    }

    public int value() {
        return this.value;
    }
}
