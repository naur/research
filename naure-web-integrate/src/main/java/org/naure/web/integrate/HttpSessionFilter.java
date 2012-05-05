package org.naure.web.integrate;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
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
        if (((HttpServletRequest) request).getRequestedSessionId() == null) {
            ((HttpServletRequest) request).getSession();
        }
        //((HttpServletRequest) request).getHeaderNames()
        session.set((HttpServletRequest) request);
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public static final ThreadLocal<HttpServletRequest> session = new ThreadLocal<HttpServletRequest>();
}
