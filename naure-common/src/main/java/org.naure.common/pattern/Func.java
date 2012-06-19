package org.naure.common.pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/18/12
 * Time: 2:51 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Func<T, TResult> {
    public TResult execute(T t) throws Exception;
}
