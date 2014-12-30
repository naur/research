package org.naur.repositories.construction;

import com.sleepycat.je.DatabaseEntry;
import com.sleepycat.je.SecondaryDatabase;
import com.sleepycat.je.SecondaryKeyCreator;
import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.lang3.SerializationUtils;
import org.naur.common.entities.Entity;

import java.io.UnsupportedEncodingException;

/**
 * 用于 Berkeley 二级库的键创建器
 * 主要负责对primary database中的特征数据(需要对他们建索引)产生key，作为该特征数据的secondaryDatabase中一条记录的key值。
 * 这条记录的value值由bdb来维护，为primary database的key值
 */
public class ObjectKeyCreator implements SecondaryKeyCreator {
    @Override
    public boolean createSecondaryKey(
            SecondaryDatabase secDb,
            DatabaseEntry key,
            DatabaseEntry value,
            DatabaseEntry result) {
        if (null != value) {
            String id = ((Entity) SerializationUtils.deserialize(value.getData())).getId();
            try {
                result.setData(id.getBytes(CharEncoding.UTF_8));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return true;
    }
}
