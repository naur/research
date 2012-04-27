package org.naure.common.pattern;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/11/12
 * Time: 3:57 PM
 * To change this template use File | Settings | File Templates.
 */
public interface HandlerChain<T, U> {
    U handleRequest(final T request) throws Exception;
}
