/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/29/12 4:48 PM
 * Description:
 *
 */

define(['jquery', 'naure', 'naure.math.probability.js'], function ($, NAURE) {

    NAURE.Math.Probability.Stochastic = (function () {

        var matrixes = NAURE.Math.Matrixes;

        var stochastic = {
            //平均分布
            // 默认：产生的伪随机数介于 0 和 1 之间（含 0，不含 1），
            UniformDistribution:function (options) {
                var opt = $.extend({
                    min:0,
                    max:1,
                    n:1,
                    fractionDigits:20, //小数点后的数字位数。其值必须在 0 – 20 之间，包括 0 和 20。
                    data:null,
                    success:null,
                    distributions:null,
                    distributionsFunc:null,
                    distributionsLinked:null  //备用参数
                }, options)

                var u;

                if (opt.min == 0 && opt.max == 1 && opt.distributions) {
                    opt.max = opt.distributions.length - 1;
                    opt.fractionDigits = 0;
                }

                for (var i = 0; i < opt.n; i++) {
                    u = random() * (opt.max - opt.min) + opt.min;
                    var x = (typeof(u) === 'undefined' ? floor(u) : new Number(u.toFixed(opt.fractionDigits)));
                    if (opt.distributions) {
                        if (opt.distributionsFunc)
                            x = opt.distributionsFunc(opt, x);
                        else
                            x = opt.distributions[x];
                    }

                    opt.success({
                        index:i,
                        data:opt.data,
                        x:x
                    });
                }
            },

            //高斯分布  N (0, 1)
            GaussianDistribution:function (options) {
                var opt = $.extend({
                    n:1,
                    success:null,
                    distributions:null,
                    distributionsLinked:null,
                    matrix:null
                }, options)
                var u1 = 0, u2 = 0, s = 0, r = 0, t1, t2;

                if (opt.distributions && !opt.matrix) {
                    //opt.distributionsLinked = stochastic.ProbabilityLinked({min:-3, max:3, distributions:opt.distributions});
                    opt.matrix = matrixes.matrix({X1:-3, X2:3}, {X1:0, X2:opt.distributions.length - 1});
                }

                for (var i = 0; i < opt.n; i++) {
                    s = 0;
                    while (s > 1 || s == 0) {
                        u1 = 2 * random() - 1;
                        u2 = 2 * random() - 1;
                        s = pow(u1, 2) + pow(u2, 2);
                    }

                    r = sqrt(-2 * log(s) / s);
                    var x1 = r * u1;
                    var x2 = r * u2;

                    if (opt.distributions) {
                        t1 = matrixes.transform(opt.matrix, {X:x1});
                        t2 = matrixes.transform(opt.matrix, {X:x2});
                        x1 = opt.distributions[(typeof(t1) === 'undefined' ? floor(t1) : new Number(t1.toFixed(0)))];
                        x2 = opt.distributions[(typeof(t2) === 'undefined' ? floor(t2) : new Number(t2.toFixed(0)))];
//                        x1 = stochastic.ProbabilitySampling(x1, opt.distributionsLinked);
//                        x2 = stochastic.ProbabilitySampling(x2, opt.distributionsLinked);
                        if (typeof(x1) == 'undefined') {
                            var a = 1;
                        }
                    }

                    opt.success({
                        index:i,
                        x1:x1,
                        x2:x1
                    });
                }
            },

            ProbabilityLinked:function (options) {
                var opt = $.extend({
                    min:0,
                    max:1,
                    distributions:null
                }, options);
                var sentinel = {};
                var currentLinked = sentinel;
                var step = (opt.max - opt.min) / opt.distributions.length;
                for (var i = 0; i < opt.distributions.length; i++) {
                    currentLinked.next = {
                        key:opt.min + step * (i + 1),
                        info:opt.distributions[i]
                    };
                    currentLinked = currentLinked.next;
                }
                return sentinel.next;
            },

            ProbabilitySampling:function (x, linked, min, max) {
                if (!min || !max) {
                    min = 0;
                    max = 1;
                }
                x = (x - min) / (max - min);    //默认按照均匀分布的概率抽样
                //对于数组，直接返回值。
                if (Object.prototype.toString.apply(linked) === '[object Array]') {
                    x = (linked.length * x).toFixed(0);
                    return linked[x];
                }
                if (!linked) return x;
                if (x <= linked.key)
                    return linked.info;
                else
                    return arguments.callee(x, linked.next);
            }
        };

        return stochastic;
    })();

    return NAURE;
});