package org.naure.web.integrate;


import com.sun.syndication.feed.atom.Feed;
import org.springframework.oxm.xstream.XStreamMarshaller;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:56 PM
 * To change this template use File | Settings | File Templates.
 */
public class HttpUtility {
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public static String getHost(HttpServletRequest request) {
        return request.getHeader("host");
    }

    public static <T> Feed getFeed(List<T> list, XStreamMarshaller marshaller) throws IOException {
        Feed feed = new Feed();
        feed.setFeedType("atom_1.0");
        feed.setTitle("Employee Atom Feed");
        feed.setEntries(list);
        return feed;
    }
}
