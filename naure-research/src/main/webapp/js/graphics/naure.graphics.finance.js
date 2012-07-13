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

            gridlines:function (options) {
                var opt = $.extend({}, options);
                //they can be accidentially changed
                e = Math.E;
                pi = Math.PI;
                ctx = coordinate.ctx;

                if (!ctx) {
                    return;
                }
                ctx.lineCap = "butt";
                ctx.strokeStyle = ctx.fillStyle = "black";
                ctx.clearRect(0, 0, coordinate.width, coordinate.height);
                //try{

//                coordinate.X1 = cx / scalex;
//                coordinate.X2 = (coordinate.width + cx) / scale.X;
//                coordinate.Y1 = -(coordinate.height - cy) / scale.Y;
//                coordinate.Y2 = cy / scale.Y;

                scale = coordinate.scale;

                //This can probably be simplified a bit
                rmax = Math.sqrt(Math.max(coordinate.X1 * coordinate.X1 + coordinate.Y1 * coordinate.Y1, coordinate.Y1 * coordinate.Y1 + coordinate.X2 * coordinate.X2, coordinate.X2 * coordinate.X2 + coordinate.Y2 * coordinate.Y2, coordinate.Y2 * coordinate.Y2 + coordinate.X1 * coordinate.X1));
                if (coordinate.X1 < 0 && coordinate.X2 > 0 && coordinate.Y2 > 0 && coordinate.Y1 < 0) {
                    rmin = 0;
                } else {
                    //TODO: Work out the shotest distance from (0,0) to the screen rectangle.
                }
                gridsize = pow(2, 6 - Math.round(log(scale.X) / log(2)));
                overleft = gridsize * ~~ (coordinate.X1 / gridsize) - gridsize;
                overright = gridsize * ~~ (coordinate.X2 / gridsize) + gridsize;
                overtop = gridsize * ~~ (coordinate.Y2 / gridsize) + gridsize;
                overbottom = gridsize * ~~ (coordinate.Y1 / gridsize) - gridsize;

                //Draw grid lines


                ctx.font = this.config.font;

                ctx.strokeStyle = 'red', //this.config.minorGridStyle;
                ctx.fillStyle = "#888";
                ctx.lineWidth = 0.1;

                var n = 0;
                for (var x = overleft; x <= overright; x += gridsize / 4) {
                    ctx.beginPath();
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
                var dblleft = gridsize * 4 * ~~ (coordinate.X1 / (4 * gridsize)) - 4 * gridsize;
                var dblleft = gridsize * 4 * ~~ (coordinate.Y1 / (4 * gridsize)) - 4 * gridsize;


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

                ctx.lineWidth = 2;


                ctx.strokeStyle = "black";

                ctx.beginPath();
                ctx.move(overleft, 0);
                ctx.line(overright, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.move(0, overbottom);
                ctx.line(0, overtop);
                ctx.stroke();


                ctx.lineWidth = this.config.lineWidth;
                var alreadydrawnpoints = [];

                //}catch(ex){}
                ctx.fillStyle = "#888";

                for (var x = dblleft; x <= overright; x += gridsize * 4) {

//                    if (x != 0 && alreadydrawnpoints.indexOf(x + "," + 0) == -1) {
//                        alreadydrawnpoints.push(x + "," + 0);
//                        ctx.beginPath();
//
//                        //ctx.arc(scale.X * x - cx, cy - scale.Y * 0, 2, 0, Math.PI * 2, true);
//
//                        var transPoint = this.layout.transform({X:x, Y:0});
//                        if (!transPoint) continue;
//                        ctx.arc(transPoint.X, transPoint.Y, 2, 0, Math.PI * 2, true);
//
//                        ctx.fill();
//                        ctx.fillText(x.toFixed(3).replace(/\.?0+$/, ""), scale.X * x - cx, 14 + cy - scale.Y * 0);
//                    }
                }
                for (var y = dblleft; y <= overright; y += gridsize * 4) {
//                    if (y != 0 && alreadydrawnpoints.indexOf(0 + "," + y) == -1) {
//                        alreadydrawnpoints.push(0 + "," + y);
//                        ctx.beginPath();
//                        //ctx.arc(-cx, cy - scale.Y * y, 2, 0, Math.PI * 2, true);
//                        ctx.fill();
//                        ctx.fillText(y.toFixed(3).replace(/\.?0+$/, ""), 10 - cx, 4 + cy - scale.Y * y);
//                    }
                }
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