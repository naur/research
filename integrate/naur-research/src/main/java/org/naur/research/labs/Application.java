package org.naur.research.labs;

import org.naur.common.patterns.Enable;
import org.naur.common.patterns.Func;
import org.naur.common.util.EnumerableUtils;
import org.naur.common.util.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 2/23/13
 * Time: 10:35 AM
 * To change this template use File | Settings | File Templates.
 */
public class Application {

    private final static Logger logger = LoggerFactory.getLogger(Application.class);

    //private static String[] packageNames = PropertiesUtils.getProperty("packageNames").split(",");

    /**
     * 加载 labs 里的 class
     *
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        classLoader = Thread.currentThread().getContextClassLoader();

        //substring(1): 排除开始的 [/] 字符    --       [file:/D:/Research/projects/jlabs/target/classes/]
        final String classPath = classLoader.getResource("").getPath().replace("/", "\\").substring(1);
        List<String> classNames = FileUtil.getFiles(classPath + "org\\naur\\research\\labs", new Func<File, String>() {
            @Override
            public String execute(File file) {
                if (!".class".equals(FileUtil.fileType(file.getPath()))) return null;
                if ("Application.class".equals(FileUtil.fileType(file.getPath()))) return null;
                if ("Sub.class".equals(FileUtil.fileType(file.getPath()))) return null;

                //去掉 .class，格式化为[labs.feature.JLoad]
                return file.getPath().replace(".class", "").replace(classPath, "").replace("\\", ".");
            }
        });
        List<Class> classes = EnumerableUtils.select(classNames, loadClass);

        Sub sub = null;
        for (Class cla : classes) {
            try {
                sub = (Sub) cla.newInstance();
                sub.execute();
            } catch (Exception ex) {
                logger.error("ERROR", ex);
            }
        }

        logger.debug("___________complete___________");
        //System.exit(0);
    }

    private static Func<String, Class> loadClass = new Func<String, Class>() {
        @Override
        public Class execute(String className) {
            try {
                //example: [labs.feature.JLoad]
                Class clazz = classLoader.loadClass(className);
                if (Sub.class.isAssignableFrom(clazz) && null != clazz.getAnnotation(Enable.class) && ((Enable) clazz.getAnnotation(Enable.class)).value()) {
                    Enable enable = clazz.getMethod("execute").getAnnotation(Enable.class);
                    if (null == enable || enable.value()) {
                        return clazz;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
    };

    private static ClassLoader classLoader;
}