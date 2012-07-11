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

define(['jquery', 'naure'], function ($, NAURE) {

    NAURE.Math = (function () {
        var mathutil = {
            arbRound:function (value, roundTo) {
                return Math.round(value / roundTo) * roundTo;
            },

            arbFloor:function (value, roundTo) {
                return Math.floor(value / roundTo) * roundTo;
            },

            //3x3 仿射变换矩阵
//            1     0    0
//            0    1     0
//            1    0    1
            Matrix:function () {
                this.M11 = 1;
                this.M12 = 0;
                this.M21 = 0;
                this.M22 = 1;
                this.OffsetX = 0;
                this.OffsetY = 0;
            }
        }

        return mathutil;
    })();

    return NAURE;

});