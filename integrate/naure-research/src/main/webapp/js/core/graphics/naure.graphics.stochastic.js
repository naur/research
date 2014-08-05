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
    'naure.graphics.ui.js',
    'naure.graphics.layout'], function ($, NAURE) {

    NAURE.Graphics.Stochastic = (function () {

        var stochastic = function () {

            var config, layout, scale, ctx, coordinate;
            var self = this;

            this.gridlineLabelX = function (num) {
                return num.toFixed(3).replace(/\.?0+$/, "")
            };

            this.gridlineLabelY = function (num) {
                return num.toFixed(3).replace(/\.?0+$/, "")
            };

            this.parseCoordinate = function (point) {
                return point;
            };

            this.zoomAxis = function (zoom) {
                if ('horizontal' == config.zoomAxis)
                    zoom.Y = null;
                if ('vertical' == config.zoomAxis)
                    zoom.X = null;
                return zoom
            };

            //expression
            this.Graph = function (n, disabled, color) {
                var equation = n;
                return {
                    plot:function (ctx, coordinate) {
                        if (equation.length <= 0) return;
                        ctx.beginPath();
                        ctx.move(equation[0].X, equation[0].Y);
                        for (var key in equation) {
                            if (!equation.hasOwnProperty(key)) continue
                            ctx.ellipse(equation[key].X, equation[key].Y);
                        }
                        ctx.closePath();
                        ctx.stroke();
                    }
                };
            };

            this.init = function (options) {
                config = options.config;
                layout = options.layout;
                ctx = options.ctx;
                scale = layout.scale;
                coordinate = layout.coordinate;
                coordinate.X1 = -5;
                coordinate.X2 = 5;
                coordinate.Y1 = -5
                coordinate.Y2 = 5;
                return stochastic;
            };
        };

        return stochastic;
    })();

    return NAURE;
});


