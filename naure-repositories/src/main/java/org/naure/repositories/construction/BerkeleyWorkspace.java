package org.naure.repositories.construction;

import com.sleepycat.je.*;
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
public class BerkeleyWorkspace extends AbstractWorkspace {
    @Autowired
    private BerkeleyConfiguration configuration;
    //编码
    private String coding = CharEncoding.UTF_8;

    /**
     * resultClass：
     * 如果是 Entity，就查询所有数据
     * 如果是 Entity 的子类，那么查询子类对应的数据库
     */
    public <T, U> List<U> get(T t, Class<U> resultClass) throws Exception {
        if (null != t) {
            Assert.isAssignable(String.class, t.getClass());
        }
        Assert.isAssignable(Entity.class, resultClass);

        final List<U> result = new ArrayList<U>();
        configuration.execute(resultClass.getName(),
                new DatabaseEntry(null == t || "" == t ? null : t.toString().getBytes(coding)),
                new DatabaseEntry(), new BerkeleyConfiguration.Action() {
            @Override
            public void execute(DatabaseEntry key, DatabaseEntry data) {
                result.add((U) SerializationUtils.deserialize(data.getData()));
            }
        });

        return result;
    }

    /**
     * T 必须是继承于 Entity 类型的子类
     */
    @Override
    public <T> boolean add(T t) throws Exception {
        Assert.isAssignable(Entity.class, t.getClass());
        Entity entity = (Entity) t;

        return configuration.execute(
                //以 t.getClass().getName() 作为数据库名
                t.getClass().getName(),
                //以 id 为 key
                new DatabaseEntry(entity.getId().getBytes(coding)),
                new DatabaseEntry(SerializationUtils.serialize(entity)),
                null);
    }

    @Override
    public <T> boolean exists(T t) throws Exception {
        Assert.isAssignable(Entity.class, t.getClass());
        Entity entity = (Entity) t;
        Assert.hasText(entity.getId());

        return configuration.execute(
                //以 t.getClass().getName() 作为数据库名
                t.getClass().getName(),
                //以 id 为 key
                new DatabaseEntry(entity.getId().getBytes(coding)),
                null, null);
    }
}
