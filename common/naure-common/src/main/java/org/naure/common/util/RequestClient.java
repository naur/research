/*
 * @(#) RequestClient.java 2014-32-01
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.common.util;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.fluent.Executor;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.HTTP;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

/**
 * <pre>
 * author jiaruizhi
 *
 * TODO http://hc.apache.org/httpcomponents-client-ga/tutorial/html/fluent.html
 *
 * 创建日期: 2014-32-01
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class RequestClient {
    /**
     * 最大连接数
     */
    public final static int MAX_TOTAL_CONNECTIONS = 200;
    /**
     * 每个路由最大连接数
     */
    public final static int MAX_CONNECTIONS_PER_ROUTE = 100;
    /**
     * 获取连接的最大等待时间
     */
    public final static int WAIT_TIMEOUT = 60000;
    /**
     * 连接超时时间
     */
    public final static int SOCKET_TIMEOUT = 60 * 1000;
    public final static int CONNECT_TIMEOUT = 70 * 1000;
    /**
     * 读取超时时间
     */
    public final static int READ_TIMEOUT = 10000;

    private static Object lock = new Object();
    private static RequestClient instance;
    private static Executor executor;

    public String get(String uri) throws IOException {
        return executor
                .execute(Request.Get(uri))
                .returnContent()
                .asString();
    }

    public Document get(String uri, ResponseHandler<Document> handler) throws IOException {
        return executor
                .execute(Request.Get(uri)).handleResponse(new ResponseHandler<Document>() {
                    @Override
                    public Document handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
                        StatusLine statusLine = response.getStatusLine();
                        HttpEntity entity = response.getEntity();
                        if (statusLine.getStatusCode() >= 300) {
                            throw new HttpResponseException(
                                    statusLine.getStatusCode(),
                                    statusLine.getReasonPhrase());
                        }
                        if (entity == null) {
                            throw new ClientProtocolException("Response contains no content");
                        }
                        DocumentBuilderFactory dbfac = DocumentBuilderFactory.newInstance();
                        try {
                            DocumentBuilder docBuilder = dbfac.newDocumentBuilder();
                            ContentType contentType = ContentType.getOrDefault(entity);
                            if (!contentType.equals(ContentType.APPLICATION_XML)) {
                                throw new ClientProtocolException("Unexpected content type:" +
                                        contentType);
                            }
                            String charset = contentType.getMimeType(); //TODO .getCharset();
                            if (charset == null) {
                                charset = HTTP.DEFAULT_CONTENT_CHARSET;
                            }
                            return docBuilder.parse(entity.getContent(), charset);
                        } catch (ParserConfigurationException ex) {
                            throw new IllegalStateException(ex);
                        } catch (SAXException ex) {
                            throw new ClientProtocolException("Malformed XML document", ex);
                        }
                    }
                });
    }

    static {
        RequestConfig requestConfig = RequestConfig.custom()
                .setSocketTimeout(SOCKET_TIMEOUT)
                .setConnectTimeout(CONNECT_TIMEOUT).build();
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(MAX_TOTAL_CONNECTIONS)
                .setMaxConnPerRoute(MAX_CONNECTIONS_PER_ROUTE)
                .setDefaultRequestConfig(requestConfig).build();
        executor = Executor.newInstance(httpClient);
    }

    public static RequestClient getInstance() {
        if (null == instance) {
            synchronized (lock) {
                if (instance == null) instance = new RequestClient();
            }
        }
        return instance;
    }

}
