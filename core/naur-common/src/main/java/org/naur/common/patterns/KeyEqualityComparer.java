package org.naur.common.patterns;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/8/12
 * Time: 5:11 PM
 * To change this template use File | Settings | File Templates.
 */
public class KeyEqualityComparer<TSource, TKey> extends EqualityComparer<TSource> {

    public KeyEqualityComparer(Func<TSource, TKey> projection) {
        new KeyEqualityComparer<TSource, TKey>(projection, null);
    }

    public KeyEqualityComparer(Func<TSource, TKey> projection, Comparer<TKey> comparer) {
        this.projection = projection;
        this.comparer = (null == comparer ? new EqualityComparer<TKey>() : comparer);
    }

    public boolean equals(TSource x, TSource y) {
        if (x == null && y == null)
            return true;
        if (x == null || y == null)
            return false;
        return comparer.equals(projection.execute(x), projection.execute(y));
    }

    private Func<TSource, TKey> projection;
    private Comparer<TKey> comparer;
}
