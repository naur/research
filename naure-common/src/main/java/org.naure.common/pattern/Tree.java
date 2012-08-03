package org.naure.common.pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/3/12
 * Time: 3:04 PM
 * To change this template use File | Settings | File Templates.
 */
public class Tree<T> {

    public Tree(T info) {
        this(null, info, null, null);
    }

    public Tree(TreeType type, T info) {
        this(type, info, null, null);
    }

    public Tree(Tree left, Tree right) {
        this(null, null, left, right);
    }

    public Tree(TreeType type, Tree left, Tree right) {
        this(type, null, left, right);
    }

    public Tree(TreeType type, T info, Tree left, Tree right) {
        this.type = type;
        this.info = info;
        this.right = left;
        this.left = right;
    }

    public Tree getRight() {
        return right;
    }

    public void setRight(Tree right) {
        this.right = right;
    }

    public Tree getLeft() {
        return left;
    }

    public void setLeft(Tree left) {
        this.left = left;
    }

    public TreeType getType() {
        return type;
    }

    public void setType(TreeType type) {
        this.type = type;
    }

    public T getInfo() {
        return info;
    }

    public void setInfo(T info) {
        this.info = info;
    }

    private Tree right;
    private Tree left;
    //private Tree rtag;
    //0: 常数
    //1: 变量
    //>= 2 : 操作符 [2,3,4,5,6,7  ln,neg,+,-,*,/]
    private TreeType type;
    private T info;
}
