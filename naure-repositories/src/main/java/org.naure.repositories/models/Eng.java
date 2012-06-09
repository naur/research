package org.naure.repositories.models;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/18/12
 * Time: 6:08 PM
 * To change this template use File | Settings | File Templates.
 */
public class Eng {
    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public List getEngKoo() {
        return engKoo;
    }

    public void setEngKoo(List engKoo) {
        this.engKoo = engKoo;
    }

    private String word;
    private List engKoo;
    private String description;
    private Date created; // createDate;
    private Date updated; //updatedDate;
}
