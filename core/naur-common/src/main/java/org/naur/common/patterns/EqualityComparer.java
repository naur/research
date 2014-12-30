package org.naur.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/8/12
 * Time: 5:06 PM
 * To change this template use File | Settings | File Templates.
 */
public class EqualityComparer<T> implements Comparer<T> {
    @Override
    public boolean equals(T x, T y) {
        return x.equals(y);
    }
}
