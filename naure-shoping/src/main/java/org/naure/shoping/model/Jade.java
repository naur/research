package org.naure.shoping.model;

import org.naure.common.entities.Entity;

/**
 * Created by Administrator on 6/28/2014.
 */
public class Jade extends Entity {
    //分类
    private String classify;
    // 名称
    private String name;
    //标题
    private String title;
    //描述
    private String description;
    //图片对应的连接
    private String uri;

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}
