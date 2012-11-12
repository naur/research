package org.naure.common.patterns;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/11/12
 * Time: 4:18 PM
 * To change this template use File | Settings | File Templates.
 */
public class Enumerable {

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

    public static <T> boolean contains(List<T> list, Comparator comparator, T... value) {
        for (T item : list) {
            if (null != item && comparator.compare(item, value.length == 0 ? null : value[0]) >= 0) {
                return true;
            }
        }
        return false;
    }

    public static <T> List<T> where(List<T> list, Comparator comparator, T... value) {
        List<T> temp = new ArrayList<T>();
        for (T item : list) {
            if (comparator.compare(item, value.length == 0 ? null : value[0]) >= 0)
                temp.add(item);
        }
        return temp;
    }

    public static <T> T find(List<T> list, Comparator comparator, T... value) {
        for (T item : list) {
            if (null != item && comparator.compare(item, value.length == 0 ? null : value[0]) >= 0)
                return item;
        }
        return null;
    }

    public static <T> T find(Set<T> set, Comparator comparator, T... value) {
        T t = null;
        if (null == set || set.isEmpty() || !set.iterator().hasNext()) return t;

        for (Iterator<T> iter = set.iterator(); iter.hasNext(); ) {
            t = iter.next();
            if (null != t && comparator.compare(t, value.length == 0 ? null : value[0]) >= 0)
                return t;
        }
        return null;
    }

    public static <T, U> T find(Set<T> set, Func<T, Boolean> func) {
        T t = null;
        if (null == set || set.isEmpty() || !set.iterator().hasNext()) return t;

        for (Iterator<T> iter = set.iterator(); iter.hasNext(); ) {
            t = iter.next();
            if (null != t && func.execute(t))
                return t;
        }
        return null;
    }

    public static <T, U> List<U> select(List<T> list, Func<T, U> selector) {
        List<U> temp = new ArrayList<U>();
        if (null == list || list.isEmpty()) return temp;
        for (T t : list) {
            if (null != t) temp.add(selector.execute(t));
        }
        return temp;
    }
}
