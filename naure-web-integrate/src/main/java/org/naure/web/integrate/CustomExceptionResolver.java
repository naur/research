package org.naure.web.integrate;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/1/12
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class CustomExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }
}
