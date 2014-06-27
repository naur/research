package org.naure.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/11/12
 * Time: 5:12 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Strategy<T> {
    void execute();
    void setContext(T context);
}
