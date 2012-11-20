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



define(['jquery', 'naure', 'naure.math',
    'naure.graphics.ui',
    'naure.graphics.layout'], function ($, NAURE) {

    NAURE.Graphics.Finance = (function () {

        var finance = function () {

            var config, layout, scale, ctx, coordinate, type;

            this.Graph = function (n, disabled, color) {
                var equation = n;
                return {
                    plot: function (ctx, coordinate) {
                        if (equation.length <= 0) return;
                        ctx.beginPath();
                        ctx.move(Date.parse(equation[0].X) / 86400000, equation[0].Y.v ? equation[0].Y.v : equation[0].Y.c);
                        for (var key in equation) {
                            if (!equation.hasOwnProperty(key)) continue
                            ctx.line(Date.parse(equation[key].X) / 86400000, equation[key].Y.v ? equation[key].Y.v : equation[key].Y.c);
                        }
                        ctx.stroke();
                    }
                };
            };

//            Gridline:function () {
//                Size: 0
//            };

            this.gridlineLabelX = function (num) {
                var d = this.parseCoordinate({X: num, Y: 0}).X;
                if (type == 'year')
                    return d.format('yyyy-MM-dd');
                if (type == 'month')
                    return d.format('dd HH:mm');
                if (type == 'date')
                    return d.format('hh:mm:ss');
                if (type == 'day')
                    return d.format('yy-MM-dd HH:mm');
            };

            this.gridlineLabelY = function (num) {
                return num.toFixed(3).replace(/\.?0+$/, "")
            };

            this.parseCoordinate = function (point) {
                return {
                    X: new Date(point.X * 86400000 + new Date().getTimezoneOffset() * MinMilli),
                    Y: point.Y
                };
            };

            this.zoomAxis = function (zoom) {
                //zoomAxis: 'both',  //horizontal, vertical,
                if ('horizontal' == config.zoomAxis)
                    zoom.Y = null;
                if ('vertical' == config.zoomAxis)
                    zoom.X = null;
                return zoom;
            };

            this.init = function (options) {
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