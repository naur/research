/*
 * @(#) Train.java 2014-02-27
 *
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.research.labs.algorithms.asyncj.onetrain;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-02-27 16:51
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class Train {

    public static int CAPACITY = 2 * 1024;

    // 传输运输货物的数组
    private final long[] goodsArray = new long[CAPACITY];

    private int index;

    //返回货物数量
    public int goodsCount() {
        return index;
    }

    //向列车中添加条目
    public void addGoods(long i) {
        goodsArray[index++] = i;
    }

    //从列车中移走条目
    public long getGoods(int i) {
        index--;
        return goodsArray[i];
    }

    public int getCapacity() {
        return CAPACITY;
    }
}
