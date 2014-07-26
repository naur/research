package org.naure.common.patterns;

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
    <U> List<T> get(U where) throws Exception;

    <U> List<T> getAll(U where) throws Exception;

    T get(int identifier) throws Exception;

    int add(T item) throws Exception;

    boolean delete(int identifier) throws Exception;
    <U> boolean delete(U where) throws Exception;

    int update(T item) throws Exception;
}

//    //读取    {Map<String, T> get()}
//    <T> List<T> get(Map params, Class<T> tClass) throws Exception;
//
//    //更新和创建 【幂等性】   {void put(T t)}
//    <U, T> T put(U entity, Class<T>... tClass) throws Exception;
//
//    //创建    {void post()}
//    <U, T> T post(U entity, Class<T>... tClass) throws Exception;
//
//    //【幂等性】 {boolean delete(T t)}
//    <U, T> boolean delete(U u, Class<T>... tClass) throws Exception;
//
////<U, T> List<T> query(U params, Class<T> tClass);