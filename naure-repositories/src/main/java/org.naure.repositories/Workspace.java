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
    <T> List<T> get(Map params, Class<T> tClass) throws Exception;

    //更新和创建 【幂等性】   {void put(T t)}
    <U, T> T put(U entity, Class<T>... tClass) throws Exception;

    //创建    {void post()}
    <U, T> T post(U entity, Class<T>... tClass) throws Exception;

    //【幂等性】 {boolean delete(T t)}
    <U, T> boolean delete(U u, Class<T>... tClass) throws Exception;

    //<U, T> List<T> query(U params, Class<T> tClass);
}
