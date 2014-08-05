package org.naure.research.labs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.MessageFormat;
import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/10/12
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Sub {

    protected final static Logger logger = LoggerFactory.getLogger(Sub.class);

    public abstract void execute() throws Exception;

    protected String format(Object... msg) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        for (int i = 0; i < msg.length; i++) {
            map.put(String.valueOf(msg[i]), msg[i = i + 1]);
        }
        return map.toString();
    }

    protected String format(int index, Object msg) {
        return MessageFormat.format(formatExpression[index - 1], msg);
    }

    protected String[] formatExpression = new String[]{
            "____________ {0} _____________________________"
    };
}
