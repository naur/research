package org.naure.research.labs.entities;

/**
 * Created by Administrator on 9/12/13.
 */
public class Person {
    private int id;
    private String name;
    private String type;

    public void User() {
        id = Integer.parseInt(String.valueOf(Math.random()));
        name = id + " name";
        type = id + " type";
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Person: id=" + id + ", name=" + name + ", type=" + type;
    }
}
