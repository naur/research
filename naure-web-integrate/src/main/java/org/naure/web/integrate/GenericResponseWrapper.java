package org.naure.web.integrate;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/2/12
 * Time: 10:06 AM
 * To change this template use File | Settings | File Templates.
 */
public class GenericResponseWrapper extends HttpServletResponseWrapper implements Serializable {
    /**
     * Constructs a response adaptor wrapping the given response.
     *
     * @throws IllegalArgumentException if the response is null
     */
    public GenericResponseWrapper(HttpServletResponse response) {
        super(response);
    }

    @Override
    public void sendError(int sc) throws IOException {
        statusCode = sc;
        super.sendError(sc);
    }

    @Override
    public void sendError(int sc, String msg) throws IOException {
        statusCode = sc;
        sm = msg;
        super.sendError(sc, msg);
    }

    @Override
    public void setStatus(int sc) {
        statusCode = sc;
        super.setStatus(sc);
    }

    @Override
    public void setStatus(int sc, String sm) {
        statusCode = sc;
        sm = sm;
        super.setStatus(sc, sm);
    }

    public int getStatusCode() {
        return statusCode;
    }

    private int statusCode;
    public String sm;
}
