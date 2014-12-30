package org.naur.common.patterns;

import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/27/12
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */
public interface Adapter<T> {
    //读取
    Map<String, T> get();
    //更新和创建 【幂等性】
    void put(T t);
    //创建
    void post();
    //【幂等性】
    boolean delete(T t);
    void query();
}
