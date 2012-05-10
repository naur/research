package org.naure.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/10/12
 * Time: 9:46 AM
 * To change this template use File | Settings | File Templates.
 */
public abstract class Repository {
    @Autowired
    @Qualifier("mongoWorkspace")
    protected Workspace workspace;
}
