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



define(['jquery', 'naure', 'naure.graphics.math.js', 'math',
    'naure.graphics.ui',
    'naure.graphics.layout'], function ($, NAURE) {

    NAURE.Graphics.Equation = (function () {

        var equation = function () {

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

            this.random = {
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
            };

            //expression
            this.Graph = function (n, disabled, color) {
                var latex = n;
                var auto = 0;
                if (n) {
                    auto = true;
                } else {
                    //Sample function
                    latex = self.random.func();
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
                t.gid = self.random.hash();
                t.disabled = disabled;
                t.color = color ? color : self.random.color();

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
                return equation;
            };
        };

        return equation;
    })();

    return NAURE;
});


