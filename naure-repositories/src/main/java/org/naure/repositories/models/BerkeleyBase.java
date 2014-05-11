package org.naure.repositories.models;

import com.sleepycat.persist.model.Entity;
import com.sleepycat.persist.model.PrimaryKey;
import com.sleepycat.persist.model.Relationship;
import com.sleepycat.persist.model.SecondaryKey;

/**
 * Created by Administrator on 5/11/14.
 */
@Entity
public abstract class BerkeleyBase {
    // Primary key is pKey
    @PrimaryKey
    private String pKey;

    // Secondary key is the sKey
    @SecondaryKey(relate= Relationship.MANY_TO_ONE)
    private String sKey;

    public void setPKey(String data) {
        pKey = data;
    }

    public void setSKey(String data) {
        sKey = data;
    }

    public String getPKey() {
        return pKey;
    }

    public String getSKey() {
        return sKey;
    }
}
