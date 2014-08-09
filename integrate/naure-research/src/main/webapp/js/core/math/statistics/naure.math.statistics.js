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

define(['jquery', 'naure', 'naure.math.sets.tree'], function ($, NAURE) {

    NAURE.Math.Statistics = (function () {
        var statistics = {
            /**
             * 指数平滑法（Exponential Smoothing，ES）
             * 指数平滑法是布朗(Robert G..Brown)所提出，
             *      布朗(Robert G..Brown)认为时间序列的态势具有稳定性或规则性，所以时间序列可被合理地顺势推延；
             *      他认为最近的过去态势，在某种程度上会持续到最近的未来，所以将较大的权数放在最近的资料。
             * 公式：S_t = a * y_t + (1-a) S_{t-1}
             *      St--时间t的平滑值；
             *      yt--时间t的实际值；
             *      St − 1--时间t-1的平滑值；
             *      a--平滑常数，其取值范围为[0,1]；
             */
            exponentialSmoothing: {
                //一次指数平滑法(Single exponential smoothing)
                single: function () {

                }
            }
        };

        return statistics;
    })();

    return NAURE;
});