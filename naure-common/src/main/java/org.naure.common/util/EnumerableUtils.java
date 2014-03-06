package com.yihaodian.ssa.ftv.common.util;

import com.yihaodian.ssa.ftv.common.patterns.Comparer;
import com.yihaodian.ssa.ftv.common.patterns.Func;
import com.yihaodian.ssa.ftv.common.patterns.Funcm;
import com.yihaodian.ssa.ftv.common.patterns.KeyEqualityComparer;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/11/12
 * Time: 4:18 PM
 * To change this template use File | Settings | File Templates.
 */
public class EnumerableUtils {

    //集合比较
    public static <T, U> boolean sequenceEqual(List<T> first, List<T> second, Func<T, U> keyExtractor) {
        KeyEqualityComparer<T, U> keyEqualityComparer = new KeyEqualityComparer<T, U>(keyExtractor);
        return sequenceEqual(first, second, keyEqualityComparer);
    }

    //集合比较
    public static <T> boolean sequenceEqual(List<T> first, List<T> second, Comparer<T> comparer) {
        if (first == null && second == null) return true;
        if (first == null || second == null) return false;
        if (first.size() != second.size()) return false;

        for (int i = 0; i < first.size(); i++) {
            if (!sequenceEqual(first.get(i), second.get(i), comparer))
                return false;
        }

        return true;
    }

    //对象比较
    public static <T, U> boolean sequenceEqual(T x, T y, Func<T, U> keyExtractor) {
        KeyEqualityComparer<T, U> keyEqualityComparer = new KeyEqualityComparer<T, U>(keyExtractor);
        return sequenceEqual(x, y, keyEqualityComparer);
    }

    //对象比较
    public static <T, U> boolean sequenceEqual(T x, T y, Comparer<T> comparer) {
        return comparer.equals(x, y);
    }

    /**
     * contains. 查询集合是否包含特定项
     *
     * @param list       入参
     * @param comparator 比较器
     * @param value      比较值
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> boolean contains(final List<T> list,
                                       final Comparator comparator,
                                       final T... value) {
        for (T item : list) {
            if (null != item && comparator.compare(
                    item, value.length == 0 ? null : value[0]) >= 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * contains. 查询集合是否包含特定项
     *
     * @param list       入参
     * @param comparator 比较器
     * @param value      比较值
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> boolean contains(final List<T> list,
                                       final Func<T, Boolean> comparator,
                                       final T... value) {
        for (T item : list) {
            if (null != item && comparator.execute(item)) {
                return true;
            }
        }
        return false;
    }

    /**
     * where.
     *
     * @param list       入参
     * @param comparator 比较器
     * @param value      比较值
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> List<T> where(final List<T> list,
                                    final Comparator comparator,
                                    final T... value) {
        List<T> temp = new ArrayList<T>();
        for (T item : list) {
            if (comparator.compare(item,
                    value.length == 0 ? null : value[0]) >= 0)
                temp.add(item);
        }
        return temp;
    }

    /**
     * where.
     *
     * @param list       入参
     * @param comparator 比较器
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> List<T> where(final List<T> list,
                                    final Func<T, Boolean> comparator) {
        List<T> temp = new ArrayList<T>();
        for (T item : list) {
            if (comparator.execute(item))
                temp.add(item);
        }
        return temp;
    }

    /**
     * where.
     *
     * @param list       入参
     * @param comparator 比较器
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T, U> List<T> where(final List<T> list,
                                       final Funcm<T, U, Boolean> comparator,
                                       final U value) {
        List<T> temp = new ArrayList<T>();
        for (T item : list) {
            if (comparator.execute(item, value)) {
                temp.add(item);
            }
        }
        return temp;
    }

    /**
     * find. 查找某一项
     *
     * @param list       入参
     * @param comparator 比较器
     * @param value      比较值
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> T find(final List<T> list,
                             final Comparator comparator,
                             final T... value) {
        if (null == list || list.isEmpty()) return null;

        for (T item : list) {
            if (null != item && comparator.compare(item,
                    value.length == 0 ? null : value[0]) >= 0)
                return item;
        }
        return null;
    }

    /**
     * find.
     *
     * @param list       入参
     * @param comparator 比较器
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> T find(final List<T> list,
                             final Func<T, Boolean> comparator) {
        for (T item : list) {
            if (null != item && comparator.execute(item))
                return item;
        }
        return null;
    }

    /**
     * find.
     *
     * @param set        入参
     * @param comparator 比较器
     * @param value      比较值
     * @param <T>        入参类型
     * @return boolean 返回值
     */
    public static <T> T find(final Set<T> set,
                             final Comparator comparator,
                             final T... value) {
        T t = null;
        if (null == set || set.isEmpty() || !set.iterator().hasNext()) return t;

        for (Iterator<T> iter = set.iterator(); iter.hasNext(); ) {
            t = iter.next();
            if (null != t && comparator.compare(t,
                    value.length == 0 ? null : value[0]) >= 0)
                return t;
        }
        return null;
    }

    /**
     * find.
     *
     * @param set        入参
     * @param comparator 比较器
     * @param <T>        入参类型
     * @param <U>        入参类型
     * @return boolean 返回值
     */
    public static <T, U> T find(final Set<T> set,
                                final Func<T, Boolean> comparator) {
        T t = null;
        if (null == set || set.isEmpty() || !set.iterator().hasNext()) return t;

        for (Iterator<T> iter = set.iterator(); iter.hasNext(); ) {
            t = iter.next();
            if (null != t && comparator.execute(t))
                return t;
        }
        return null;
    }

    /**
     * select.
     *
     * @param list     入参
     * @param selector 比较器
     * @param <T>      入参类型
     * @param <U>      入参类型
     * @return boolean 返回值
     */
    public static <T, U> List<U> select(final T[] list,
                                        final Func<T, U> selector) {
        List<U> temp = new ArrayList<U>();
        if (null == list || list.length <= 0) {
            return temp;
        }
        U u = null;
        for (T t : list) {
            if (null != t) {
                u = selector.execute(t);
                if (null != u) {
                    temp.add(u);
                }
            }
        }
        return temp;
    }

    /**
     * select.
     *
     * @param list     入参
     * @param selector 比较器
     * @param <T>      入参类型
     * @param <U>      入参类型
     * @return boolean 返回值
     */
    public static <T, U> List<U> select(final List<T> list,
                                        final Func<T, U> selector) {
        List<U> temp = new ArrayList<U>();
        if (null == list || list.isEmpty()) return temp;
        U u = null;
        for (T t : list) {
            if (null != t && null != (u = selector.execute(t))) {
                temp.add(u);
            }
        }
        return temp;
    }

    /**
     * selectMany.
     *
     * @param list     入参
     * @param selector 比较器
     * @param <T>      入参类型
     * @param <U>      入参类型
     * @return boolean 返回值
     */
    public static <T, U> List<U> selectMany(final List<T> list,
                                            final Func<T, List<U>> selector) {
        List<U> temp = new ArrayList<U>();
        List<U> result = null;
        if (null == list || list.isEmpty()) return temp;
        for (T t : list) {
            if (null != t && null != (result = selector.execute(t))) {
                temp.addAll(result);
            }
        }
        return temp;
    }
}
