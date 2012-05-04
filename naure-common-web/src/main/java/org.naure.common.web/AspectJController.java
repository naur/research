package org.naure.common.web;

import org.aspectj.lang.annotation.*;
import org.naure.common.TraceEventType;
import org.naure.repositories.SessionRepository;
import org.naure.repositories.models.SessionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/27/12
 * Time: 1:13 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
@Aspect
public class AspectJController {
    @Pointcut("within(@org.springframework.stereotype.Controller *)")
    public void controllerBean() {
    }

    @Pointcut("execution(* *(..))")
    public void methodPointcut() {
    }

    @Before("controllerBean() && methodPointcut() ")
    public void before() {
        HttpServletRequest request = HttpSessionFilter.session.get();
        SessionLog sessionLog = new SessionLog();
        sessionLog.setSeverity(TraceEventType.Start);
        sessionLog.setSessionId(request.getRequestedSessionId());
        sessionLog.setIpAddress(HttpUtility.getIpAddr(request));
        sessionLog.setHostName(request.getHeader("host"));
        sessionLog.setLanguage((request.getHeader("accept-language").isEmpty() ? "Unknown" : request.getHeader("accept-language")));
        sessionLog.setUserAgent(request.getHeader("user-agent"));
        sessionLog.setRequestType(request.getMethod());
        sessionLog.setRequestUrl(request.getRequestURI());
        sessionLog.setReferrerUrl(request.getHeader("Referer"));

//        logEntry.SessionLog.SessionID = HttpContext.Current.Session.SessionID ?? "";
//        logEntry.SessionLog.IpAddress = IPAddress.Parse(HttpContext.Current.Request.UserHostAddress);
//        logEntry.SessionLog.HostName = HttpContext.Current.Request.UserHostName ?? "";
//        //HostName = System.Net.Dns.GetHostEntry(HttpContext.Current.Request.UserHostAddress).HostName,
//        //HostName = System.Net.Dns.GetHostName(),
//        if (HttpContext.Current.Request.UserLanguages != null)
//            logEntry.SessionLog.Language = HttpContext.Current.Request.UserLanguages[0] ?? "";
//        else
//        logEntry.SessionLog.Language = "Unknown";
//        logEntry.SessionLog.UserAgent = HttpContext.Current.Request.UserAgent ?? "";
//        logEntry.SessionLog.RequestType = HttpContext.Current.Request.RequestType ?? ""; //HttpMethod
//        logEntry.SessionLog.StatusCode = HttpContext.Current.Response.StatusCode; //Status
//        logEntry.SessionLog.ReferrerUrl = (HttpContext.Current.Request.UrlReferrer == null) ? "" : HttpContext.Current.Request.UrlReferrer.ToString();
//        logEntry.SessionLog.RequestUrl = (HttpContext.Current.Request.RawUrl ?? "").ToString();
//        logEntry.Categories.Add("Session Trace");

        try {
            sessionRepository.add(sessionLog);
        } catch (Exception ex) {

        }

    }

    @AfterReturning("controllerBean() && methodPointcut() ")
    public void afterReturning() {
    }

    //相当于finally,无论业务方法是否产生异常，执行后都会执行此操作
    @After("controllerBean() && methodPointcut() ")
    public void after() {
    }

    //定义切点,匹配规则为(返回类型 方法(参数设置)
//    @Before("execution(* *(..))")
//    @Around("execution(* org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.handle(..))")
//    public void before() {
//        System.out.println("Before: " + Calendar.getInstance().getTime());
//    }

//    //定义切点,匹配规则为(范围 返回类型 返回类.方法(参数设置)
//    @After("execution(public * *.*(..))")
//    public void after() {
//        System.out.println("After" + Calendar.getInstance().getTime());
//    }

    @Autowired
    SessionRepository sessionRepository;
}
