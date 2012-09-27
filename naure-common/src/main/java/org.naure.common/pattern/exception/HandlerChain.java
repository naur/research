package org.naure.common.pattern.exception;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 4/11/12
 * Time: 3:57 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class HandlerChain<T> {
    protected abstract T handleRequest(T request) throws Exception;

    public T process(T request) throws Exception {
        if (request == null) {
            return request;
        }
        request = this.handleRequest(request);
        if (successor != null && !hasBreakPoint) {
            request = successor.process(request);
        }
        return request;
    }

    public HandlerChain<T> getSuccessor() {
        return successor;
    }

    public void setSuccessor(HandlerChain<T> successor) {
        this.successor = successor;
    }

    private HandlerChain<T> successor;
    protected boolean hasBreakPoint = false;
}
