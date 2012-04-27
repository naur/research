package org.naure.common;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ControllerBase {
    protected String view(String name) {
        return viewPath + name;
    }

    protected String viewPath = "";
}
