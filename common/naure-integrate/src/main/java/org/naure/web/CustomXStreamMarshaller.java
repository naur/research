package org.naure.web;

import org.springframework.oxm.xstream.XStreamMarshaller;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/2/12
 * Time: 6:13 PM
 * To change this template use File | Settings | File Templates.
 */
public class CustomXStreamMarshaller extends XStreamMarshaller {
    public CustomXStreamMarshaller() {

    }

    public CustomXStreamMarshaller(java.util.Map<java.lang.String, ?> aliases) throws ClassNotFoundException {
        this.setAliasesByType(aliases);
    }
}
