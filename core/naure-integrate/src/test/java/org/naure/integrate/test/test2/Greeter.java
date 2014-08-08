package org.naure.integrate.test.test2;

import org.agilewiki.jactor.RP;
import org.agilewiki.jactor.lpc.TargetActor;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 6:15 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Greeter extends TargetActor {
    void processRequest(Greet request, final RP rp) throws Exception;
}
