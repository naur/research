package org.naure.common.patterns;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/*
* @author Liusheng
* 实现“委托”模式，用户需要实现InvocationHandler接口；
* 参考：http://www.uml.org.cn/j2ee/200411036.htm
*/
public abstract class DelegatorBak implements InvocationHandler {
    //RelegateTo针对每个对象都要生成一个实例，因而非Static的log，代价比较高。
    //protected Log _log = LogFactory.getLog(this.getClass());
    //private static Log _log = LogFactory.getLog(RelegateTo.class);
    //--------------------------------------------
    protected Object obj_orgin = null;  //原始对象
    protected Object obj_proxy = null;  //代理对象

    //--------------------------------------------
    public DelegatorBak() {
        //空
    }

    public DelegatorBak(Object orgin) {
        this.createProxy(orgin);
    }

    //--------------------------------------------
    protected Object createProxy(Object orgin) {
        obj_orgin = orgin;
        obj_proxy = Proxy.newProxyInstance(
                orgin.getClass().getClassLoader(),  //加载器
                orgin.getClass().getInterfaces(),   //接口集
                this);  //委托
        //_log.debug("# 委托代理："+obj_proxy);
        return obj_proxy;
    }

    protected Object invokeSuper(Method method, Object[] args)
            throws Throwable {
        return method.invoke(obj_orgin, args);
    }

    //--------------实现InvocationHandler接口，要求覆盖------------
    public Object invoke(Object obj, Method method, Object[] args)
            throws Throwable {
        // 缺省实现：委托给obj_orgin完成对应的操作
        if (method.getName().equals("toString")) {  //对其做额外处理
            return this.invokeSuper(method, args) + "$Proxy";
        } else {     //注意，调用原始对象的方法，而不是代理的（obj==obj_proxy）
            return this.invokeSuper(method, args);
        }
    }
}