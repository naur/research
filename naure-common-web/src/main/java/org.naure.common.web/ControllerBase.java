package org.naure.common.web;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/27/12
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ControllerBase  {

    public String view(String name) {
        System.out.println("----after advice------");
        return viewPath + name;
    }

    protected String viewPath = "";

}
