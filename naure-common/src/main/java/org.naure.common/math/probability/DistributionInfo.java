package org.naure.common.math.probability;


import org.naure.common.patterns.Func;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 9/6/12
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */
//
public class DistributionInfo {

    public DistributionInfo() {
    }

    public DistributionInfo(List distributions, int n) {
        this.distributions = distributions;
        this.n = n;
    }

    public DistributionInfo(int n, Func format) {
        this.n = n;
        this.format = format;
    }

    public DistributionInfo(int n) {
        this.n = n;
    }

    public DistributionInfo(String key) {
        this.key = key;
    }

    public List getDistributions() {
        return distributions;
    }

    public void setDistributions(List distributions) {
        this.distributions = distributions;
    }

    public DistributionType getType() {
        return type;
    }

    public void setType(DistributionType type) {
        this.type = type;
    }

    public float[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(float[][] matrix) {
        this.matrix = matrix;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public long getMin() {
        return min;
    }

    public void setMin(long min) {
        this.min = min;
    }

    public long getMax() {
        return max;
    }

    public void setMax(long max) {
        this.max = max;
    }

    public int getFractionDigits() {
        return fractionDigits;
    }

    public void setFractionDigits(int fractionDigits) {
        this.fractionDigits = fractionDigits;
    }

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public Func getFormat() {
        return format;
    }

    public void setFormat(Func format) {
        this.format = format;
    }

    //属性枚举值
    private List distributions;
    //分布算法类型
    private DistributionType type;
    //矩阵
    private float[][] matrix;
    //key, 备用
    private String key;
    //维度
    private long min;
    private long max;
    //小数位，范围 [0， 20）
    private int fractionDigits;
    //数量
    private int n;
    private Func format;
}
