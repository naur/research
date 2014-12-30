package org.naur.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/27/12
 * Time: 2:08 PM
 * To change this template use File | Settings | File Templates.
 */
public class Linked<T> {

    public Linked() {
        this(null, null, null, null);
    }

    public Linked(T info) {
        this(null, info, null, null);
    }

    public Linked(T info, Linked prev) {
        this(null, info, prev, null);
    }

    public Linked(T info, Linked prev, Linked next) {
        this(null, info, prev, next);
    }

    public Linked(Linked prev, Linked next) {
        this(null, null, prev, next);
    }

    public Linked(Type type, T info, Linked prev, Linked next) {
        this.type = type;
        this.info = info;
        this.prev = prev;
        this.next = next;
    }

    public Linked getNext() {
        return next;
    }

    public void setNext(Linked next) {
        this.next = next;
    }

    public Linked getPrev() {
        return prev;
    }

    public void setPrev(Linked prev) {
        this.prev = prev;
    }

    public Object getKey() {
        return key;
    }

    public void setKey(Object key) {
        this.key = key;
    }

    public T getInfo() {
        return info;
    }

    public void setInfo(T info) {
        this.info = info;
    }

    private Type type;
    //指针域 (pointer fields)
    private Linked next;
    private Linked prev;
    //关键字域 (key field)
    private Object key;
    private T info;
}
