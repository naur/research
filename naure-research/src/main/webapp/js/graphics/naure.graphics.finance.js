/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/10/12 12:03 PM
 * Description:
 *
 */



define(['jquery', 'naure', 'naure.math', 'naure.graphics', 'naure.graphics.math'], function ($, NAURE) {
    NAURE.Graphics.Finance = (function () {

        var config, layout, scale, ctx, coordinate, type;

        var finance = {

            Graph:function (n, disabled, color) {
                return {
                    plot:function () {
                    }
                };
            },

            Gridline:function () {
                Size: 0
            },

            gridlineLabelX:function (num) {
                var d = new Date(num);
                if (type == 'year')
                    return d.format('YYYY-MM-dd');
                if (type == 'month')
                    return d.format('dd HH:mm');
                if (type == 'date')
                    return d.format('hh:mm:ss');
            },

            gridlineLabelY:function (num) {
                return num.toFixed(3).replace(/\.?0+$/, "")
            },

            init:function (options) {
                config = options.config;
                layout = options.layout;
                ctx = options.ctx;
                scale = layout.scale;
                coordinate = layout.coordinate;
                coordinate.X1 = (new Date().getTime() - 864000000);
                coordinate.X2 = new Date().getTime();
                coordinate.Y1 = -5
                coordinate.Y2 = 5;
                type = 'month';
                return finance;
            }
        };

        return finance;
    })
        ();

    return NAURE;
})
;