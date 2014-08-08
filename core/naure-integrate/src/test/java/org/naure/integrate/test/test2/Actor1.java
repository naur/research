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
public class Actor1 extends JLPCActor {
    public Actor1(Mailbox mailbox) throws Exception {
        this.initialize(mailbox);
    }

    protected void processRequest(Greet request, RP rp) throws Exception {
        rp.processResponse("Hello world! Actor1");
    }
}
