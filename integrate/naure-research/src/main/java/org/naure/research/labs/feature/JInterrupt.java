package org.naure.research.labs.feature;


import org.naure.common.patterns.Enable;
import org.naure.research.labs.Sub;

import java.util.Random;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 13-5-22
 * Time: 上午11:33
 * To change this template use File | Settings | File Templates.
 */
@Enable(false)
public class JInterrupt extends Sub {

    @Override
    public void execute() throws Exception {
        final int[] array = new int[8000];
        Random random = new Random();
        for (int i = 0; i < array.length; i++) {
            array[i] = random.nextInt(i + 1);
        }

        Thread thread = new Thread() {
            public void run() {
                try {
                    logger.info(String.valueOf(sort(array)));
                    logger.info(array.toString());
                } catch (Error err) {
                    err.printStackTrace();
                }
            }
        };

        thread.start();
        //TimeUnit.SECONDS.sleep(1);
        logger.info("go to stop thread");
        thread.interrupt();
        logger.info("finish main");
    }

    private int sort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            for (int j = 0; j < array.length - i - 1; j++) {
                if (array[j] < array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
                logger.info(String.valueOf(i) + "-" + String.valueOf(j));
            }
        }
        return array[0];
    }
}
