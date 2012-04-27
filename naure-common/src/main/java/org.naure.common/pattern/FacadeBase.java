package org.naure.common.pattern;

import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 8/16/11
 * Time: 1:06 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class FacadeBase<T> implements IFacadeBase<T> {

    @Override
    public List<T> get(T where) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<T> getAll(Map where) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public T get(int identifier) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int add(T item) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int delete(int id) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int update(T item) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
