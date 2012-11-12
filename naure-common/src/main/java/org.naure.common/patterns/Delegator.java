package org.naure.common.patterns;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/31/11
 * Time: 10:38 AM
 * To change this template use File | Settings | File Templates.
 */
public class Delegator {

    public Delegator(Callback callback) {
        this.callback = callback;
    }

    public void execute() throws Exception {
        callback.begin();
        callback.execute();
        callback.end();
    }

    private final Callback callback;

    public static interface Callback {
        public void begin() throws Exception;

        public void execute() throws Exception;

        public void end() throws Exception;
    }
}
