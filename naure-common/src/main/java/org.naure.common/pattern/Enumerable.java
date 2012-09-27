package org.naure.common.pattern;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/11/12
 * Time: 4:18 PM
 * To change this template use File | Settings | File Templates.
 */
public class Enumerable {
    public static <T> boolean contains(List<T> list, Comparator comparator, T... value) {
        int compInt;
        for (T item : list) {
            compInt = comparator.compare(item, value.length == 0 ? null : value[0]);
            if (compInt >= 0) {
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
            if (comparator.compare(item, value.length == 0 ? null : value[0]) >= 0)
                return item;
        }
        return null;
    }

    public static <T, U> List<U> select(List<T> list, Func<T, U> func) {
        List<U> temp = new ArrayList<U>();
        for (T t : list) {
            temp.add(func.execute(t));
        }
        return temp;
    }
}
