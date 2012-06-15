package org.naure.web.integrate;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/27/12
 * Time: 4:29 PM
 * To change this template use File | Settings | File Templates.
 */
public class HttpSessionFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        if (httpRequest.getRequestURI().contains("/css/") ||
                httpRequest.getRequestURI().contains("/images/") ||
                httpRequest.getRequestURI().contains("/js/") ||
                httpRequest.getRequestURI().contains("/resources/") ||
                httpRequest.getRequestURI().contains("/xml/") ||
                httpRequest.getRequestURI().contains("/xsl/") ||
                httpRequest.getRequestURI().contains("/xml/") ||
                httpRequest.getRequestURI().contains("favicon.ico")) {
            chain.doFilter(request, response);
        } else {
            session.set(httpRequest);
            if ("/".equals(httpRequest.getRequestURI())) {
                httpRequest.getRequestDispatcher("welcome").forward(request, response);
            } else {
                chain.doFilter(request, response);
            }
        }
    }

    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public static final ThreadLocal<HttpServletRequest> session = new ThreadLocal<HttpServletRequest>();
}
