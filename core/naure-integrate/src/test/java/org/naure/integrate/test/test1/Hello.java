package org.naure.integrate.test.test1;

import org.agilewiki.jactor.Actor;
import org.agilewiki.jactor.RP;
import org.agilewiki.jactor.lpc.JLPCActor;
import org.agilewiki.jactor.lpc.Request;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
public class Hello extends Request<String, HelloActor> {

    public Hello(Multiply multiply) {
        this.multiply = multiply;
    }

    @Override
    public boolean isTargetType(Actor targetActor) {
        return targetActor instanceof HelloActor;
    }

    @Override
    public void processRequest(JLPCActor targetActor, RP rp) throws Exception {
        HelloActor helloActor = (HelloActor) targetActor;
        helloActor.processRequest(this, rp);
    }

    public Multiply multiply;
}
