package org.naure.repositories.models;


import org.naure.common.entities.Entity;

/**
 * Created by Administrator on 5/11/14.
 */

public class Menu extends Entity {
    private String name;
    private String uri;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}
