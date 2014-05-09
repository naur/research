package org.naure.common;//package naure.common;
//
//import com.opensymphony.xwork2.ActionSupport;
//import org.apache.struts2.ServletActionContext;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.UnsupportedEncodingException;
//
///**
// * Created by IntelliJ IDEA.
// * User: Administrator
// * Date: 10/25/11
// * Time: 11:52 AM
// * To change this template use File | Settings | File Templates.
// */
//
//public class BaseActionSupport extends ActionSupport implements org.apache.struts2.interceptor.ServletRequestAware, org.apache.struts2.interceptor.ServletResponseAware {
//    protected void responseEncoding(String contentType) throws UnsupportedEncodingException {
//        HttpServletResponse response = ServletActionContext.getResponse();
//        if (request != null) {
//            request.setCharacterEncoding("utf-8");
//        }
//        if (response != null) {
//            response.setContentType(contentType + ";charset=utf-8");
//        }
//    }
//
//    public void setServletRequest(HttpServletRequest request) {
//        //To change body of implemented methods use File | Settings | File Templates.
//    }
//
//    public void setServletResponse(HttpServletResponse response) {
//        //To change body of implemented methods use File | Settings | File Templates.
//    }
//
//    protected javax.servlet.http.HttpServletRequest request;
//}
