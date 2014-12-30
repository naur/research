package org.naur.research.labs.feature;


import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 13-3-1
 * Time: 下午4:38
 * To change this template use File | Settings | File Templates.
 */

@Enable(false)
public class JLoad extends Sub {
    /**
     *  打印 ClassLoader
     *  JVM规范定义了两种类型的类装载器：
     *          启动内装载器(bootstrap)
     *          用户自定义装载器(user-defined class loader)。
     *  JVM在运行时会产生三个ClassLoader：
     *          Bootstrap ClassLoader、
     *          Extension ClassLoader和
     *          AppClassLoader
     *          其中，Bootstrap是用C++编写的，我们在Java中看不到它，是null。它用来加载核心类库
     *  三者的关系为:AppClassLoader的Parent是ExtClassLoader，而ExtClassLoader的Parent为BootstrapClassLoader。
     * @throws Exception
     */
    @Override
    public void execute() throws Exception {
        logger.info(format(1, "Java Loader Tree."));
        //ClassLoaderTree
        ClassLoader loader = JLoad.class.getClassLoader();
        while (loader != null) {
            logger.info(loader.toString());
            loader = loader.getParent();
        }

        //TODO Class.forName (http://www.cnblogs.com/wjkaola123/archive/2009/11/23/1609119.html)
        logger.info(format(1, "End"));
    }


    /**
     *用户自定义 user-defined class loader
     */
    public class CustomClassLoader extends ClassLoader {
        private String rootDir;

        public CustomClassLoader(String rootDir) {
            this.rootDir = rootDir;
        }

        /**
         *真正完成类的加载工作是通过调用 defineClass来实现的；
         * 而启动类的加载过程是通过调用 loadClass来实现的。
         * 前者称为一个类的定义加载器（defining loader），后者称为初始加载器（initiating loader）。
         * 在 Java 虚拟机判断两个类是否相同的时候，使用的是类的定义加载器。
         * 也就是说，哪个类加载器启动类的加载过程并不重要，重要的是最终定义这个类的加载器。
         * 两种类加载器的关联之处在于：一个类的定义加载器是它引用的其它类的初始加载器。
         * 如类 com.example.Outer引用了类 com.example.Inner，则由类 com.example.Outer的定义加载器负责启动类 com.example.Inner的加载过程。
         * 方法 loadClass()抛出的是 java.lang.ClassNotFoundException异常；方法 defineClass()抛出的是 java.lang.NoClassDefFoundError异常。
         * TODO http://blog.csdn.net/iceman1952/article/details/1523025
         * TODO loadClass: 启动类的加载过程
         * TODO defineClass: 真正完成类的加载工作
         */
        protected Class<?> findClass(String name) throws ClassNotFoundException {
            byte[] classData = getClassData(name);
            if (classData == null) {
                throw new ClassNotFoundException();
            } else {
                return defineClass(name, classData, 0, classData.length);
            }
        }

        private byte[] getClassData(String className) {
            String path = classNameToPath(className);
            try {
                InputStream ins = new FileInputStream(path);
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                int bufferSize = 4096;
                byte[] buffer = new byte[bufferSize];
                int bytesNumRead = 0;
                while ((bytesNumRead = ins.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesNumRead);
                }
                return baos.toByteArray();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }

        private String classNameToPath(String className) {
            return rootDir + File.separatorChar +
                    className.replace('.', File.separatorChar) + ".class";
        }
    }
}
