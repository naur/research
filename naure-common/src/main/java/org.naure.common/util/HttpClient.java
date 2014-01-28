/*
 * @(#) WebClient.java 2014-36-07
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package com.yihaodian.scm.scs.framework.util;

import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.cookie.CookiePolicy;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-01-07
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class HttpClient {
    // 获得ConnectionManager，设置相关参数
    private static int connectionTimeOut = 70000;
    private static int socketTimeOut = 60000;
    private static int maxConnectionPerHost = 100;
    private static int maxTotalConnections = 200;

    private final static Logger logger = LoggerFactory.getLogger(HttpClient.class);

    private static MultiThreadedHttpConnectionManager getManager() {
        return ManagerHelper.managerInstance;
    }

    private static class ManagerHelper {
        // 获得ConnectionManager，设置相关参数
        private static final MultiThreadedHttpConnectionManager managerInstance = new MultiThreadedHttpConnectionManager();

        // 初始化ConnectionManger的方法
        static {
            managerInstance.getParams().setConnectionTimeout(connectionTimeOut);
            managerInstance.getParams().setSoTimeout(socketTimeOut);
            managerInstance.getParams().setDefaultMaxConnectionsPerHost(
                    maxConnectionPerHost);
            managerInstance.getParams().setMaxTotalConnections(
                    maxTotalConnections);
        }
    }

    /**
     * POST 调用，默认 contentType 为 application/xml， encode 为 UTF-8
     *
     * @param url    调用的 URI
     * @param params JSON 或 XML 格式的字符串
     * @return 返回文本类型的 JSON 或 XML 格式的字符串
     * @throws UnsupportedEncodingException
     */
    public static String post(String url,
                              String params) throws UnsupportedEncodingException {
        return HttpClient.post(url, params, "application/xml", "UTF-8");
    }

    /**
     * POST 调用，默认 encode 为 UTF-8
     *
     * @param url         调用的 URI
     * @param params      JSON 或 XML 格式的字符串
     * @param contentType 发送信息至服务器时内容编码类型
     * @return 返回文本类型的 JSON 或 XML 格式的字符串
     * @throws UnsupportedEncodingException
     */
    public static String post(String url,
                              String params, String contentType) throws UnsupportedEncodingException {
        return HttpClient.post(url, params, contentType, "UTF-8");
    }

    /**
     * POST 调用
     *
     * @param url         调用的 URI
     * @param params      JSON 或 XML 格式的字符串
     * @param contentType 发送信息至服务器时内容编码类型
     * @param encode      设定一个特定的字符集
     * @return 返回文本类型的 JSON 或 XML 格式的字符串
     * @throws UnsupportedEncodingException
     */
    public static String post(String url,
                              String params, String contentType, String encode) throws UnsupportedEncodingException {

        org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient(getManager());
        PostMethod post = new PostMethod(url);
        //ignore cookies
        post.getParams().setCookiePolicy(CookiePolicy.IGNORE_COOKIES);
        //TODO 过时 post.setRequestBody(nameValuePair);
        post.setRequestEntity(new StringRequestEntity(params, contentType, encode));
        post.setFollowRedirects(false);

        String result = StringUtils.EMPTY;
        StringBuilder resultBuffer = new StringBuilder();
        try {
            client.executeMethod(post);
            BufferedReader in = new BufferedReader(new InputStreamReader(post
                    .getResponseBodyAsStream(), post.getResponseCharSet()));
            String inputLine = null;
            while ((inputLine = in.readLine()) != null) {
                resultBuffer.append(inputLine);
                resultBuffer.append("\n");
            }
            in.close();
            result = resultBuffer.toString();
        } catch (Exception e) {
            //TODO 异常处理
            logger.error("HttpClient.POST", e);
        } finally {
            post.releaseConnection();
        }
        return result;
    }
}
