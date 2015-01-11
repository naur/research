package org.naur.integrate.web;

import org.naur.common.entities.Information;
import org.naur.common.entities.InformationLevel;
import org.naur.common.patterns.exception.Func;
import org.naur.common.patterns.exception.Sub;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/27/12
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ControllerBase {

    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    public String view(String name) {
        return viewPath + "/" + name;
    }

    /**
     * Inout: Information, Output: Func<Information, Information>
     *
     * @param information
     * @param func
     * @return
     */
    protected Information handler(Information information, Func<Information, Information> func) {
        try {
            information = func.execute(information);
        } catch (Exception ex) {
            information.setKeywords(ex.toString());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return information;
    }

    /**
     * Inout: Map, Output: Func<Map, Information>
     */
    protected Information handler(Map params, Func<Map, Information> func) {
        Information information = null;
        try {
            information = func.execute(params);
        } catch (Exception ex) {
            information = new Information<String>();
            information.setKeywords(ex.toString());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return information;
    }

    /**
     * Inout: Non, Output: Sub<Information>
     */
    protected Information handler(Sub<Information> func) {
        Information information = null;
        try {
            information = func.execute();
        } catch (Exception ex) {
            information = new Information<String>();
            information.setKeywords(ex.toString());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return information;
    }

    public void setApplicationPath(HttpServletRequest request) {
        if (null == applicationPath)
            this.applicationPath = request.getSession().getServletContext().getRealPath("/");

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


    /**
     * 设置响应编码
     */
    protected void responseEncoding() {
        this.responseEncoding(null);
    }

    protected void responseEncoding(String contentType) {
        //todo
//        HttpServletResponse response = ServletActionContext.getResponse();
//        try {
//            request.setCharacterEncoding("utf-8");
//        } catch (Exception ex) {
//        }
//        if (StringUtils.isNotEmpty(contentType))
//            response.setContentType(contentType + ";charset=utf-8");
    }

    /**
     * 解析 Map 参数
     *
     * @param map
     * @param key
     * @return
     */
    protected String getMapValue(Map map, String key) {
        String[] array = null;
        if (map.containsKey(key) && (array = (String[]) map.get(key)) != null && array.length > 0)
            return array[0];
        return null;
    }

    protected Map<String, Object> getParameterMap(ServletRequest request) {
        Map<String, Object> params = new HashMap<String, Object>();
        Enumeration paramNames = request.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = (String) paramNames.nextElement();
            params.put(paramName, request.getParameter(paramName));
        }
        return params;
    }

    protected String viewPath = "";
    protected String applicationPath;
}
