package org.naure.common.math;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/6/12
 * Time: 10:47 AM
 * To change this template use File | Settings | File Templates.
 */
public class Point {

    public Point(Float x, Float y) {
        this.X = x;
        this.Y = y;
    }

    public Float getX() {
        return X;
    }

    public void setX(Float x) {
        X = x;
    }

    public Float getY() {
        return Y;
    }

    public void setY(Float y) {
        Y = y;
    }

    private Float X;
    private Float Y;
}
