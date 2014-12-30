package org.naur.research.labs.feature;


import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 13-5-14
 * Time: 上午10:45
 * To change this template use File | Settings | File Templates.
 */
@Enable(false)
public class JvmOpts extends Sub {
    static int limit = 2 * 1024 * 1024;

    @Override
    public void execute() throws Exception {
        printCurMem();
        waitFor();

        String tmpArray[] = new String[limit];
        printCurMem();
        waitFor();

        for (int i = 0; i < limit; i++) {
            tmpArray[i] = new String("abcde");
        }
        printCurMem();
        waitFor();
    }

    private void printCurMem() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd" + " " + "hh:mm:ss");
        logger.info(format.format(Calendar.getInstance().getTime()));
        //maxMemory() 返回的是java虚拟机（这个进程）能构从操作系统那里挖到的最大的内存，以字节为单位，
        //                  如果在运行java程序的时 候，没有添加-Xmx参数，那么就是64兆，也就是说maxMemory()返回的大约是64*1024*1024字节，这是java虚拟机默认情况下能 从操作系统那里挖到的最大的内存。
        //                  如果添加了-Xmx参数，将以这个参数后面的值为准，例如java -cp you_classpath -Xmx512m your_class，那么最大内存就是512*1024*1024字节。
        logger.info("\tmax memory: " + bitTomega(Runtime.getRuntime().maxMemory()) + " M");
        //totalMemory() 这个方法返回的是java虚拟机现在已经从操作系统那里挖过来的内存大小，也就是java虚拟机这个进程当时所占用的所有 内存。
        //                      如果在运行java的时候没有添加-Xms参数，那么，在java程序运行的过程的，内存总是慢慢的从操作系统那里挖的，基本上是用多少挖多少，直 到挖到maxMemory()为止，所以totalMemory()是慢慢增大的。
        //                      如果用了-Xms参数，程序在启动的时候就会无条件的从操作系统中挖 -Xms后面定义的内存数，然后在这些内存用的差不多的时候，再去挖。
        logger.info("\ttotal memory: " + bitTomega(Runtime.getRuntime().totalMemory()) + " M");
        //freeMemory()  如果在运行java的时候没有添加-Xms参数，那么，在java程序运行的过程的，内存总是慢慢的从操 作系统那里挖的，基本上是用多少挖多少，
        //                      但是java虚拟机100％的情况下是会稍微多挖一点的，这些挖过来而又没有用上的内存，实际上就是 freeMemory()，所以freeMemory()的值一般情况下都是很小的，
        //                      但是如果你在运行java程序的时候使用了-Xms，这个时候因为程 序在启动的时候就会无条件的从操作系统中挖-Xms后面定义的内存数，这个时候，挖过来的内存可能大部分没用上，所以这个时候freeMemory()可 能会有些大。
        logger.info("\tfree memory: " + bitTomega(Runtime.getRuntime().freeMemory()) + " M");
        logger.info("\tuse memory: " + bitTomega(Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) + " M");

        //Runtime.getRuntime().availableProcessors()
    }

    float bitTomega(long bit) {
        return (float) bit / 1024 / 1024;
    }

    void waitFor() {
        try {
            Thread.sleep(5000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
