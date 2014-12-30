//package org.naur.common.patterns;
//
///**
// * Created with IntelliJ IDEA.
// * User: Administrator
// * Date: 4/11/12
// * Time: 3:57 PM
// * To change this template use File | Settings | File Templates.
// */
//public abstract class HandlerChainBAK<T> {
//    protected abstract T handleRequest(T request);
//
//    public T process(T request) {
//        if (request == null) {
//            return request;
//        }
//        request = this.handleRequest(request);
//        if (successor != null && !hasBreakPoint) {
//            request = successor.process(request);
//        }
//        return request;
//    }
//
//    public HandlerChain<T> getSuccessor() {
//        return successor;
//    }
//
//    public void setSuccessor(HandlerChain<T> successor) {
//        this.successor = successor;
//    }
//
//    private HandlerChain<T> successor;
//    protected boolean hasBreakPoint = false;
//}
