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
                var equation = n;
                return {
                    plot:function (ctx, coordinate) {
                        if (equation.length <= 0) return;
                        ctx.beginPath();
                        ctx.move(Date.parse(equation[0].X) / 86400000, equation[0].Y1);
                        for (var key in equation) {
                            if (!equation.hasOwnProperty(key)) continue
                            ctx.line(Date.parse(equation[key].X) / 86400000, equation[key].Y1);
                        }
                        ctx.stroke();
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
                    return d.format('yy-MM-dd HH:mm');
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

            zoomAxis:function (zoom) {
                zoom.Y = null;
                return zoom;
            },

            init:function (options) {
                config = options.config;
                layout = options.layout;
                ctx = options.ctx;
                scale = layout.scale;
                coordinate = layout.coordinate;

                coordinate.X1 = floor(Date.parse('2012-01-01') / 86400000);
                coordinate.X2 = ceil(Date.parse('2012-07-24') / 86400000);
                coordinate.Y1 = 8;
                coordinate.Y2 = 15;
                type = 'day';
                return finance;
            }
        };

        return finance;
    })();

    return NAURE;
});