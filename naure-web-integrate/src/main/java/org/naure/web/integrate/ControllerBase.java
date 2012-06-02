package org.naure.web.integrate;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/27/12
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ControllerBase {

    public String view(String name) {
        return viewPath + "/" + name;
    }

//    @ExceptionHandler(Exception.class)
//    public String handleException(Exception ex,HttpServletRequest request) {
//        return ex.getMessage();
//    }

    protected String viewPath = "";
}
