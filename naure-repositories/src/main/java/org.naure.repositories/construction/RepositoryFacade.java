package org.naure.repositories.construction;

import org.naure.common.patterns.FacadeBase;
import org.naure.common.patterns.IFacadeBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/8/12
 * Time: 10:42 AM
 * To change this template use File | Settings | File Templates.
 */
//提供统一的存储库调用接口
public interface RepositoryFacade<T> {
    <U> List<T> get(U where) throws Exception;
    <U> List<T> getAll(U where) throws Exception;
    T get(int identifier) throws Exception;

    int add(T item) throws Exception;

    boolean delete(int identifier) throws Exception;
    <U> boolean delete(U where) throws Exception;

    int update(T item) throws Exception;
}
