/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              13-1-14 下午2:31
 * Description:
 *
 */

define(['naur.math'], function (NAUR) {

    NAUR.Math.Number = (function () {
        var number = {
            /**
             * Greatest common divisor 最大公约数.
             * 欧几里得算法
             */
            gcd_euclid: function (a, b, callback) {
                if (callback) callback({a: a, b: b});
                if (b == 0) return a;
                else return arguments.callee(b, a % b, callback);
            },
            /**
             * 欧几里得算法 扩展 ( d = gcd(a, b) = ax + by )
             * 输入为一对非负数，返回一个满足上式的三元组（d, x, y）.
             */
            gcd_euclid_extended: function (a, b, callback) {
                if (callback) callback({a: a, b: b});
                if (b == 0)
                    return {a: a, b: b, d: a, x: 1, y: 0};
                else {
                    var _ = arguments.callee(b, a % b, callback)
                    return {
                        a: _.a,
                        b: _.b,
                        d: _.d,
                        x: _.y,
                        y: _.x - floor(_.a / _.b) * _.y
                    };
                }
            }
        };

        return number;
    })();

    return NAUR;
});