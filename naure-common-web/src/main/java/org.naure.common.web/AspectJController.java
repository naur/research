package org.naure.common.web;

import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;

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
        HttpSession session = HttpSessionFilter.session.get();
        String sessionId = session.getId();
        session.getLastAccessedTime();
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
}
