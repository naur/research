package org.naure.common.entities;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/18/12
 * Time: 10:41 AM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Entity implements Serializable {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    private String id;
    private Date created; // createDate;
    private Date updated; //updatedDate;

    public String collectionName() {
        String classFullName = getClass().getName();
        return classFullName.substring(
                classFullName.indexOf("models.") + 7
        ).toLowerCase();
    }
}
