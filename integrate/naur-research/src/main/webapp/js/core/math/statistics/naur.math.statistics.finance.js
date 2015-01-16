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

define(['jquery', 'naur.math.structures', 'naur.math.statistics'], function ($, NAUR) {

    NAUR.Math.Statistics.Finance = (function () {

        var tree = NAUR.Math.Sets.Tree;
        var statistics = NAUR.Math.Statistics;
        var structures = NAUR.Math.Structures;

//        //今开盘 最高价 最低价 收盘价 结算价
//        private double open;
//        private double high;
//        private double low;
//        private double close;
//        private double settle;
//
//        // 【成交量、持仓量：手（按单边计算） 】
//        // 【成交额：万元（按单边计算）】
//        private double volume;  //成交量

        var finance = {
            Quote: function (d, o, h, l, c, v) {
                this.o = o;  //今开盘
                this.h = h;  //最高价
                this.l = l;  //最低价
                this.c = c; //收盘价
                this.v = v; //成交量
                this.s = 0; //结算价 settle
                this.t = 0; //成交额 turnover
                this.d = d; //date
            },

            /**
             * 移动平均, 又称「移动平均线」简称均线,  MA
             */
            MovingAverage: function () {
                var node1 = new structures.node({key: 1});
                var node2 = new structures.node({key: 2});
            },

            /**
             * 简单移动平均,  SMA
             *             p1 + p2 + p3 + ... + pn                                      p1      pn+1
             *  SMA = --------------------------        SMAt1 = SMAt0 - ---- +  ------
             *                        n                                                         n        n
             * @param options
             * @returns {Array}
             * @constructor
             */
            SimpleMovingAverage: function (options) {
                var opt = $.extend({
                    p: [],
                    n: 1
                }, options);

                var result = [];
                var queue = [];

                for (var index in p) {
                    if (!p.hasOwnProperty(index)) continue;
                }

                var node;
                for (var i = 1; i < n; i++) {
                    if (node)
                        node = new structures.node({
                            type: 4, info: '+',
                            left: new structures.node(),
                            right: new structures.node()
                        }); else
                        node.right = new structures.node();
                }

                return result;
            },

            /**
             * 加权移动平均  WMA
             */
            WeightedMovingAverage: function () {
            },

            /**
             * 指数移动平均  EMA 或 EWMA
             */
            ExponentialMovingAverage: function () {

            },

            /**
             * 随机指标（Stochastic Oscillator，KD）
             */
            StochasticOscillator: function () {
            },

            /**
             * 未成熟随机值（Raw Stochastic Value，RSV）
             *               Cn - Ln
             *  RSV = ----------- X 100%
             *               Hn -Ln
             *  1. n: 是经过的交易期间（一般订为9日）
             *  2.Cn: 是第n日的收盘价
             *  3. Hn 和 Ln: 分别是过去日内的最高价和最低价，一般以9日为基准。
             * @constructor
             */
            RawStochasticValue: function () {
            },

            /**
             * Accumulation/Distribution Line  累积/派发线
             *      (收盘价 - 最低价) - (最高价 - 收盘价)
             *    --------------------------------------------- X 成交量
             *                (最高价 - 最低价)
             * @param options
             * @constructor
             */
            AccumulationDistributionLine: function (options) {
                var opt = options;
                var quote = opt.quotes[opt.linked.next];
                if (null == quote) return;

                var o = quote.o;
                var h = quote.h;
                var l = quote.l;
                var c = quote.c;
                var v = quote.v;

                if (opt.result) {
                    if (0 != h - l)
                        opt.linked.prev += (((c - l) - (h - c)) / (h - l) * v);
                    opt.result({value: opt.linked.prev, date: quote.d});
                }

                opt.linked.next += 1;
                if (opt.linked.next < opt.quotes.length)
                    arguments.callee(opt)
            },

            /**
             * Accumulation Swing Index 累积摆动指标
             *  = 前期累积摆动指标 + 摆动指标
             */
            AccoumulationSwingIndex: function () {
            },

            /**
             * Advance/Decline Line 上涨/下跌线
             */
            AdvanceDeclineLine: function () {
            },

            /**
             *SupInfLine
             * @param points  [{}, {}, {}]
             */
            SupInfLine: function (points, sup, inf) {
                var buffer = {sup: [], inf: []}, t1, t2, t3;
                for (var point in points) {
                    if (!t1) {
                        t1 = points[point];
                        continue;
                    }
                    if (!t2) {
                        t2 = points[point];
                        continue;
                    }
                    t3 = points[point];
                    if (sup(t2) > sup(t1) && sup(t2) > sup(t3)) {
                        buffer.sup.push(t2);
                    } else if (inf(t2) < inf(t1) && inf(t2) < inf(t3)) {
                        buffer.inf.push(t2);
                    }
                    t1 = t2;
                    t2 = t3;
                }
                return buffer;
            }
        };

        return finance;
    })();

    return NAUR;
});