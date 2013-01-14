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

define(['naure.math'], function (NAURE) {

    NAURE.Math.Number = (function () {
        var number = {
            /**
             * Greatest common divisor 最大公约数.
             * 欧几里得算法
             */
            gcd_euclid: function (a, b, callback) {
                if (callback) callback({a: a, b: b});
                if (b == 0) return a;
                else return number.gcd_euclid(b, a % b, callback);
            }
        };

        return number;
    })();

    return NAURE;
});