/*
 * @(#) ListRemoveTest.java 2014-02-20
 *
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.labs.test;


import org.naure.common.patterns.Enable;
import org.naure.research.labs.Sub;

import java.util.ArrayList;
import java.util.List;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-02-20 11:26
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Enable(false)
public class ListRemoveTest extends Sub {
    @Override
    public void execute() throws Exception {
        List<Entity> list = new ArrayList<Entity>();
        for (int i = 1; i < 10; i++) {
            list.add(new Entity(i, "entity:" + i));
        }

        //logger.debug("BEGIN: " + );
    }

    private static class Entity {
        public int id;
        public String name;

        public Entity(int id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}
