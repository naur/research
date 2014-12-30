package org.naur.common.math.probability;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/6/12
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */
public enum DistributionType {

    UniformDistribution(0), GaussianDistribution(1);

    private int value;

    DistributionType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
