/*
 * @(#) EntityUnitRule.java 2013-10-11
 * 
 * Copy Right@ 纽海信息技术有限公司
 */

package org.naur.common.test.bllunit;

import org.naur.common.test.bllunit.annotation.BllAfter;
import org.naur.common.test.bllunit.annotation.BllBefore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.util.Assert;

import java.lang.annotation.Annotation;
import java.util.*;

/**
 * <pre>
 * author jiaruizhi
 *
 * 封装解析 Class 和 Method  上的 [annotation]
 * 和 提供 beforeTestMethod 和 afterTestMethod 逻辑
 *
 * 创建日期: 2013-10-11
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class BllUnitRunner {

    //日志
    private static final Logger logger = LoggerFactory.getLogger(BllUnitRunner.class);

    /**
     * beforeTestMethod
     */
    public void beforeTestMethod(BllUnitTestContext testContext) throws Exception {
        beforeOrAfter(testContext, true, AnnotationAttributes.get(
                        getAnnotations(testContext, BllBefore.class))
        );
    }

    /**
     * afterTestMethod
     */
    public void afterTestMethod(BllUnitTestContext testContext) throws Exception {
        try {
            Collection<BllAfter> annotations = getAnnotations(testContext, BllAfter.class);
            beforeOrAfter(testContext, false, AnnotationAttributes.get(annotations));
        } catch (RuntimeException e) {
            testContext.addError(e);
            if (logger.isWarnEnabled()) {
                logger.warn("Unable to throw BllAfter exception due to existing test error", e);
            }
        }
    }

    private void beforeOrAfter(BllUnitTestContext testContext, boolean isBefore,
                               Collection<AnnotationAttributes> annotations) throws Exception {
        List<String> str = new ArrayList<String>();
        for (AnnotationAttributes annotation : annotations) {
            str.addAll(Arrays.asList(annotation.getXml()));
            //register BllBefore.config 指定的 Configuration
            if (annotation.getConfig().length > 0) {
                testContext.getConfigContext(AnnotationConfigApplicationContext.class).register(annotation.getConfig());
                testContext.getConfigContext(AnnotationConfigApplicationContext.class).refresh();

                if (logger.isDebugEnabled()) {
                    logger.debug("Executing " + (isBefore ? "Before" : "After") + " of @BllUnitTest " + " on " + annotation.getConfig());
                }
            }
        }
        //register BllBefore.xml 指定的 Configuration
        if (!str.isEmpty()) {
            testContext.getConfigContext(ClassPathXmlApplicationContext.class).setConfigLocations(str.toArray(new String[0]));
            if (logger.isDebugEnabled()) {
                logger.debug("Executing " + (isBefore ? "Before" : "After") + " of @BllUnitTest " + " on " + str);
            }
        }
    }

    //收集 BllBefore 和 BllAfter 的注解信息
    private <T extends Annotation> Collection<T> getAnnotations(BllUnitTestContext
                                                                        testContext, Class<T> annotationType) {
        List<T> annotations = new ArrayList<T>();
        //获取 Class 上的 [annotation]
        addAnnotationToList(annotations, AnnotationUtils.findAnnotation(testContext.getTestClass(), annotationType));
        //获取 Method 上的 [annotation]
        addAnnotationToList(annotations, AnnotationUtils.findAnnotation(testContext.getTestMethod(), annotationType));
        return annotations;
    }

    private <T extends Annotation> void addAnnotationToList(List<T> annotations, T annotation) {
        if (annotation != null) {
            annotations.add(annotation);
        }
    }

    // 解析、封装 [BllBefore、BllAfter] 的值
    private static class AnnotationAttributes {

        //通过注解配置的 xml 值
        private String[] xml;

        //通过注解配置的 json 值
        private String[] json;

        //通过注解配置的 ini 值
        private String[] ini;

        //通过注解配置的 config 值
        private Class<?>[] config;

        public AnnotationAttributes(Annotation annotation) {
            Assert.state((annotation instanceof BllBefore) || (annotation instanceof BllAfter),
                    "Only BllBefore and BllAfter annotations are supported");
            Map<String, Object> attributes = AnnotationUtils.getAnnotationAttributes(annotation);
            this.xml = (String[]) attributes.get("xml");
            this.json = (String[]) attributes.get("json");
            this.ini = (String[]) attributes.get("ini");
            this.config = (Class<?>[]) attributes.get("config");
        }

        /**
         * 返回封装的 AnnotationAttributes  集合
         */
        public static <T extends Annotation> Collection<AnnotationAttributes> get(Collection<T> annotations) {
            List<AnnotationAttributes> annotationAttributes = new ArrayList<AnnotationAttributes>();
            for (T annotation : annotations) {
                annotationAttributes.add(new AnnotationAttributes(annotation));
            }
            return annotationAttributes;
        }

        public String[] getXml() {
            return this.xml;
        }

        public String[] getjson() {
            return this.json;
        }

        public String[] getIni() {
            return this.ini;
        }

        public Class<?>[] getConfig() {
            return this.config;
        }
    }
}
