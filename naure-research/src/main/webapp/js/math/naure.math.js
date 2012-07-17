/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/4/12 10:56 AM
 * Description:
 *
 */

define(['jquery', 'naure', 'math'], function ($, NAURE) {

    NAURE.Math = (function () {
        var math = {
            arbRound:function (value, roundTo) {
                return Math.round(value / roundTo) * roundTo;
            },

            arbFloor:function (value, roundTo) {
                return Math.floor(value / roundTo) * roundTo;
            }
        };

        return math;
    })();

    return NAURE;

});