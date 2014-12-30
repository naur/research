package org.naur.research.labs.feature;

import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;
import org.naur.research.labs.entities.User;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Created by Administrator on 9/12/13.
 */
@Enable(false)
public class JReflection extends Sub {
    @Override
    public void execute() throws Exception {
        logger.debug(format(1, "Java Reflection."));
        //ReflectionUtils

        //logger.debug("Reflection.getCallerClass(): " + Reflection.getCallerClass());

        ApplicationContext ctx = new AnnotationConfigApplicationContext(ConfigDemoTestContext.class);
        User user = ctx.getBean(User.class);
        logger.info(user.toString());

        user.setId(-100618);
        logger.info(user.toString());

        user = ctx.getBean(User.class);
        logger.info(user.toString());
    }

    private StackTraceElement getCaller() {
        return new Throwable().getStackTrace()[2];

        //TODO [0] is the element for Thread.currentThread()
        //TODO Thread().currentThread()().getStackTrace()[1]    是你当前方法执行堆栈
        // TODO Thread().currentThread().getStackTrace()[2]     是上一级的方法堆栈 以此类推
//        StackTraceElement stack[] = Thread.currentThread().getStackTrace(); //equals: new Throwable().getStackTrace()
//        for (StackTraceElement element : stack) {
//            if ((element.getClassName().indexOf("T1")) != -1) {
//                logger.debug("called by " + element.getClassName() + "." + element.getMethodName() + "/" + element.getFileName());
//            }
//        }

        //sun.reflect.Reflection.getCallerClass();
        //new LogRecord()
    }
}
