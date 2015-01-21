/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yhd.com
 * Date:
 *              2015/1/21 13:25
 * Description:
 *
 */

//初始化 NIL;
var NIL = null;
var MinMilli = 1000 * 60;
var HrMilli = MinMilli * 60;
var DyMilli = HrMilli * 24;
var WkMilli = DyMilli * 7;

+function () {
    if (typeof define === 'function') {
        define(['naur'], function (NAUR) {
            return NAUR;
        });
    }
}();