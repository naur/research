package org.naur.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/18/12
 * Time: 6:50 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Action<T> {
    public void execute(T t);
}
