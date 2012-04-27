package org.naure.common;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11/2/11
 * Time: 1:39 PM
 * To change this template use File | Settings | File Templates.
 */
public class Notification<T> {

    public Notification() {
    }

    public Notification(T t) {
        this.body = t;
    }

    public Notification(String type, String level) {
        this(type, level, null, null, null);
    }

    public Notification(String type, String level, String keywords) {
        this(type, level, keywords, null, null);
    }

    public Notification(String type, String level, String keywords, String id) {
        this(type, level, keywords, id, null);
    }

    public Notification(String type, String level, T t) {
        this(type, level, null, null, t);
    }

    public Notification(String type, String level, String keywords, T t) {
        this(type, level, keywords, null, t);
    }

    public Notification(String type, String level, String keywords, String id, T t) {
        this.type = type;
        this.level = level;
        this.keywords = keywords;
        this.id = id;
        this.body = t;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }

    private String type;
    private String level;
    private String keywords;
    private String id;
    private T body;
}

