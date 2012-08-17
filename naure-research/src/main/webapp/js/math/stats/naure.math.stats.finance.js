/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/17/12 10:12 AM
 * Description:
 *
 */

define(['jquery', 'naure', 'naure.math.stats'], function ($, NAURE) {

    NAURE.Math.Stats.Finance = (function () {

        var tree = NAURE.Math.Sets.Tree;

        var finance = {
            //移动平均, 又称「移动平均线」简称均线,  MA
            MovingAverage:function () {
                var node1 = new tree.node({key: 1});
                var node2 = new tree.node({key: 2});
            },
            //简单移动平均,  SMA
            //             p1 + p2 + p3 + ... + pn                                      p1      pn+1
            // SMA = --------------------------        SMAt1 = SMAt0 - ---- +  ------
            //                       n                                                         n        n
            SimpleMovingAverage:function (options) {
                var opt = $.extend({
                    p:[],
                    n:1
                }, options);

                var result = [];
                var queue = [];

                for (var index in p) {
                    if (!p.hasOwnProperty(index)) continue;


                }

                return result;
            },
            //加权移动平均  WMA
            WeightedMovingAverage:function () {
            },
            //指数移动平均  EMA 或 EWMA
            ExponentialMovingAverage:function () {

            },

            //随机指标（Stochastic Oscillator，KD）
            StochasticOscillator:function () {
            },

            //未成熟随机值（Raw Stochastic Value，RSV）
            //              Cn - Ln
            //  RSV = ----------- X 100%
            //              Hn -Ln
            // 1. n: 是经过的交易期间（一般订为9日）
            // 2.Cn: 是第n日的收盘价
            // 3. Hn 和 Ln: 分别是过去日内的最高价和最低价，一般以9日为基准。
            RawStochasticValue:function () {
            }
        };

        return finance;
    })();

    return NAURE;
});