package org.naur.integrate.test;

import org.agilewiki.jactor.*;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.naur.common.test.UnitTestBase;
import org.naur.integrate.test.test1.Hello;
import org.naur.integrate.test.test1.HelloActor;
import org.naur.integrate.test.test1.Multiply;
import org.naur.integrate.test.test2.Actor1;
import org.naur.integrate.test.test2.Actor2;

import java.util.Arrays;
import java.util.Collection;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 2:59 PM
 * To change this template use File | Settings | File Templates.
 */
@RunWith(value = Parameterized.class)
public class JLPCActorTest extends UnitTestBase {

    public JLPCActorTest(Object obj1, Object obj2) {

    }

    @Parameterized.Parameters
    public static Collection params() {
        return Arrays.asList(new Object[][]{
                {100, 200}
        });
    }

    @Ignore
    @Test
    public void test1() throws Exception {
        MailboxFactory mailboxFactory = JAMailboxFactory.newMailboxFactory(1);
        Hello request = new Hello(new Multiply(100, 200));
        HelloActor helloActor = new HelloActor(mailboxFactory.createMailbox());
        JAFuture future = new JAFuture();
        String result = request.send(future, helloActor);
        mailboxFactory.close();
    }

    @Ignore
    @Test
    public void test2() throws Exception {
        MailboxFactory factory = JAMailboxFactory.newMailboxFactory(10);
        Mailbox mailbox = factory.createMailbox();

        Actor1 actor1 = new Actor1(mailbox);
        Actor2 actor2 = new Actor2(mailbox, actor1);

        JAFuture future = new JAFuture();


        factory.close();
    }
}
