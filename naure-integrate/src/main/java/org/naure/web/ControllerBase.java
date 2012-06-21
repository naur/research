package org.naure.web;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.pattern.Func;

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

    protected Information handler(Information information, Func<Information, Information> func) {
        try {
            information = func.execute(information);
        } catch (Exception ex) {
            information.setKeywords(ex.toString());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return information;
    }

//    @ExceptionHandler(Exception.class)
//    public String handleException(Exception ex,HttpServletRequest request) {
//        return ex.getMessage();
//    }



//    //读取    {Map<String, T> get()}
//    <T> List<T> get(Map params, Class<T> tClass) throws Exception;
//
//    //更新和创建 【幂等性】   {void put(T t)}
//    <U, T> T put(U entity, Class<T>... tClass) throws Exception;
//
//    //创建    {void post()}
//    <U, T> T post(U entity, Class<T>... tClass) throws Exception;
//
//    //【幂等性】 {boolean delete(T t)}
//    <U, T> boolean delete(U u, Class<T>... tClass) throws Exception;
//
//    //<U, T> List<T> query(U params, Class<T> tClass);

    protected String viewPath = "";
}