/*
 * @(#) RailWay.java 2014-02-27
 *
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.labs.algorithms.asyncj.onetrain;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-02-27 16:54
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class Railway {
    private final int stationCount = 2;
    private final Train train = new Train();
    private final AtomicInteger stationIndex = new AtomicInteger();

    /**
     * 会有多个线程访问这个方法，并等待特定车站上的列车
     *
     * @param stationNo 追踪列车并定义哪个车站接收到了列车
     * @return
     */
    public Train waitTrainOnStation(final int stationNo) {
        while (stationIndex.get() % stationCount != stationNo) {
            //为保证高吞吐量的消息传递，这个是必须的。
            //但在等待列车时它会消耗CPU周期
            Thread.yield();
        }
        return train;
    }

    /**
     * 这个方法通过增加列车的站点索引将这辆列车移到下一站
     */
    public void sendTrain() {
        stationIndex.getAndIncrement();
    }
}
