/*
 * @(#) Key.java 2015-04-03
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package com.yihaodian.scm.scs.framework.common.patterns;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2015-04-03
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class Key<U, T> {
    private U id;

    private T value;

    public Key(U id, T value) {
        this.id = id;
        this.value = value;
    }

    public U getId() {
        return id;
    }

    public void setId(U id) {
        this.id = id;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof Key && id.equals(((Key) obj).getId());
    }
}
