package com.jd.soap;

import org.apache.cxf.binding.soap.SoapHeader;
import org.apache.cxf.binding.soap.SoapMessage;
import org.apache.cxf.binding.soap.interceptor.AbstractSoapInterceptor;
import org.apache.cxf.helpers.DOMUtils;
import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.phase.Phase;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.namespace.QName;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/29/12
 * Time: 5:44 PM
 * To change this template use File | Settings | File Templates.
 */
public class SoapHeaderIntercepter extends AbstractSoapInterceptor {
    public SoapHeaderIntercepter() {
        super(Phase.WRITE);
    }

    public void handleMessage(SoapMessage soapMessage) throws Fault {
        Document document = DOMUtils.createDocument();
        Element token = document.createElement("ns2:" + authHeader.getToken());
        token.setTextContent(authHeader.getTokenValue());
        Element root = document.createElement("ns2:" + authHeader.getKey());
        root.appendChild(token);

        List headers = soapMessage.getHeaders();
        headers.add(new SoapHeader(
                new QName(authHeader.getqName(), authHeader.getKey(), authHeader.getPrefix()),
                root));

//        Map<String, String> nsMap = new HashMap<String, String>();
//        nsMap.put("ns2", "http://tempuri.org/");
//        soapMessage.put("soap.env.ns.map", nsMap);
    }

    public void setAuthHeader(AuthHeader authHeader) {
        this.authHeader = authHeader;
    }

    private AuthHeader authHeader;
}
