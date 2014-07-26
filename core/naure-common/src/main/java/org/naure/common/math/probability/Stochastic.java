package org.naure.common.math.probability;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/6/12
 * Time: 2:24 PM
 * To change this template use File | Settings | File Templates.
 */
public class Stochastic {

    public List uniformDistribution(DistributionInfo info) {
        //opt = extendMap(opt, paramsUniformDistribution);
        List buffer = new ArrayList();
        float u;
        if (null != info.getDistributions()) {
            info.setMax(info.getDistributions().size() - 1);
            info.setFractionDigits(0);
        }

        for (int i = 0; i < info.getN(); i++) {
            u = (float) Math.random() * (info.getMax() - info.getMin()) + info.getMin();
            Object x = String.format("%." + info.getFractionDigits() + "f", u);
            if (null != info.getDistributions() && !info.getDistributions().isEmpty())
                x = info.getDistributions().get(Integer.parseInt(x.toString()));
//            Map val = new HashMap<String, Object>();
//            val.put("index", i);
//            val.put("data", opt.get("data"));
//            val.put("x", x);
//            buffer.add(val);
            buffer.add(x);
        }

        return buffer;
    }

//    public int gaussianDistribution(Map params) {
//        params = extendMap(params, paramsGaussianDistribution);
//    }

    public Map extend(Map map1, Map map2) {
        for (Object obj : map2.keySet()) {
            map1.put(obj, map2.get(obj));
        }
        return map1;
    }

    private final Map paramsUniformDistribution = new HashMap() {{
        put("min", 0);
        put("max", 1);
        put("n", 1);
        put("fractionDigits", 20);
        put("data", null);
        put("success", null);
        put("distributions", null);
    }};
    private final Map paramsGaussianDistribution = new HashMap() {{
        put("n", 1);
        put("distributions", null);
        put("matrix", null);
    }};
}
