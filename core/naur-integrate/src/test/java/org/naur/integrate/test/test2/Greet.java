package org.naur.integrate.test.test2;

import org.agilewiki.jactor.Actor;
import org.agilewiki.jactor.RP;
import org.agilewiki.jactor.lpc.JLPCActor;
import org.agilewiki.jactor.lpc.Request;
import org.naur.integrate.test.ResponseResult;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 5:50 PM
 * To change this template use File | Settings | File Templates.
 */
public class Greet extends Request<ResponseResult, Greeter> {
    @Override
    public boolean isTargetType(Actor targetActor) {
        return targetActor instanceof Greeter;
    }

    @Override
    public void processRequest(JLPCActor targetActor, RP rp) throws Exception {
        Greeter actor = (Greeter) targetActor;
        actor.processRequest(this, rp);
    }
}
