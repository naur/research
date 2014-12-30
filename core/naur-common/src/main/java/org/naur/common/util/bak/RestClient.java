///*
// * @(#) RestClient.java 2014-23-01
// *
// * Copy Right@ 纽海信息技术有限公司
// */
//package org.naur.common.util.bak;
//
//import org.apache.http.auth.AuthScope;
//import org.apache.http.auth.UsernamePasswordCredentials;
//import org.apache.http.impl.client.DefaultHttpClient;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//
//import javax.annotation.PostConstruct;
//
///**
// * <pre>
// * author jiaruizhi
// *
// *
// * 创建日期: 2014-23-01
// * 修改人 :
// * 修改说明:
// * 评审人 ：
// * </pre>
// */
//@Component
//public class RestClient {
//    final Logger logger = LoggerFactory.getLogger(getClass());
//
//    private final RestTemplate template;
//    private final RestClientProperties clientProperties;
//    private final DefaultHttpClient httpClient;
//
//    @Autowired
//    public RestClient(RestTemplate template, RestClientProperties clientProperties,
//                      DefaultHttpClient httpClient) {
//        this.template = template;
//        this.clientProperties = clientProperties;
//        this.httpClient = httpClient;
//    }
//
//    @PostConstruct
//    public void init() {
//        setCredentials(clientProperties.getUsername(), clientProperties.getPassword());
//    }
//
//    /**
//     * Gets rest template.
//     */
//    public RestTemplate getRestTemplate() {
//        return template;
//    }
//
//    /**
//     * Creates URL based on the URI passed in.
//     */
//    public String createUrl(String uri) {
//        StringBuilder sb = new StringBuilder();
//
//        sb.append(clientProperties.getUrl());
//        sb.append(clientProperties.getApiPath());
//        sb.append(uri);
//
//        logger.debug("URL is '{}'.", sb.toString());
//
//        return sb.toString();
//    }
//
//    /**
//     * Set default credentials on HTTP client.
//     */
//    public void setCredentials(String userName, String password) {
//        UsernamePasswordCredentials creds =
//                new UsernamePasswordCredentials(clientProperties.getUsername(), clientProperties.getPassword());
//        AuthScope authScope = new AuthScope(AuthScope.ANY_HOST, AuthScope.ANY_PORT, AuthScope.ANY_REALM);
//
//        httpClient.getCredentialsProvider().setCredentials(authScope, creds);
//    }
//}
