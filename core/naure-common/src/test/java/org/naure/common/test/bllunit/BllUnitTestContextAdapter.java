/*
 * @(#) BllUnitTestContextAdapter.java 2013-14-14
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit;

import org.junit.runners.model.FrameworkMethod;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractRefreshableApplicationContext;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2013-14-14
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
class BllUnitTestContextAdapter implements BllUnitTestContext {

    private FrameworkMethod method;
    private Object target;
    private List<Throwable> errors = new ArrayList<Throwable>();
    private Map<Class<?>, ApplicationContext> applicationContexts;

    public BllUnitTestContextAdapter(FrameworkMethod method, Object target) {
        this.method = method;
        this.target = target;
        this.applicationContexts = new HashMap<Class<?>, ApplicationContext>();
    }

    public <T> T getBean(Class<T> clazz) {
        T t = null;
        boolean isFind = true;
        for (ApplicationContext context : this.applicationContexts.values()) {
            //ClassPathXmlApplicationContext需要调用 refresh()
            //AnnotationConfigApplicationContext  不能调用 refresh()
            if (context instanceof AbstractRefreshableApplicationContext)
                ((AbstractRefreshableApplicationContext) context).refresh();
            try {
                t = (T) context.getBean(clazz);
            } catch (NoSuchBeanDefinitionException ex) {
                isFind = false;
            }
            if (isFind) break;
        }
        //TODO NoSuchBeanDefinitionException
        return t;
    }

    private static BllUnitRule.TestClassFields getTestClassFields(Class<?> testClass) {
        BllUnitRule.TestClassFields fields = BllUnitRule.fields.get(testClass);
        if (fields == null) {
            fields = new BllUnitRule.TestClassFields(testClass);
            BllUnitRule.fields.put(testClass, fields);
        }
        return fields;
    }

    @Override
    public <T extends ApplicationContext> T getConfigContext(Class<T> clazz) {
        if (!this.applicationContexts.containsKey(clazz)) {
            try {
                this.applicationContexts.put(clazz, (ApplicationContext) Class.forName(clazz.getName()).newInstance());
            } catch (Exception ex) {
                //TODO
            }
        }
        return (T) this.applicationContexts.get(clazz);
    }


    public Class<?> getTestClass() {
        return this.target.getClass();
    }

    public Method getTestMethod() {
        return this.method.getMethod();
    }

    private boolean hasField(Class<?> type) {
        return getField(type) != null;
    }

    private <T> T getField(Class<T> type) {
        return getTestClassFields(getTestClass()).get(type, this.target);
    }

    public List<Throwable> getErrors() {
        return errors;
    }

    public void addError(Throwable e) {
        this.errors.add(e);
    }
}
