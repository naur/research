package org.naur.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/11/12
 * Time: 3:57 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Handler<T> {
    T process(T request) throws Exception;

    Handler<T> getSuccessor();

    void setSuccessor(Handler<T> successor);
}
