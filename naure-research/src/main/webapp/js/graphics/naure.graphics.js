/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/10/12 12:02 PM
 * Description:
 *
 */
Array.prototype.remove = function (elem) {
    var index = this.indexOf(elem);
    if (index !== -1) {
        this.splice(index, 1)
    }
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

define(['jquery', 'naure', 'math'], function ($, NAURE) {
    NAURE.Graphics = (function () {
        var graphics = {
            ui:null,
            system:null,
            layout:null,
            lines:[],
            config:{
                gridlines:{
                    show:true,
                    maxgridlines:{X:13, Y:13},
                    charHeight:8
                },
                quality:1,
                scale:function (scale) {
                    graphics.layout.scale = scale;
                },
                zoomFactor:0.1
            },
            random:{
                index:0,
                funcs:"y=x^2@y^2=1-x^2@y<2e^{-x}@\\theta=r@2x+3@\\frac{d}{dx}\\left(\\frac{1}{x}\\right)@r<\\sin\\left(4\\theta\\right)@\\int x.dx@\\frac{d}{dx}\\left(sin\\left(x\\right)\\right)@\\lambda=3@e^{-\\lambda\\cdot x}@\\left|x^2-4\\right|+2@\\frac1x@x^{-2}@x!@\\ln x@\\sum_{n=1}^{\\infinity}\\frac{x^n}{n}@\\sin x@\\tan\\left(x\\right)@\\left(x-2\\right)^2@\\Gamma\\left(x\\right)@\\sqrt x".split("@"),
                func:function () {
                    return random.funcs[(random.index++) % random.funcs.length];
                },
                colors:"#000,#f08,#8f0,#80f,#880,#088,#808,#0ff,#f80,#f0f,#0a0,#f00,#07c".split(","),
                color:function () {
                    return random.colors[(random.index++) % random.colors.length];
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

            Graph:function (n, disabled, color) {
                var latex = n;
                var auto = 0;
                if (n) {
                    auto = true;
                } else {
                    //Sample function
                    latex = graphics.random.func();
                }
                var t = {};
                var c = compile(latex);

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
                t.gid = graphics.random.hash();
                t.disabled = disabled;
                t.color = color ? color : graphics.random.color();

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

            draw:function (options) {
                var opt = $.extend({}, graphics.config, options)

                this.ui.draw(opt);

//                for (var i in this.lines) {
//                    //dump(this.lines[i].equation);
//                    equation = Calc.parseEquation(this.lines[i].equation, true);
//                    this.drawEquation(equation, this.lines[i].color);
//                }

//                NAURE.Message.show({content:JSON.stringify({
//                    size:{width:this.width, height:this.height},
//                    startCoord:this.startCoord,
//                    currCoord:this.currCoord
//                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            reset:function () {
                this.ui.reset();
            },

            init:function (options) {
                graphics.ui = NAURE.Graphics.UI;
                graphics.layout = NAURE.Graphics.Layout;

                graphics.ui.init($.extend({
                    layout:graphics.layout
                }, options));

                this.draw();
            }
        };

        return graphics;
    })();


    $.fn.NAURE_Graphics = function (options) {
        if (!options)
            options = {};
        options.container = this;
        NAURE.Graphics.init(options);
        return this;
    };

    return NAURE;
});