package org.naur.common.patterns;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/31/11
 * Time: 10:38 AM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Delegator.
 */
public class Delegator {

    /**
     *Delegator.
     * @param callback 入参
     */
    public Delegator(Callback callback) {
        this.callback = callback;
    }

    /**
     *execute.
     * @throws Exception 异常
     */
    public void execute() throws Exception {
        callback.begin();
        callback.execute();
        callback.end();
    }

    private final Callback callback;

    /**
     * Callback
     */
    public interface Callback {
        /**
         * begin.
         * @throws Exception 异常
         */
        void begin() throws Exception;

        /**
         * execute.
         * @throws Exception 异常
         */
        void execute() throws Exception;

        /**
         * end.
         * @throws Exception 异常
         */
        void end() throws Exception;
    }
}
