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
app = [];
app.variables = []

define(['jquery', 'naure', 'naure.math', 'naure.graphics', 'math'], function ($, NAURE) {

    NAURE.Graphics.UI = (function () {
        var ui = {
            container:null,
            layout:null,
            graph:null,
            ctx:null,
            graphics:null,
            clear:function () {
                this.ctx.lineCap = "butt";
                this.ctx.font = this.config.font;
                this.ctx.strokeStyle = this.ctx.fillStyle = "rgb(255,255,255)";
                this.ctx.fillRect(0, 0, this.graph.width(), this.graph.height());
            },
            mousebutton:0,
            calccache:new Object,

            arrange:function () {

            },

            measure:function () {

            },

            reset:function () {
                this.layout.reset();
                this.graphics.draw();
            },

            draw:function (options) {
                this.clear();
                //$.extend(this.config, options);
                var opt = $.extend({
                    lines:[]
                }, options);

                this.gridlines(opt);

                this.ctx.fillStyle = '#00f';

//                this.ctx.font = this.config.font;
//                this.ctx.strokeStyle = this.config.minorGridStyle;
//                this.ctx.fillStyle = "#888";
//                this.ctx.lineWidth = 0.1;

                for (key in opt.lines) {
                    //this.drawLine({expression:opt.lines[key]});
                    if (!opt.lines.hasOwnProperty(key)) break
                    this.drawLine(opt.lines[key]);
                }
            },

            drawLine:function (options) {
                var opt = $.extend({}, ui.config, options);
                this.ctx.strokeStyle = opt.color;
                new ui.graphics.system.Graph(opt.equation, true, opt.color).plot(this.ctx);
            },

            resize:function () {
                //layout refresh
                ui.layout.refresh({
                    width:ui.graph.width(),
                    height:ui.graph.height(),
                    offset:ui.graph.offset()
                });

                //Resize the elements
                this.graph.attr('width', this.layout.width);
                this.graph.attr('height', this.layout.height);
                this.ctx.height = this.layout.height;
                this.ctx.width = this.layout.width;

                //Compute how many grid lines to show
                this.config.gridlines.maxgridlines.X = 0.015 * this.layout.width;
                this.config.gridlines.maxgridlines.Y = 0.015 * this.layout.height;
            },

            mouseWheel:function (event) {
                if (event.wheelDelta > 0) {
                    this.zoom(this.config.zoomFactor, event);
                }
                else {
                    this.zoom(-this.config.zoomFactor, event);
                }
            },

            mouseDown:function (event) {
                document.body.style.cursor = "hand";
                if (ui.mousebutton == 0) {
                    ui.layout.refresh({startDrag:{X:event.pageX, Y:event.pageY}});
                }
                ui.mousebutton = 1;
            },

            mouseUp:function (event) {
                document.body.style.cursor = "auto";
                ui.mousebutton = 0;
                this.layout.refresh({renew:true});
                //this.layout.startCoord = NAURE.Utility.clone(this.layout.currCoord);
            },

            checkMove:function (x, y) {
                ui.layout.refresh({
                    offset:ui.graph.offset(),
                    currDrag:{X:x, Y:y}
                });

                if (!ui.layout.isDragMove()) return

                if (this.mousebutton == 1) {
                    ui.layout.refresh({continue:true});
                    this.graphics.draw();
                }

                ui.layout.refresh({prevDrag:{X:x, Y:y}})
            },

            zoom:function (scale, event) {
                if (event)
                    this.layout.refresh({zoom:{X:event.pageX, Y:event.pageY, Scale:scale}});
                else
                    this.layout.refresh({zoom:{X:null, Y:null, Scale:scale}});

                this.graphics.draw();
            },

            gridlines:function (options) {
                var opt = $.extend({coordinate:coordinate}, options);
                if (!this.config.gridlines.show) return;

                this.graphics.system.gridlines(opt);
            },

            init:function (options) {
                var opt = $.extend({}, options);
                ui.graph = $(opt.container);
                if (!ui.graph[0].getContext) return;
                ui.ctx = $(ui.graph)[0].getContext("2d");
                ui.layout = opt.layout;
                ui.resize();

                coordinate.ctx = ui.ctx;

                //初始化 ctx 方法
                ui.ctx.move = function (pointX, pointY) {
                    var transPoint = ui.layout.transform({X:pointX, Y:pointY});
                    if (!transPoint) return;
                    return ui.ctx.moveTo(transPoint.X, transPoint.Y);
                };

                ui.ctx.line = function (pointX, pointY) {
                    var transPoint = ui.layout.transform({X:pointX, Y:pointY});
                    if (!transPoint) return;
                    return ui.ctx.lineTo(transPoint.X, transPoint.Y);
                };

                //初始化事件
                var self = this;
                this.graph.on('mousemove', this.graph, function (event) {
                    self.checkMove(event.pageX, event.pageY);
                });
                this.graph.on('mousewheel', this.graph, function (event) {
                    self.mouseWheel(event.originalEvent);
                    return false;
                });
                this.graph.on('mousedown', this.graph, function (event) {
                    self.mouseDown(event);
                });
                this.graph.on('mouseup', this.graph, function (event) {
                    self.mouseUp(event);
                });
                this.graph.on('mouseleave', this.graph, function (event) {
                    self.mouseUp(event);
                });
                return ui;
            }
        };

        return ui;
    })();

    return NAURE;
});