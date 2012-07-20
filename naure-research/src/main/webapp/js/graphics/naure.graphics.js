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

                var gridlinesPerf, drawPerf;
                if (this.config.gridlines.show) {
                    start = new Date();
                    this.ui.gridlines(options);
                    end = new Date();
                    gridlinesPerf = end.getTime() - start.getTime();
                }

                this.lines = [];
                this.lines.push({equation:'y=x^2', color:'red'});
                this.lines.push({equation:"\\frac{d}{dx}\\left(sin\\left(x\\right)+log\\left(x+1\\right)\\right)", color:'blue'});
                //this.lines.push({equation : 'r<\sin \left(4\theta \right)', color : 'red'});

                start = new Date();
                this.ui.draw({lines:this.lines});
                end = new Date();
                drawPerf = end.getTime() - start.getTime();

                message.show({content:JSON.stringify({
                    gridlinesPerf:gridlinesPerf,
                    drawPerf:drawPerf
                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
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
                //Step 1: Layout 初始化
                graphics.layout = NAURE.Graphics.Layout;
                //Step 2: UI 初始化
                graphics.ui.init($.extend({
                    config: NAURE.Graphics.config,
                    layout:graphics.layout,
                    graphics:graphics,
                    gridlines: NAURE.Graphics.Gridlines
                }, options));
                //Step 3: System 初始化
                this.System(options.system);
                //Step 4: Draw
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