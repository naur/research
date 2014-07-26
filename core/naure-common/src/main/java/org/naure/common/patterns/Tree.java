package org.naure.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/3/12
 * Time: 3:04 PM
 * To change this template use File | Settings | File Templates.
 */
public class Tree<T> {

    public Tree(Type type) {
        this(type, null, null, null);
    }

    public Tree(T info) {
        this(null, info, null, null);
    }

    public Tree(Type type, T info) {
        this(type, info, null, null);
    }

    public Tree(Tree left, Tree right) {
        this(null, null, left, right);
    }

    public Tree(Type type, Tree left, Tree right) {
        this(type, null, left, right);
    }

    public Tree(Type type, T info, Tree left, Tree right) {
        this.type = type;
        this.info = info;
        this.left = left;
        this.right = right;
    }

    public Tree getRight() {
        return right;
    }

    public Tree setRight(Tree right) {
        this.right = right;
        return this;
    }

    public Tree getLeft() {
        return left;
    }

    public Tree setLeft(Tree left) {
        this.left = left;
        return this;
    }

    public Type getType() {
        return type;
    }

    public Tree setType(Type type) {
        this.type = type;
        return this;
    }

    public T getInfo() {
        return info;
    }

    public Tree setInfo(T info) {
        this.info = info;
        return this;
    }

    private Tree right;
    private Tree left;
    //private Tree rtag;
    //0: 常数
    //1: 变量
    //>= 2 : 操作符 [2,3,4,5,6,7  ln,neg,+,-,*,/]
    private Type type;
    private T info;
}
