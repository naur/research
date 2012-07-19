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

define(['jquery', 'naure', 'naure.math', 'naure.message'], function ($, NAURE) {
    NAURE.Graphics = (function () {

        message = NAURE.Message;

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
                zoomFactor:0.1,
                "lineWidth":1,
                "pt":true,
                "font":"8pt sans-serif",
                "minorGridStyle":"#bbb",
                "majorGridStyle":"#555"
            },

            draw:function (options) {
                this.ui.clear();

                if (this.config.gridlines.show) {
                    start = new Date();
                    this.ui.gridlines(options);
                    end = new Date();
                    message.show({content:JSON.stringify({
                        perf: end.getTime() - start.getTime()
                    }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
                }

                this.lines = [];
                this.lines.push({equation:'y=x^2', color:'red'});
                this.lines.push({equation:"\\frac{d}{dx}\\left(sin\\left(x\\right)+log\\left(x+1\\right)\\right)", color:'blue'});
                //this.lines.push({equation : 'r<\sin \left(4\theta \right)', color : 'red'});

                this.ui.draw({lines:this.lines});
            },

            reset:function () {
                this.ui.reset();
            },

            System:function (sys) {
                //default
                if (!sys)
                    graphics.system = NAURE.Graphics.Equation;
                else
                    graphics.system = sys;
                graphics.system.init({
                    config:graphics.config,
                    layout:graphics.layout,
                    ctx:graphics.ui.ctx
                });
            },

            init:function (options) {
                graphics.ui = NAURE.Graphics.UI;
                graphics.ui.config = NAURE.Graphics.config;
                graphics.ui.graphics = graphics;
                graphics.layout = NAURE.Graphics.Layout;

                //UI 初始化
                graphics.ui.init($.extend({
                    layout:graphics.layout,
                    graphics:graphics
                }, options));

                // System 初始化
                this.System(options.system);
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