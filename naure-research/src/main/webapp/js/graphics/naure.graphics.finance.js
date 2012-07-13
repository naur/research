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



define(['jquery', 'naure', 'naure.math', 'naure.graphics', 'naure.graphics.math', 'math'], function ($, NAURE) {
    NAURE.Graphics.Finance = (function () {
        var finance = {

            Graph:function (n, disabled, color) {
                return {
                    plot:function () {
                    }
                };
            },

            Gridline: function() {
                Size: 0
            },

            gridlines:function (options) {
                var opt = $.extend({}, options);
                //they can be accidentially changed
                e = Math.E;
                pi = Math.PI;
                ctx = coordinate.ctx;

                if (!ctx) {
                    return;
                }

                scale = coordinate.scale;

                //This can probably be simplified a bit
                rmax = Math.sqrt(Math.max(coordinate.X1 * coordinate.X1 + coordinate.Y1 * coordinate.Y1, coordinate.Y1 * coordinate.Y1 + coordinate.X2 * coordinate.X2, coordinate.X2 * coordinate.X2 + coordinate.Y2 * coordinate.Y2, coordinate.Y2 * coordinate.Y2 + coordinate.X1 * coordinate.X1));
                if (coordinate.X1 < 0 && coordinate.X2 > 0 && coordinate.Y2 > 0 && coordinate.Y1 < 0) {
                    rmin = 0;
                } else {
                    //TODO: Work out the shotest distance from (0,0) to the screen rectangle.
                }
                gridsize = pow(2, 6 - Math.round(log(scale.X) / log(2)));

                overleft = gridsize * ~~(coordinate.X1 / gridsize) - gridsize;
                overright = gridsize * ~~(coordinate.X2 / gridsize) + gridsize;
                overtop = gridsize * ~~(coordinate.Y2 / gridsize) + gridsize;
                overbottom = gridsize * ~~(coordinate.Y1 / gridsize) - gridsize;

                //Draw grid lines
                ctx.font = this.config.font;
                ctx.strokeStyle = 'red'; //this.config.minorGridStyle;
                ctx.fillStyle = "#888";
                ctx.lineWidth = 0.1;

                // 1/ 4 线
                //var n = 0;
                for (var x = overleft; x <= overright; x += gridsize / 4) {
                    //ctx.beginPath();
                    if (0 == x) {
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "black";
                        ctx.beginPath();
                        ctx.move(overleft, 0);
                        ctx.line(overright, 0);
                        ctx.stroke();
                    } else (mod )
                    ctx.move(x, overbottom);
                    ctx.line(x, overtop);
                    ctx.stroke();
                }
                for (var y = overbottom; y <= overtop; y += gridsize / 4) {
                    ctx.beginPath();
                    ctx.move(overleft, y);
                    ctx.line(overright, y);
                    ctx.stroke();
                }
                /*ctx.shadowColor = "rgba(255,255,255,1.0)";
                 ctx.shadowOffsetX = 0;
                 ctx.shadowOffsetY = 0
                 ctx.shadowBlur = 4;*/
                //Like overleft, but in units of 4*gridsize
                var dblleft = gridsize * 4 * ~~(coordinate.X1 / (4 * gridsize)) - 4 * gridsize;
                var dblleft = gridsize * 4 * ~~(coordinate.Y1 / (4 * gridsize)) - 4 * gridsize;

                // 1/ 1 线
                ctx.strokeStyle = this.config.majorGridStyle;
                ctx.lineWidth = 0.4;
                for (var x = overleft; x <= overright; x += gridsize) {
                    ctx.beginPath();
                    ctx.move(x, overbottom);
                    ctx.line(x, overtop);
                    ctx.stroke();
                }
                for (var y = overbottom; y <= overtop; y += gridsize) {
                    ctx.beginPath();
                    ctx.move(overleft, y);
                    ctx.line(overright, y);
                    ctx.stroke();
                }

                //纵轴
//                ctx.lineWidth = 1;
//                ctx.strokeStyle = "black";
//                ctx.beginPath();
//                ctx.move(overleft, 0);
//                ctx.line(overright, 0);
//                ctx.stroke();
                //横轴
                ctx.beginPath();
                ctx.move(0, overbottom);
                ctx.line(0, overtop);
                ctx.stroke();

                ctx.lineWidth = this.config.lineWidth;
                var alreadydrawnpoints = [];

                //}catch(ex){}
                ctx.fillStyle = "#888";
                ctx.font = "8pt monospace";	//set the font
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                //水平线坐标
                for (var x = dblleft; x <= overright; x += gridsize * 1) {
                    if (x != 0 && alreadydrawnpoints.indexOf(x + "," + 0) == -1) {
                        alreadydrawnpoints.push(x + "," + 0);
                        ctx.beginPath();

                        //ctx.arc(scale.X * x - cx, cy - scale.Y * 0, 2, 0, Math.PI * 2, true);

                        var transPoint = this.layout.transform({X:x, Y:0});
                        if (!transPoint) continue;
                        ctx.arc(transPoint.X, transPoint.Y, 2, 0, Math.PI * 2, true);

                        ctx.fill();

                        //ctx.fillText(x.toFixed(3).replace(/\.?0+$/, ""), scale.X * x - cx, 14 + cy - scale.Y * 0);
                        ctx.fillText(x.toFixed(3).replace(/\.?0+$/, ""), transPoint.X + 4, transPoint.Y + 4);
                    }
                }
                //垂直线坐标
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                for (var y = dblleft; y <= overright; y += gridsize * 1) {
                    if (y != 0 && alreadydrawnpoints.indexOf(0 + "," + y) == -1) {
                        alreadydrawnpoints.push(0 + "," + y);
                        ctx.beginPath();
                        //ctx.arc(-cx, cy - scale.Y * y, 2, 0, Math.PI * 2, true);
                        var transPoint = this.layout.transform({X:0, Y:y});
                        if (!transPoint) continue;
                        ctx.arc(transPoint.X, transPoint.Y, 2, 0, Math.PI * 2, true);

                        ctx.fill();
                        ctx.fillText(y.toFixed(3).replace(/\.?0+$/, ""), transPoint.X + 4, transPoint.Y + 4);
                    }
                }
            },
            gridlinesHorizontal:function (opt) {

            },
            gridlinesVertical:function (opt) {

            },

            init:function () {
                //NAURE.Graphics.system = finance;
                return finance;
            }
        };

        return finance.init();
    })();

    return NAURE;
});