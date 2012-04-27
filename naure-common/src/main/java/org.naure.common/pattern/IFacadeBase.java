package org.naure.common.pattern;

import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 8/19/11
 * Time: 6:13 PM
 * To change this template use File | Settings | File Templates.
 */
public interface IFacadeBase<T> {
    List<T> get(T where);

    List<T> getAll(Map where);

    T get(int identifier);

    int add(T item);

    int delete(int id);

    int update(T item);
}