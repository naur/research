/*
 * @(#) RailwayTest.java 2014-02-27
 *
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.research.labs.algorithms.asyncj.onetrain;

import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;

/**
 * <pre>
 * author jiaruizhi
 *
 * 创建日期: 2014-02-27 16:56
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Enable(false)
public class RailwayTest extends Sub {

    @Override
    public void execute() throws Exception {
        final Railway railway = new Railway();

        final long n = 20000000000l;

        //启动一个消费者进程
        new Thread() {
            long lastValue = 0;

            @Override
            public void run() {
                while (lastValue < n) {
                    Train train = railway.waitTrainOnStation(1);
                    int count = train.goodsCount();
                    for (int i = 0; i < count; i++) {
                        lastValue = train.getGoods(i);
                    }
                    railway.sendTrain();
                }
            }
        }.start();

        final long start = System.nanoTime();

        long i = 0;
        while (i < n) {
            Train train = railway.waitTrainOnStation(0);
            int capacity = train.getCapacity();
            for (int j = 0; j < capacity; j++) {
                train.addGoods((int) i++);
            }
            railway.sendTrain();

            if (i % 1000000 == 0) {
                final long duration = System.nanoTime() - start;

                final long ops = (i * 1000L * 1000L * 1000L) / duration;
                System.out.format("ops/sec       = %,d\n", ops);
                System.out.format("trains/sec    = %,d\n", ops / Train.CAPACITY);
                System.out.format("latency nanos = %.3f%n\n", duration / (float) (i) * (float) Train.CAPACITY);
            }
        }
    }
}
