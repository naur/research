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

define(['jquery', 'naur', 'naur.math', 'naur.message'], function ($, NAUR) {

    NAUR.Graphics = (function () {

        var message = NAUR.Message;

        var graphics = function () {
            var ui, defaultSystem, gridlines, layout, system;
            var lines = [];

            this.config = {
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
            };

            this.draw = function (options) {
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
            };

            this.reset = function () {
                ui.reset();
            };

            this.System = function (sys) {
                //Step 1: System 初始化
                if (!sys)
                    system = defaultSystem
                else
                    system = sys;

                system.init({
                    config:this.config,
                    layout:layout,
                    ctx:ui.ctx
                });
                layout.init({
                    graphics:this,
                    system:system
                });
                //Step 2: Gridlines 初始化
                gridlines.init({
                    config:this.config.gridlines,
                    layout:layout,
                    ctx:ui.ctx,
                    system:system
                });
                //Step 3: resize
                ui.setSystem(system);
                ui.resize();
            };

            this.init = function (options) {
                if (NAUR.Graphics.Equation)
                    defaultSystem = new NAUR.Graphics.Equation(); //default
                ui = new NAUR.Graphics.UI();
                gridlines = new NAUR.Graphics.Gridlines();
                //Step 1: Layout 初始化
                layout = new NAUR.Graphics.Layout();
                //Step 2: UI 初始化
                ui.init($.extend({
                    config:this.config,
                    layout:layout,
                    graphics:this,
                    system:defaultSystem,
                    gridlines:gridlines
                }, options));
                //Step 3:  System 初始化
                this.System(options.system);
                //Step 4: Draw
                this.draw();

                return this;
            };
        };

        return graphics;
    })();


    $.fn.NAUR_Graphics = function (options) {
        if (!options)
            options = {};
        options.container = this;
        return new NAUR.Graphics().init(options);
    };

    return NAUR;
});