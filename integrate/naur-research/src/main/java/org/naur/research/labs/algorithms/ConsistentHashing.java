package org.naur.research.labs.algorithms;

import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;

import java.util.ArrayList;
import java.util.List;

/**
 * 一致 hash 算法
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 13-4-27
 * Time: 上午10:40
 * To change this template use File | Settings | File Templates.
 */
@Enable(false)
public class ConsistentHashing extends Sub {
    @Override
    public void execute() throws Exception {
        List<Item> list = new ArrayList<Item>();
        list.add(new Item());
        list.add(new Item());
        list.add(new Item());
        list.add(new Item());
        list.add(new Item());
        list.add(new Item());
        String a = list.toString();
        String b = list.toArray().toString();
    }

    public class Item {
        private String a;
        private Integer b;

        public String getA() {
            return a;
        }

        public void setA(String a) {
            this.a = a;
        }

        public Integer getB() {
            return b;
        }

        public void setB(Integer b) {
            this.b = b;
        }

        @Override
        public String toString() {
            return "aa";
        }
    }
}
