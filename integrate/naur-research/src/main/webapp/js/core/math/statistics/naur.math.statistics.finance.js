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
             * TODO 去掉内移交易日
             * @param points [{}, {}, {}]
             * @constructor
             */
            RemoveInsideDay: function (points) {
                var prev = null, curr;
                for (var i = 0; i < points.length; i++) {
                    curr = points[i];
                    if (!prev) {
                        prev = curr;
                        continue;
                    }
                    if (curr.high < prev.high) {
                        points[i] = null;
                    }
                }
            },

            /**
             * HighLow
             * @param options {points, high, low, filter}
             * @returns {{high: Array, low: Array, both: Array}}
             * @constructor
             */
            HighLow: function (options) {
                var opt = $.extend({
                    points: null,
                    high: null,
                    low: null,
                    filter: finance.RemoveInsideDay,
                    level: 1 //1,2,3 表示短期、中期、长期
                }, options);

                //数据过滤
                if (!opt.filter) opt.points = opt.filter(opt.points);

                //分类整理
                var highLowArrange = function (points, high, low) {
                    var _t, t = {
                        none: {t1: null, t2: null, t3: null},
                        high: {t1: null, t2: null, t3: null},
                        low: {t1: null, t2: null, t3: null}
                    }, buffer = {high: [], low: [], both: []};
                    if (!low) low = high;

                    var comparer = {
                        high: function (t1, t2, t3) {
                            if (high(t2) > high(t1) && (!t3 || high(t2) > high(t3))) {
                                t2.highLow = {type: 'high', val: high(t2)};
                                buffer.high.push(t2);
                                buffer.both.push(t2);
                            }
                        },
                        low: function (t1, t2, t3) {
                            if (low(t2) < low(t1) && (!t3 || low(t2) < low(t3))) {
                                t2.highLow = {type: 'low', val: low(t2)};
                                buffer.low.push(t2);
                                buffer.both.push(t2);
                            }
                        },
                        none: function (t1, t2, t3) {
                            comparer.high(t1, t2, t3);
                            comparer.low(t1, t2, t3);
                        }
                    };

                    var point, comparerType = 'none'; //默认就用 none 的 t1、t2、y3
                    for (var index in points) {
                        //第一个point

                        point = points[index];

                        if (point.highLow && point.highLow.type) {
                            comparerType = point.highLow.type;
                        }
                        _t = t[comparerType];

                        if (!_t.t1) {
                            _t.t1 = point;
                            continue;
                        }
                        if (!_t.t2) {
                            _t.t2 = point;
                            continue;
                        }
                        _t.t3 = point;

                        comparer[comparerType](_t.t1, _t.t2, _t.t3);

                        _t.t1 = _t.t2;
                        _t.t2 = _t.t3;

                        //最后一个point
                        if (index == points.length - 1) {
                            comparer[comparerType](_t.t1, _t.t2, null);
                        }
                    }
                    return buffer;
                };

                //市场短期高点和低点
                var shortTerm = function () {
                    for (var index in opt.points) {
                        opt.points[index].highLow = null;
                    }
                    return highLowArrange(opt.points, opt.high, opt.low).both;
                };

                //市场中期高点和低点
                var intermediateTerm = function (points) {
                    var val = function (point) {
                        return point.highLow.val;
                    };

                    //从排序
                    for (var index in points) {
                        if (points[index].highLow) points[index].highLow.type = null;
                    }
                    var _points = highLowArrange(points, val).both;

                    //计算次高点和次低点
                    _points = highLowArrange(_points, val).both;

                    return _points;
                };

                //TODO 市场长期高点和低点
                var longTerm = function (points) {
                };

                var result = {};
                if (1 <= opt.level) {
                    result.shortTerm = shortTerm();
                }
                if (2 <= opt.level) {
                    result.intermediateTerm = intermediateTerm(result.shortTerm);
                }
                if (3 <= opt.level) {
                    result.longTerm = longTerm(result.intermediateTerm);
                }

                return result;
            }
        };

        return finance;
    })();

    return NAUR;
});