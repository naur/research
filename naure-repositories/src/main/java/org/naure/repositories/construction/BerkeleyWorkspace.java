package org.naure.repositories.construction;

import com.sleepycat.je.Cursor;
import com.sleepycat.je.DatabaseEntry;
import com.sleepycat.je.LockMode;
import com.sleepycat.je.OperationStatus;
import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.lang3.SerializationUtils;
import org.naure.common.entities.Entity;
import org.naure.common.util.ByteSerializer;
import org.naure.repositories.config.BerkeleyConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:13 PMgit
 * To change this template use File | Settings | File Templates.
 */
@Component
public class BerkeleyWorkspace implements Workspace {
    @Autowired
    BerkeleyConfiguration configuration;

    /**
     * 对于 Berkeley, 只支持通过 key 查询数据，而且 key 是 String 类型
     * 约定返回值继承于 Entity
     */
    @Override
    public <T, U> List<U> get(T t, Class<U> resultClass) throws Exception {
        Assert.isAssignable(String.class, t.getClass());
        Assert.isAssignable(Entity.class, resultClass);

        List<U> result = new ArrayList<U>();
        DatabaseEntry key = new DatabaseEntry();
        DatabaseEntry date = new DatabaseEntry();
        if ("" == t) {
            Cursor cursor = null;
            try {
                cursor = configuration.db().openCursor(null, null);

                // 通过cursor.getNex方法来遍历记录
                while (cursor.getNext(key, date, LockMode.DEFAULT) ==
                        OperationStatus.SUCCESS) {
                    result.add((U)SerializationUtils.deserialize(date.getData()));
                }
            } catch (Exception ex) {
            } finally {
                try {
                    if (cursor != null) {
                        cursor.close();
                    }
                } catch (Exception ex) {
                }
            }
        } else {
            key.setData(t.toString().getBytes(CharEncoding.UTF_8));
            if (configuration.db().get(null, key, date, LockMode.DEFAULT) ==
                    OperationStatus.SUCCESS) {
                result.add((U) SerializationUtils.deserialize(date.getData()));
            } else {
                //TODO
            }
        }

        return result;
    }

    @Override
    public <U> U get(int identifier, Class<U> resultClass) throws Exception {
        return null;
    }

    @Override
    public <T, U> U add(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    /**
     * T 必须是继承于 Entity 类型的子类
     */
    @Override
    public <T> boolean add(T t) throws Exception {
        Assert.isAssignable(Entity.class, t.getClass());

        DatabaseEntry key = new DatabaseEntry(t.getClass().getName().getBytes(CharEncoding.UTF_8));
        DatabaseEntry value = new DatabaseEntry(SerializationUtils.serialize((Entity) t));
        configuration.db().put(null, key, value);
        return false;
    }

    @Override
    public <T, U> U delete(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    @Override
    public <T> boolean delete(T t) throws Exception {
        return false;
    }

    @Override
    public <T, U> U update(T t, Class<U>... resultClass) throws Exception {
        return null;
    }

    @Override
    public <T> boolean update(T t) throws Exception {
        return false;
    }

    @Override
    public <T> boolean exists(T t) throws Exception {
        return false;
    }

    @Override
    public <T> long count(T t) throws Exception {
        return 0;
    }
}
