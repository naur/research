package org.naure.common.patterns;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-7-20
 * Time: 下午3:29
 * To change this template use File | Settings | File Templates.
 */
public abstract class HandlerChain<T> implements Handler<T> {

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

    @Override
    public Handler<T> getSuccessor() {
        return successor;
    }

    @Override
    public void setSuccessor(Handler<T> successor) {
        this.successor = successor;
    }

    private T request;
    private Handler<T> successor;
    protected boolean hasBreakPoint = false;
}


//public abstract class HandlerBase<T> {
//
//    protected abstract T handleRequest(T request) throws Exception;
//
//    public T process(T request) throws Exception {
//        if (request == null) {
//            return request;
//        }
//        this.hasBreakPoint = false;
//        request = this.handleRequest(request);
//        if (successor != null && !hasBreakPoint) {
//            request = successor.process(request);
//        }
//        return request;
//    }
//
//    public HandlerBase<T> getSuccessor() {
//        return successor;
//    }
//
//    public void setSuccessor(HandlerBase<T> successor) {
//        this.successor = successor;
//    }
//
//    private HandlerBase<T> successor;
//    protected boolean hasBreakPoint = false;
//}