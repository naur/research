///*
//* @(#) HttpConnectionManager.java 2014-14-01
//*
//* Copy Right@ 纽海信息技术有限公司
//*/
//package org.naur.common.util.bak;
//
//import org.apache.http.client.config.RequestConfig;
//import org.apache.http.conn.scheme.PlainSocketFactory;
//import org.apache.http.conn.scheme.Scheme;
//import org.apache.http.conn.scheme.SchemeRegistry;
//import org.apache.http.conn.ssl.SSLSocketFactory;
//import org.apache.http.impl.client.HttpClientBuilder;
//import org.apache.http.impl.conn.PoolingClientConnectionManager;
//import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
//
///**
//* <pre>
//* author jiaruizhi
//*
//*
//* 创建日期: 2014-14-01
//* 修改人 :
//* 修改说明:
//* 评审人 ：
//* </pre>
//*/
//public class HttpConnectionManager {
//    /**
//     * 最大连接数
//     */
//    public final static int MAX_TOTAL_CONNECTIONS = 200;
//    /**
//     * 获取连接的最大等待时间
//     */
//    public final static int WAIT_TIMEOUT = 60000;
//    /**
//     * 每个路由最大连接数
//     */
//    public final static int MAX_ROUTE_CONNECTIONS = 300;
//    /**
//     * 连接超时时间
//     */
//    public final static int CONNECT_TIMEOUT = 10000;
//    /**
//     * 读取超时时间
//     */
//    public final static int READ_TIMEOUT = 10000;
//
//    private static RequestConfig config;
//    private static PoolingHttpClientConnectionManager connectionManager;
////HttpClientBuilder
//    static {
//        Registry<> schemeRegistry = new SchemeRegistry();
//        schemeRegistry.register(
//                new Scheme("http",80, PlainSocketFactory.getSocketFactory()));
//        schemeRegistry.register(
//                new Scheme("https", 443, SSLSocketFactory.getSocketFactory()));
//
//        connectionManager = new PoolingHttpClientConnectionManager();
//        connectionManager.setMaxTotal(200);
//        connectionManager.setDefaultMaxPerRoute(80);
//
//        HttpParams params = new BasicHttpParams();
//        params.setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,CONNECT_TIMEOUT);
//        params.setParameter(CoreConnectionPNames.SO_TIMEOUT, READ_TIMEOUT);
//    }
//
//    public static HttpClient getHttpClient() {
//        return new DefaultHttpClient(cm, httpParams);
//    }
//}
