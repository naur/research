package org.naure.research.labs.common;

/**
 * Created by Administrator on 9/12/13.
 */
public class User {
    private int id;
    private String name;
    private String comment;

    public void User() {
        id = Integer.parseInt(String.valueOf(Math.random()));
        name = id + " name";
        comment = id + " comment";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "User: id=" + id + ", name=" + name + ", comment=" + comment;
    }
}
