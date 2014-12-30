package org.naur.research.labs.database;

import org.jrobin.core.*;
import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;

import java.util.Calendar;

/**
 * Created by jiaruizhi on 13-5-29.
 */
@Enable(false)
public class JRrd extends Sub {
    @Override
    public void execute() throws Exception {
        long timestamp = Calendar.getInstance().getTimeInMillis();
        RrdDef rrdDef = new RrdDef(rrdPath + rrdName, timestamp - 1, 300);
        rrdDef.addDatasource(new DsDef("input", DsTypes.DT_COUNTER, 600, 0, Double.NaN));
        rrdDef.addDatasource(new DsDef("output", DsTypes.DT_COUNTER, 600, 0, Double.NaN));

        rrdDef.addArchive("AVERAGE", 0.5, 1, 600);
        rrdDef.addArchive("AVERAGE", 0.5, 6, 700);
        rrdDef.addArchive("AVERAGE", 0.5, 24, 797);
        rrdDef.addArchive("AVERAGE", 0.5, 288, 775);
        rrdDef.addArchive("MAX", 0.5, 1, 600);
        rrdDef.addArchive("MAX", 0.5, 6, 700);
        rrdDef.addArchive("MAX", 0.5, 24, 797);
        rrdDef.addArchive("MAX", 0.5, 288, 775);

        rrdDef.exportXmlTemplate(rrdPath + rrdName + "_template.xml");

        logger.info("[RrdDef Template  export xml success]");


        RrdDbPool pool = RrdDbPool.getInstance();
        String rrdPath = "D:\\test.rrd";

        for (int i = 0; i < 10000; i++) {
            RrdDb rrd = pool.requestRrdDb(rrdPath);
            Sample sample = rrd.createSample(timestamp);
            sample.setValue("input", i);
            sample.setValue("output", i);
            sample.update();
            pool.release(rrd);
            timestamp += 2000;
        }
    }

    private String rrdPath = "d://rrd//";
    private String rrdName = "gps.rrd";
}
