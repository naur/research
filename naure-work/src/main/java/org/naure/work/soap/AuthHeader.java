package com.jd.soap;

import jd.oom.client.util.MD5Util;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/29/12
 * Time: 5:40 PM
 * To change this template use File | Settings | File Templates.
 */
public class AuthHeader {
    private final static String QNAME = "http://tempuri.org/";
    private String KEY = "AuthenticationHeader";
    private String TOKEN = "Token";
    private String qName;
    private String key;
    private String token;
    private String content;
    private String seed;
    private String prefix;

    public AuthHeader() {
    }

    public String getTokenValue() {
        if (StringUtils.isNotEmpty(content) && StringUtils.isNotEmpty(seed)) {
            byte[] bb = MD5Util.md5(content + "-" + seed);
            return new String(Base64.encodeBase64(bb));
        }
        return "";
    }

    public String getqName() {
        if (StringUtils.isEmpty(qName)) {
            qName = QNAME;
        }
        return qName;
    }

    public void setqName(String qName) {
        this.qName = qName;
    }

    public String getKey() {
        if (StringUtils.isEmpty(key)) {
            key = KEY;
        }
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getToken() {
        if (StringUtils.isEmpty(token)) {
            token = TOKEN;
        }
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSeed() {
        return seed;
    }

    public void setSeed(String seed) {
        this.seed = seed;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }


}
