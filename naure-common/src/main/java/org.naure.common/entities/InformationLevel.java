package org.naure.common.entities;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/12/12
 * Time: 1:27 PM
 * To change this template use File | Settings | File Templates.
 */
public enum InformationLevel {
    SUCCESS (0), ERROR(2);

    //FATAL, ERROR, WARN, INFO, DEBUG

    //ERROR、WARN、INFO、DEBUG
    //OFF、FATAL、ERROR、WARN、INFO、DEBUG、ALL

    private final int value;

    InformationLevel(int value) {
        this.value = value;
    }

    public int value() {
        return value;
    }
}
