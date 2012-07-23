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
                var d = finance.parseCoordinate({X:num, Y:0}).X;
                if (type == 'year')
                    return d.format('yyyy-MM-dd');
                if (type == 'month')
                    return d.format('dd HH:mm');
                if (type == 'date')
                    return d.format('hh:mm:ss');
                if (type == 'day')
                    return d.format('MM-dd HH:mm');
            },

            gridlineLabelY:function (num) {
                return num.toFixed(3).replace(/\.?0+$/, "")
            },

            parseCoordinate:function (point) {
                return {
                    X:new Date(point.X * 86400000 + new Date().getTimezoneOffset() * MinMilli),
                    Y:point.Y
                };
            },

            zoomAxis: function(zoom) {
                zoom.Y = null;
                return zoom;
            },

            init:function (options) {
                config = options.config;
                layout = options.layout;
                ctx = options.ctx;
                scale = layout.scale;
                coordinate = layout.coordinate;

                coordinate.X1 = floor(new Date(2012, 3, 24).getTime() / 86400000);
                coordinate.X2 = ceil(new Date(2012, 6, 23).getTime() / 86400000);
                coordinate.Y1 = -5
                coordinate.Y2 = 5;
                type = 'day';
                return finance;
            }
        };

        return finance;
    })
        ();

    return NAURE;
})
;