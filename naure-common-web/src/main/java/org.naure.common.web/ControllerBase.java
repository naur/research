package org.naure.common.web;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/27/12
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */
public class ControllerBase {
    protected String view(String name) {
        return viewPath + name;
    }

    protected String viewPath = "";
}
