package org.naure.repositories;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 3:06 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Workspace {
    //读取    {Map<String, T> get()}
    <T, U> List<U> get(T t, Class<U> resultClass) throws Exception;
    <U> U get(int identifier, Class<U> resultClass) throws Exception;

    //创建    {void post()}
    <T, U> U add(T t, Class<U>... resultClass) throws Exception;
    <T> boolean add(T t) throws Exception;

    //【幂等性】 {boolean delete(T t)}
    <T, U> U delete(T t, Class<U>... resultClass) throws Exception;
    <T> boolean delete(T t) throws Exception;

    //更新和创建 【幂等性】   {void put(T t)}
    <T, U> U update(T t, Class<U>... resultClass) throws Exception;
    <T> boolean update(T t) throws Exception;

    //<U, T> List<T> query(U params, Class<T> resultClass);
}
