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

        var naure = NAURE;
        var message = NAURE.Message;
        var ui, gridlines, layout, system, defaultSystem;

        var graphics = {
            ui:null,
            system:null,
            layout:null,
            lines:[],
            config:{
                gridlines:{
                    show:true,
                    maxgridlines:{X:13, Y:13},
                    charHeight:8,
                    //gridsize: 1,         //pow(2, 6 - Math.round(lg(scale.X)));
                    //style: 'red',
                    "minorStyle":"#555",
                    "majorStyle":"black",
                    "font":"8pt sans-serif" // "8pt monospace";    Serif Sans-Serif Monospace 字体
                },
                zoomAxis:'both', //horizontal, vertical,
                quality:1,
                zoomFactor:0.1,
                "lineWidth":1,
                "pt":true,
                "font":"8pt sans-serif"
            },

            draw:function (options) {
                var opt = $.extend({}, options)

                if (opt.coordinate) {
                    layout.refresh({coordinate:opt.coordinate});
                }

                ui.clear();

                var gridlinesPerf, drawPerf;
                if (this.config.gridlines.show) {
                    start = new Date();
                    ui.gridlines(options);
                    end = new Date();
                    gridlinesPerf = end.getTime() - start.getTime();
                }

                if (opt.lines)
                    this.lines = opt.lines;

                start = new Date();
                ui.draw({lines:this.lines});
                end = new Date();
                drawPerf = end.getTime() - start.getTime();

//                message.show({content:JSON.stringify({
//                    gridlinesPerf:gridlinesPerf,
//                    drawPerf:drawPerf
//                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            reset:function () {
                ui.reset();
            },

            System:function (sys) {
                //Step 1: System 初始化
                if (!sys)
                    system = defaultSystem
                else
                    system = sys;

                system.init({
                    config:graphics.config,
                    layout:layout,
                    ctx:ui.ctx
                });
                layout.init({
                    graphics:graphics,
                    system:system
                });
                //Step 2: Gridlines 初始化
                gridlines.init({
                    config:graphics.config.gridlines,
                    layout:layout,
                    ctx:ui.ctx,
                    system:system
                });
                //Step 3: resize
                ui.resize();
            },

            init:function (options) {
                defaultSystem = NAURE.Graphics.Equation; //default
                ui = NAURE.Graphics.UI;
                gridlines = NAURE.Graphics.Gridlines;
                //Step 1: Layout 初始化
                layout = NAURE.Graphics.Layout;
                //Step 2: UI 初始化
                ui.init($.extend({
                    config:graphics.config,
                    layout:layout,
                    graphics:graphics,
                    system:system,
                    gridlines:gridlines
                }, options));
                //Step 3:  System 初始化
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