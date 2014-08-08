package org.naure.integrate.test;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/9/12
 * Time: 6:09 PM
 * To change this template use File | Settings | File Templates.
 */
public class ResponseResult {
    public ResponseResult(int x, int y) {
        new ResponseResult(0, x, y, null);
    }

    public ResponseResult(int identity) {
        new ResponseResult(identity, 0, 0, null);
    }

    public ResponseResult(String name) {
        new ResponseResult(0, 0, 0, name);
    }

    public ResponseResult(int identity, String name) {
        new ResponseResult(identity, 0, 0, name);
    }

    public ResponseResult(int identity, int x, int y) {
        new ResponseResult(identity, x, y, null);
    }

    public ResponseResult(int identity, int x, int y, String name) {
        this.identity = identity;
        this.x = x;
        this.y = y;
        this.name = name;
    }

    public int identity;
    public int x;
    public int y;
    public String name;
}
