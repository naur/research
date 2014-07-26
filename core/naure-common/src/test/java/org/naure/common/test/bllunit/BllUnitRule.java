/*
 * @(#) EntityUnitRule.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naure.common.test.bllunit;

import org.junit.internal.runners.model.MultipleFailureException;
import org.junit.rules.MethodRule;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2013-10-11
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class BllUnitRule implements MethodRule {

    //日志
    private final static Logger logger = LoggerFactory.getLogger(BllUnitRule.class);

    //BllUnitRunner
    private static BllUnitRunner runner = new BllUnitRunner();

    //缓存 BllUnitTestContext, 已测试类的测试方法名称为 KEY
    private Map<String, BllUnitTestContext> adapters = new HashMap<String, BllUnitTestContext>();

    //缓存 TestClassFields, 已测试类为 KEY，提供基于字段的配置
    protected static Map<Class<?>, TestClassFields> fields = new HashMap<Class<?>, TestClassFields>();

    /**
     * 根据 Class 获取对应的 Bean
     */
    public <T> T getBean(Class<T> clazz) {
        for (StackTraceElement element : new Throwable().getStackTrace()) {
            if (adapters.containsKey(element.getMethodName())) {
                return ((BllUnitTestContextAdapter) adapters.get(element.getMethodName())).getBean(clazz);
            }
        }
        return null;
    }

    @Override
    public Statement apply(Statement base, FrameworkMethod method, Object target) {
        BllUnitTestContextAdapter adapter = new BllUnitTestContextAdapter(method, target);
        adapters.put(method.getName(), adapter);
        return new BllUnitStatement(adapter, base);
    }

    //查询缓存的 Class 字段
    private static TestClassFields getTestClassFields(Class<?> testClass) {
        TestClassFields fields = BllUnitRule.fields.get(testClass);
        if (fields == null) {
            fields = new TestClassFields(testClass);
            BllUnitRule.fields.put(testClass, fields);
        }
        return fields;
    }

    //封装 [annotation]  和单元测试的调度
    private class BllUnitStatement extends Statement {

        private Statement nextStatement;
        private BllUnitTestContextAdapter testContext;

        public BllUnitStatement(BllUnitTestContextAdapter testContext, Statement nextStatement) {
            this.testContext = testContext;
            this.nextStatement = nextStatement;
        }

        //运行 [annotation]  进行初始化和执行单元测试方法
        @Override
        public void evaluate() throws Throwable {
            runner.beforeTestMethod(this.testContext);
            try {
                this.nextStatement.evaluate();
            } catch (Throwable e) {
                this.testContext.addError(e);
            }
            runner.afterTestMethod(this.testContext);

            if (!this.testContext.getErrors().isEmpty())
                throw new MultipleFailureException(this.testContext.getErrors());
        }
    }

    /**
     * 封装读取 Class 字段的方法
     */
    protected static class TestClassFields {

        private Map<Class<?>, Set<Field>> fieldMap = new HashMap<Class<?>, Set<Field>>();

        private Class<?> testClass;

        public TestClassFields(Class<?> testClass) {
            this.testClass = testClass;
        }

        private Set<Field> getFields(final Class<?> type) {
            if (this.fieldMap.containsKey(type)) {
                return this.fieldMap.get(type);
            }
            final Set<Field> fields = new HashSet<Field>();
            ReflectionUtils.doWithFields(this.testClass, new ReflectionUtils.FieldCallback() {
                public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
                    if (type.isAssignableFrom(field.getType())) {
                        field.setAccessible(true);
                        fields.add(field);
                    }
                }
            });
            this.fieldMap.put(type, fields);
            return fields;
        }

        @SuppressWarnings("unchecked")
        public <T> T get(Class<T> type, Object obj) {
            Set<Field> fields = getFields(type);
            switch (fields.size()) {
                case 0:
                    return null;
                case 1:
                    try {
                        return (T) fields.iterator().next().get(obj);
                    } catch (Exception e) {
                        throw new IllegalStateException("Unable to read field of type " + type.getName() + " from "
                                + this.testClass, e);
                    }
            }
            throw new IllegalStateException("Unable to read a single value from multiple fields of type "
                    + type.getName() + " from " + this.testClass);
        }
    }
}
