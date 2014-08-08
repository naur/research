package org.naure.integrate.test.test2;

import org.agilewiki.jactor.Mailbox;
import org.agilewiki.jactor.RP;
import org.agilewiki.jactor.lpc.JLPCActor;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */
public class Actor2 extends JLPCActor implements Greeter {
    public Actor2(Mailbox mailbox, Actor1 parent) throws Exception {
        this.initialize(mailbox, parent);
    }

    @Override
    public void processRequest(Greet request, RP rp) throws Exception {
        //rp.processResponse(request.);
    }
}
