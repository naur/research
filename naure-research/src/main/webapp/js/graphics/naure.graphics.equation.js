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
    NAURE.Graphics.Equation = (function () {
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

                //Calculate the scale of the gridlines
                for (i = 0.000000000001, c = 0; opt.coordinate.range.X / i > this.config.gridlines.maxgridlines.X - 1; c++) {
                    if (c % 3 == 1) i *= 2.5;    //alternating between 2, 5 and 10
                    else i *= 2;
                }
                opt.xgridscale = i;

                //do the same for the y-axis
                for (i = 0.000000000001, c = 0; opt.coordinate.range.Y / i > this.config.gridlines.maxgridlines.Y - 1; c++) {
                    if (c % 3 == 1) i *= 2.5;
                    else i *= 2;
                }
                opt.ygridscale = i;

                opt.xaxis = opt.yaxis = null;

                //currx is the current gridline being drawn, as a numerical value (not a pixel value)
                opt.currx = NAURE.Math.arbFloor(opt.coordinate.X1, opt.xgridscale);	//set it to before the lowest x-value on the screen
                opt.curry = NAURE.Math.arbFloor(opt.coordinate.Y1, opt.ygridscale);
                opt.ymainaxis = -1;
                opt.currx = Math.round(opt.currx * 100000000000) / 100000000000;	//round to the closest 0.00000001
                opt.curry = Math.round(opt.curry * 100000000000) / 100000000000;
                opt.xmainaxis = this.gridlines.charHeight;	//the next two variables are the axis on which text is going to be placed

                if (opt.coordinate.Y2 >= 0 && opt.coordinate.Y1 <= 0)    //y=0 appears on the screen - move the text to follow
                    opt.xmainaxis = opt.coordinate.height - ((0 - opt.coordinate.Y1) / (opt.coordinate.Y2 - opt.coordinate.Y1)) * opt.coordinate.height + (this.gridlines.charHeight * 1.2);
                else if (opt.coordinate.Y1 > 0)    //the smallest value of y is above the screen - the x-axis labels get pushed to the top of the screen
                    opt.xmainaxis = opt.coordinate.height - 1;

                //the x-axis labels have to be a certain distance from the bottom of the screen
                if (opt.xmainaxis > opt.coordinate.height - (this.gridlines.charHeight / 2))
                    opt.xmainaxis = opt.coordinate.height - 1;

                //do the same as above with the y-axis
                if (opt.coordinate.X2 >= 0 && opt.coordinate.X1 <= 0)    //y-axis in the middle of the screen
                    opt.ymainaxis = ((0 - opt.coordinate.X1) / (opt.coordinate.X2 - opt.coordinate.X1)) * opt.coordinate.width - 2;
                else if (opt.coordinate.X2 < 0)    //y-axis on the right side of the screen
                    opt.ymainaxis = opt.coordinate.width - 2;

                if (opt.ymainaxis < (coordinate.ctx.measureText(opt.curry).width + 1)) {
                    opt.ymainaxis = -1;
                }

                this.gridlinesVertical(opt);
                this.gridlinesHorizontal(opt);

                //Draw the axis
                if (opt.xaxis)
                    coordinate.ctx.fillRect(opt.xaxis - 0.5, 0, 1, opt.coordinate.height);
                if (opt.yaxis)
                    coordinate.ctx.fillRect(0, opt.yaxis - 0.5, opt.coordinate.width, 1);
            },
            //VERTICAL LINES
            gridlinesVertical:function (opt) {
                coordinate.ctx.font = "8pt monospace";	//set the font
                coordinate.ctx.textAlign = "center";
                opt.sigdigs = String(opt.currx).length + 3;

                for (i = 0; i < this.config.gridlines.maxgridlines.X; i++) {
                    xpos = ((opt.currx - opt.coordinate.X1) / (opt.coordinate.X2 - opt.coordinate.X1)) * opt.coordinate.width;	//position of the line (in pixels)
                    //make sure it is on the screen
                    if (xpos - 0.5 > opt.coordinate.width + 1 || xpos < 0) {
                        opt.currx += opt.xgridscale;
                        continue;
                    }

                    //currx = Calc.roundToSignificantFigures(currx, opt.sigdigs);
                    opt.currx = Math.round(opt.currx * 100000000000) / 100000000000;

                    if (opt.currx == 0)
                        opt.xaxis = xpos;

//                    if (jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(currx) % Calc.roundFloat((this.xgridscale * 2)) == 0)) {
                    coordinate.ctx.fillStyle = "rgb(190,190,190)";
                    coordinate.ctx.fillRect(xpos - 0.5, 0, 1, opt.coordinate.height);
//                    }

                    coordinate.ctx.fillStyle = "rgb(0,0,0)";

                    //Draw label
                    if (opt.currx != 0) {
                        xtextwidth = coordinate.ctx.measureText(opt.currx).width;
                        if (xpos + xtextwidth * 0.5 > opt.coordinate.width) //cannot overflow the screen
                            xpos = opt.coordinate.width - xtextwidth * 0.5 + 1;
                        else if (xpos - xtextwidth * 0.5 < 0)
                            xpos = xtextwidth * 0.5 + 1;
                        coordinate.ctx.fillText(opt.currx, xpos, opt.xmainaxis);
                    }

                    opt.currx += opt.xgridscale;

                }
            },
            //HORIZONTAL LINES
            gridlinesHorizontal:function (opt) {
                coordinate.ctx.textAlign = "right";
                opt.sigdigs = String(opt.curry).length + 3;

                for (i = 0; i < this.config.gridlines.maxgridlines.Y; i++) {
                    ypos = opt.coordinate.height - ((opt.curry - opt.coordinate.Y1) / (opt.coordinate.Y2 - opt.coordinate.Y1)) * opt.coordinate.height;	//position of the line (in pixels)
                    //make sure it is on the screen
                    if (ypos - 0.5 > opt.coordinate.height + 1 || ypos < 0) {
                        opt.curry += opt.ygridscale;
                        continue;
                    }

                    //curry = Calc.roundToSignificantFigures(curry, opt.sigdigs);
                    opt.curry = Math.round(opt.curry * 100000000000) / 100000000000;

                    if (opt.curry == 0)
                        opt.yaxis = ypos;

//                    if (jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(curry) % (Calc.roundFloat(this.ygridscale * 2)) == 0)) {
                    coordinate.ctx.fillStyle = "rgb(190,190,190)";
                    coordinate.ctx.fillRect(0, ypos - 0.5, opt.coordinate.width, 1);
//                    }

                    coordinate.ctx.fillStyle = "rgb(0,0,0)";

                    //Draw label
                    if (opt.curry != 0) {
                        ytextwidth = coordinate.ctx.measureText(opt.curry).width;
                        if (ypos + (this.gridlines.charHeight / 2) > opt.coordinate.height) //cannot overflow the screen
                            ypos = opt.coordinate.height - (this.gridlines.charHeight / 2) - 1;
                        if (ypos - 4 < 0)
                            ypos = 4;
                        xaxispos = opt.ymainaxis;
                        if (opt.ymainaxis == -1)
                            xaxispos = ytextwidth + 1;
                        coordinate.ctx.fillText(opt.curry, xaxispos, ypos + 3);
                    }
                    opt.curry += opt.ygridscale;
                }
            },

            init:function () {
                //NAURE.Graphics.system = equation;
                return equation;
            }
        };

        return equation.init();
    })();

    return NAURE;
});