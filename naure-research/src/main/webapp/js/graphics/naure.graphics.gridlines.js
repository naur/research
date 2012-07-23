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
    NAURE.Graphics.Gridlines = (function () {

        var config, layout, system, scale, ctx, coordinate, scope, gridsize = {};

        var gridlines = {

            alreadyDrawnPoints:null,

            draw:function (options) {
                if (!ctx) {
                    return;
                }

                gridsize.X = pow(2, 7 - round(lg(scale.X)));
                gridsize.Y = pow(2, 7 - round(lg(scale.Y)));

                var opt = $.extend({}, options);
                var roundingCoordinate = {
                    X1:gridsize.X * ~~(coordinate.X1 / gridsize.X) - gridsize.X,
                    X2:gridsize.X * ~~(coordinate.X2 / gridsize.X) + gridsize.X,
                    Y2:gridsize.Y * ~~(coordinate.Y2 / gridsize.Y) + gridsize.Y,
                    Y1:gridsize.Y * ~~(coordinate.Y1 / gridsize.Y) - gridsize.Y
                };

                //roundingCoordinate = coordinate;

                ctx.font = config.font;
                ctx.fillStyle = "#888";
                /*ctx.shadowColor = "rgba(255,255,255,1.0)";
                 ctx.shadowOffsetX = 0;
                 ctx.shadowOffsetY = 0
                 ctx.shadowBlur = 4;*/

                this.alreadyDrawnPoints = [];
                this.horizontal(roundingCoordinate);
                this.vertical(roundingCoordinate);
            },

            //水平线
            horizontal:function (roundingCoordinate) {
                // 1/ 4 线 [Y 轴 ]
                ctx.strokeStyle = config.minorStyle;
                ctx.lineWidth = 0.1;
                for (var y = roundingCoordinate.Y1; y <= roundingCoordinate.Y2; y += gridsize.Y / 4) {
                    if (y == 0) continue;
                    pixel = layout.toPixelY(y); //new layout.Point(0, y).transformY();
                    ctx.beginPath();
                    ctx.moveTo(0, pixel);
                    ctx.lineTo(layout.width, pixel);
                    ctx.stroke();
                }

                // 1/ 1 线 [Y 轴 ]
                ctx.strokeStyle = config.majorStyle;
                ctx.lineWidth = 0.4;
                for (var y = roundingCoordinate.Y1; y <= roundingCoordinate.Y2; y += gridsize.Y) {
                    if (y == 0) continue;
                    pixel = layout.toPixelY(y); //new layout.Point(0, y).transformY();
                    ctx.beginPath();
                    ctx.moveTo(0, pixel);
                    ctx.lineTo(layout.width, pixel);
                    ctx.stroke();
                }

                //横轴
                ctx.lineWidth = 1;
                ctx.strokeStyle = "black";
                ctx.beginPath();
                ctx.move(roundingCoordinate.X1, 0);
                ctx.line(roundingCoordinate.X2, 0);
                ctx.stroke();

                //垂直线坐标
                ctx.lineWidth = config.lineWidth;
                ctx.textAlign = "right";
                ctx.fillStyle = 'green'
                ctx.textBaseline = "top";
                var labelPixel = {}, labelPixelOffset = {X:-4, Y:4};
                labelPixel.X = layout.toPixelX(0); //new layout.Point(0, 0).transformX();
                if (labelPixel.X <= 0) {
                    ctx.textAlign = "left";
                    labelPixel.X = 0;
                    labelPixelOffset.X = 6;
                }
                if (labelPixel.X >= layout.width) {
                    labelPixel.X = layout.width;
                    labelPixelOffset.X = -6;
                }
                for (var y = roundingCoordinate.Y1; y <= roundingCoordinate.Y2; y += gridsize.Y * 1) {
                    if (y != 0 && this.alreadyDrawnPoints.indexOf(0 + "," + y) == -1) {
                        this.alreadyDrawnPoints.push(0 + "," + y);
                        ctx.beginPath();
                        labelPixel.Y = layout.toPixelY(y); //new layout.Point(0, y).transformY();
                        ctx.arc(labelPixel.X, labelPixel.Y, 2, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.fillText(system.gridlineLabelY(y), labelPixel.X + labelPixelOffset.X, labelPixel.Y + labelPixelOffset.Y);
                    }
                }
            },

            //垂直线
            vertical:function (roundingCoordinate) {
                // 1/ 4 线 [X 轴 ]
                ctx.strokeStyle = config.minorStyle;
                ctx.lineWidth = 0.1;
                for (var x = roundingCoordinate.X1; x <= roundingCoordinate.X2; x += gridsize.X / 4) {
                    if (x == 0) continue;
                    pixel = layout.toPixelX(x); //new layout.Point(x, 0).transformX();
                    ctx.beginPath();
                    ctx.moveTo(pixel, 0);
                    ctx.lineTo(pixel, layout.height);
                    ctx.stroke();
                }

                // 1/ 1 线 [X 轴 ]
                ctx.strokeStyle = config.majorStyle;
                ctx.lineWidth = 0.4;
                for (var x = roundingCoordinate.X1; x <= roundingCoordinate.X2; x += gridsize.X) {
                    if (x == 0) continue;
                    pixel = layout.toPixelX(x); //new layout.Point(x, 0).transformX();
                    ctx.beginPath();
                    ctx.moveTo(pixel, 0);
                    ctx.lineTo(pixel, layout.height);
                    ctx.stroke();
                }

                //纵轴
                ctx.lineWidth = 1;
                ctx.strokeStyle = "black";
                ctx.beginPath();
                ctx.move(0, roundingCoordinate.Y1);
                ctx.line(0, roundingCoordinate.Y2);
                ctx.stroke();

                //水平线坐标
                ctx.lineWidth = config.lineWidth;
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.fillStyle = 'green'
                var labelPixel = {}, labelPixelOffset = {X:4, Y:4};
                labelPixel.Y = layout.toPixelY(0); //layout.Point(0, 0).transformY();
                if (labelPixel.Y <= 0) {
                    labelPixel.Y = 0;
                    labelPixelOffset.Y = 6;
                }
                if (labelPixel.Y >= layout.height) {
                    ctx.textBaseline = "bottom";
                    labelPixel.Y = layout.height;
                    labelPixelOffset.Y = -6;
                }
                for (var x = roundingCoordinate.X1; x <= roundingCoordinate.X2; x += gridsize.X * 1) {
                    if (x != 0 && this.alreadyDrawnPoints.indexOf(x + "," + 0) == -1) {
                        this.alreadyDrawnPoints.push(x + "," + 0);
                        ctx.beginPath();
                        labelPixel.X = layout.toPixelX(x); //layout.Point(x).transformX();
                        ctx.arc(labelPixel.X, labelPixel.Y, 2, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.fillText(system.gridlineLabelX(x), labelPixel.X + labelPixelOffset.X, labelPixel.Y + labelPixelOffset.Y);
                    }
                }
            },

            init:function (options) {
                config = options.config;
                layout = options.layout;
                system = options.system
                ctx = options.ctx;
                scale = layout.scale;
                coordinate = layout.coordinate;
                scope = layout.scope;
                return gridlines;
            }
        };

        return gridlines;
    })();

    return NAURE;
})
;