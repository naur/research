package org.naure.test.test1;

import org.agilewiki.jactor.Mailbox;
import org.agilewiki.jactor.RP;
import org.agilewiki.jactor.lpc.JLPCActor;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 5:34 PM
 * To change this template use File | Settings | File Templates.
 */
public class HelloActor extends JLPCActor {
    public HelloActor(Mailbox mailbox) throws Exception {
        this.initialize(mailbox);
    }

    protected void processRequest(Hello request, RP rp) throws Exception {
        rp.processResponse("Hello, x=" + request.multiply.x + ", y=" + request.multiply.y + ", x + y = " + String.valueOf(new Integer(request.multiply.x + request.multiply.y)));
    }
}
