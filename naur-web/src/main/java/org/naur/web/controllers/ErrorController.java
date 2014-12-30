package org.naur.web.controllers;

import org.naur.integrate.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/1/12
 * Time: 3:16 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "error", method = {RequestMethod.GET, RequestMethod.POST})
public class ErrorController extends ControllerBase {
    @RequestMapping()
    public String view(ServletRequest request) {
        String queryString = ((HttpServletRequest) request).getQueryString();
        if (queryString == null || queryString == "")
            queryString = "error";

        return view(queryString);
    }
}
