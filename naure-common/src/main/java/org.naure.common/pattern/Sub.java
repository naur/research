package org.naure.common.pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/10/12
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Sub<TResult> {
    public TResult execute() throws Exception;
}
