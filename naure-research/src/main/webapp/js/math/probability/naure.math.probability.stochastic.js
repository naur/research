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

define(['jquery', 'naure', 'naure.math.probability'], function ($, NAURE) {

    NAURE.Math.Probability.Stochastic = (function () {
        var stochastic = {
            //高斯分布  N (0, 1)
            GaussianDistribution:function (options) {
                var opt = $.extend({
                    n:1,
                    distributions:null,
                    success:null
                }, options)
                var u1 = 0, u2 = 0, s = 0, r = 0, distributionsLinked = null;
                if (opt.distributions) {
                    distributionsLinked = stochastic.ProbabilityLinked({min:-3, max:3, distributions:opt.distributions});
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
                        x1 = stochastic.ProbabilitySampling(x1, distributionsLinked);
                        x2 = stochastic.ProbabilitySampling(x2, distributionsLinked);
                    }

                    opt.success({
                        index:i,
                        x1:x1,
                        x2:x1
                    });
                }
            },

            //平均分布
            // 默认：产生的伪随机数介于 0 和 1 之间（含 0，不含 1），
            UniformDistribution:function (options) {
                var opt = $.extend({
                    min:0,
                    max:1,
                    n:1,
                    fractionDigits:20, //小数点后的数字位数。其值必须在 0 – 20 之间，包括 0 和 20。
                    success:null,
                    distributions:null
                }, options)

                var distributionsLinked = null, u;

                if (opt.distributions) {
                    distributionsLinked = stochastic.ProbabilityLinked({distributions:opt.distributions});
                }

                for (var i = 0; i < opt.n; i++) {
                    u = random() * (opt.max - opt.min) + opt.min;
                    var x = typeof u === 'undefined' ? floor(u) : new Number(u.toFixed(opt.fractionDigits));
                    if (opt.distributions)
                        x = stochastic.ProbabilitySampling((x - opt.min) / (opt.max - opt.min), distributionsLinked);

                    opt.success({
                        index:i,
                        x:x
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

            ProbabilitySampling:function (x, linked) {
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