package org.naure.repositories;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 3:06 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Workspace {
    //读取    {Map<String, T> get()}
    <U, T> List<T> get(U params, Class<T> clazz);

    //更新和创建 【幂等性】   {void put(T t)}
    <U, T> U put(T entity, Class<U>... clazz);

    //创建    {void post()}
    <U, T> U post(T entity, Class<T> clazz);

    //【幂等性】 {boolean delete(T t)}
    <T> boolean delete(T t);

    //<U, T> List<T> query(U params, Class<T> clazz);
}
