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

    NAURE.Graphics.Equation = (function () {

        var config, layout, scale, ctx, coordinate;

        var equation = {
            random:{
                index:0,
                funcs:"y=x^2@y^2=1-x^2@y<2e^{-x}@\\theta=r@2x+3@\\frac{d}{dx}\\left(\\frac{1}{x}\\right)@r<\\sin\\left(4\\theta\\right)@\\int x.dx@\\frac{d}{dx}\\left(sin\\left(x\\right)\\right)@\\lambda=3@e^{-\\lambda\\cdot x}@\\left|x^2-4\\right|+2@\\frac1x@x^{-2}@x!@\\ln x@\\sum_{n=1}^{\\infinity}\\frac{x^n}{n}@\\sin x@\\tan\\left(x\\right)@\\left(x-2\\right)^2@\\Gamma\\left(x\\right)@\\sqrt x".split("@"),
                func:function () {
                    return this.funcs[(this.index++) % this.funcs.length];
                },
                colors:"#000,#f08,#8f0,#80f,#880,#088,#808,#0ff,#f80,#f0f,#0a0,#f00,#07c".split(","),
                color:function () {
                    return this.colors[(this.index++) % this.colors.length];
                },
                hash:function () {
                    var s = "";
                    for (var i = 0; i < 20; i++) {
                        s += (10 + ~~(Math.random() * 23)).toString(36)
                        //s+=(~~(Math.random()*16)).toString(16);
                    }
                    return s;
                }
            },

            //expression
            Graph:function (n, disabled, color) {
                var latex = n;
                var auto = 0;
                if (n) {
                    auto = true;
                } else {
                    //Sample function
                    latex = equation.random.func();
                }
                var t = {};
                var c = NAURE.Graphics.Math.compile(latex);

                //Copy properties (we will extend the object)
                //TODO: why don't we just use t=c? lol
                for (i in c) {
                    if (c.hasOwnProperty(i)) {
                        t[i] = c[i];
                    }
                }
                //For debugging purposes. I think.
                t.equation = latex;
                //Graph id: random
                t.gid = equation.random.hash();
                t.disabled = disabled;
                t.color = color ? color : equation.random.color();

                if (t.color == undefined) {
                    //We ran out of colours!
                    t.color = "#000";
                }

                if (auto) {
                    t.auto = true;
                }

                //Create html <li> node.
                //t.node = app.ui.add(t);
                return t;
            },


            gridlines:function (options) {
                var opt = $.extend({}, options);
                //they can be accidentially changed
                e = Math.E;
                pi = Math.PI;

                if (!ctx) {
                    return;
                }

                //scale = coordinate.scale;

                //This can probably be simplified a bit
                gridsize = pow(2, 6 - Math.round(lg(scale.X)));

                overleft = floor(coordinate.X1);
                overright = ceil(coordinate.X2);
                overtop = ceil(coordinate.Y2);
                overbottom = floor(coordinate.Y1);

                ctx.font = config.font;
                //ctx.font = "8pt monospace";	//set the font // Serif Sans-Serif Monospace 字体
                ctx.fillStyle = "#888";
                /*ctx.shadowColor = "rgba(255,255,255,1.0)";
                 ctx.shadowOffsetX = 0;
                 ctx.shadowOffsetY = 0
                 ctx.shadowBlur = 4;*/
                //Like overleft, but in units of 4*gridsize

                var alreadydrawnpoints = [];
//                var dblleft = gridsize * 4 * ~~(coordinate.X1 / (4 * gridsize)) - 4 * gridsize;
//                var dblleft = gridsize * 4 * ~~(coordinate.Y1 / (4 * gridsize)) - 4 * gridsize;

                this.gridlinesHorizontal(overbottom, overtop, gridsize, alreadydrawnpoints);
                this.gridlinesVertical(overleft, overright, gridsize, alreadydrawnpoints);
            },

            //水平线
            gridlinesHorizontal:function (overbottom, overtop, gridsize, alreadydrawnpoints) {
                // 1/ 4 线 [Y 轴 ]
                ctx.strokeStyle = 'red'; //this.config.minorGridStyle;
                ctx.lineWidth = 0.1;

                for (var y = overbottom; y <= overtop; y += gridsize / 4) {
                    pixel = new layout.Point(0, y).transformY();
                    ctx.beginPath();
                    ctx.moveTo(0, pixel);
                    ctx.lineTo(layout.width, pixel);
                    ctx.stroke();
                }

                // 1/ 1 线 [Y 轴 ]
                ctx.strokeStyle = config.majorGridStyle;
                ctx.lineWidth = 0.4;
                for (var y = overbottom; y <= overtop; y += gridsize) {
                    pixel = new layout.Point(0, y).transformY();
                    ctx.beginPath();
                    ctx.moveTo(0, pixel);
                    ctx.lineTo(layout.width, pixel);
                    ctx.stroke();
                }

                //横轴
                ctx.lineWidth = 1;
                ctx.strokeStyle = "black";
                ctx.beginPath();
                ctx.move(0, overbottom);
                ctx.line(0, overtop);
                ctx.stroke();

                //垂直线坐标
                ctx.lineWidth = config.lineWidth;
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                var labelPixel = {}, labelPixelOffset = {X:-4, Y:4};
                labelPixel.X = new layout.Point(0, 0).transformX();
                if (labelPixel.X <= 0) {
                    ctx.textAlign = "left";
                    labelPixel.X = 0;
                    labelPixelOffset.X = 6;
                }
                if (labelPixel.X >= layout.width) {
                    labelPixel.X = layout.width;
                    labelPixelOffset.X = -6;
                }


                for (var y = floor(overbottom); y <= overtop; y += gridsize * 1) {
                    if (y != 0 && alreadydrawnpoints.indexOf(0 + "," + y) == -1) {
                        alreadydrawnpoints.push(0 + "," + y);
                        ctx.beginPath();
                        labelPixel.Y = new layout.Point(0, y).transformY();
                        ctx.arc(labelPixel.X, labelPixel.Y, 2, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.fillText(y.toFixed(3).replace(/\.?0+$/, ""), labelPixel.X + labelPixelOffset.X, labelPixel.Y + labelPixelOffset.Y);
                    }
                }
            },

            //垂直线
            gridlinesVertical:function (overleft, overright, gridsize, alreadydrawnpoints) {
                // 1/ 4 线 [X 轴 ]
                ctx.strokeStyle = 'red'; //this.config.minorGridStyle;
                ctx.lineWidth = 0.1;
                for (var x = overleft; x <= overright; x += gridsize / 4) {
                    pixel = new layout.Point(x, 0).transformX();
                    ctx.beginPath();
                    ctx.moveTo(pixel, 0);
                    ctx.lineTo(pixel, layout.height);
                    ctx.stroke();
                }

                // 1/ 1 线 [X 轴 ]
                ctx.strokeStyle = config.majorGridStyle;
                ctx.lineWidth = 0.4;
                for (var x = overleft; x <= overright; x += gridsize) {
                    pixel = new layout.Point(x, 0).transformX();
                    ctx.beginPath();
                    ctx.moveTo(pixel, 0);
                    ctx.lineTo(pixel, layout.height);
                    ctx.stroke();
                }

                //纵轴
                ctx.lineWidth = 1;
                ctx.strokeStyle = "black";
                ctx.beginPath();
                ctx.move(overleft, 0);
                ctx.line(overright, 0);
                ctx.stroke();

                //水平线坐标
                ctx.lineWidth = config.lineWidth;
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                var labelPixel = {}, labelPixelOffset = {X:4, Y:4};
                labelPixel.Y = new layout.Point(0, 0).transformY();
                if (labelPixel.Y <= 0) {
                    labelPixel.Y = 0;
                    labelPixelOffset.Y = 6;
                }
                if (labelPixel.Y >= layout.height) {
                    ctx.textBaseline = "bottom";
                    labelPixel.Y = layout.height;
                    labelPixelOffset.Y = -6;
                }
                for (var x = floor(overleft); x <= overright; x += gridsize * 1) {
                    if (x != 0 && alreadydrawnpoints.indexOf(x + "," + 0) == -1) {
                        alreadydrawnpoints.push(x + "," + 0);
                        ctx.beginPath();
                        labelPixel.X = new layout.Point(x).transformX();
                        ctx.arc(labelPixel.X, labelPixel.Y, 2, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.fillText(x.toFixed(3).replace(/\.?0+$/, ""), labelPixel.X + labelPixelOffset.X, labelPixel.Y + labelPixelOffset.Y);
                    }
                }
            },


            init:function (options) {
                config = options.config;
                layout = options.layout;
                ctx = options.ctx;
                scale = layout.scale;
                coordinate = layout.coordinate;
                return equation;
            }
        };

        return equation;
    })();

    return NAURE;
});


