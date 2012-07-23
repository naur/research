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

define(['jquery', 'naure', 'naure.math', 'naure.graphics', 'naure.graphics.gridlines'], function ($, NAURE) {

    NAURE.Graphics.UI = (function () {

        var layout, graphics, gridlines, config;

        var ui = {
            container:null,
            graph:null,
            ctx:null,
            isLiveGraphEvent:false,
            clear:function () {
                this.ctx.clearRect(0, 0, this.graph.width(), this.graph.height())
                this.ctx.lineCap = "butt";
                this.ctx.font = config.font;
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
                layout.reset();
                graphics.draw();
            },

            draw:function (options) {
                var opt = $.extend({
                    lines:[]
                }, options);

                this.ctx.fillStyle = '#00f';

                for (var key in opt.lines) {
                    //this.drawLine({expression:opt.lines[key]});
                    if (!opt.lines.hasOwnProperty(key)) break
                    this.drawLine(opt.lines[key]);
                }
            },

            drawLine:function (options) {
                var opt = $.extend({}, config, options);
                this.ctx.strokeStyle = opt.color;
                new graphics.system.Graph(opt.equation, true, opt.color).plot(this.ctx, layout.coordinate);
            },

            resize:function () {
                //layout refresh
                layout.refresh({
                    width:ui.graph.width(),
                    height:ui.graph.height(),
                    offset:ui.graph.offset()
                });

                //Resize the elements
                this.graph.attr('width', layout.width);
                this.graph.attr('height', layout.height);
                this.ctx.height = layout.height;
                this.ctx.width = layout.width;

                //todo Compute how many grid lines to show
                config.gridlines.maxgridlines.X = 0.015 * layout.width;
                config.gridlines.maxgridlines.Y = 0.015 * layout.height;

                this.liveGraphEvent();
            },

            mouseWheel:function (event) {
                if (event.wheelDelta > 0) {
                    this.zoom(config.zoomFactor, event);
                }
                else {
                    this.zoom(-config.zoomFactor, event);
                }
            },

            mouseDown:function (event) {
                document.body.style.cursor = "hand";
                if (ui.mousebutton == 0) {
                    layout.refresh({pixel:{X:event.pageX, Y:event.pageY}, drag:'START'});
                }
                ui.mousebutton = 1;
            },

            mouseUp:function (event) {
                document.body.style.cursor = "auto";
                ui.mousebutton = 0;
                layout.refresh({drag:'RENEW'});
            },

            checkMove:function (x, y) {
                layout.refresh({
                    offset:ui.graph.offset(),
                    pixel:{X:x, Y:y}
                });

                if (!layout.isDragMove()) return

                if (this.mousebutton == 1) {
                    layout.refresh({drag:'CONTINUE'});
                    graphics.draw();
                }
            },

            zoom:function (scale, event) {
                if (event)
                    layout.refresh({zoom:{X:event.pageX, Y:event.pageY, Scale:scale}});
                else
                    layout.refresh({zoom:{X:null, Y:null, Scale:scale}});

                graphics.draw();
            },

            gridlines:function (options) {
                var opt = $.extend(options);
                gridlines.draw(opt);
            },

            liveGraphEvent:function () {
                if (this.isLiveGraphEvent) return;

                //初始化 ctx 方法
                ui.ctx.move = function (x, y) {
                    var transPixel = layout.toPixel(x, y); //new layout.Point(x, y).transform();
                    if (!transPixel) return;
                    return ui.ctx.moveTo(transPixel.X, transPixel.Y);
                };

                ui.ctx.line = function (x, y) {
                    var transPixel = layout.toPixel(x, y); //new layout.Point(x, y).transform();
                    if (!transPixel) return;
                    return ui.ctx.lineTo(transPixel.X, transPixel.Y);
                };

//                ui.ctx.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
//                    var transPoint = new ui.layout.Point(x, y).transform();
//                    if (!transPoint) return;
//                    return ctx.arc(transPoint.X, transPoint.Y, radius, startAngle, endAngle, anticlockwise);
//                };
//
//                ui.ctx.fillText = function(text,x,y,maxWidth) {
//                    var transPoint = new ui.layout.Point(x, y).transform();
//                    if (!transPoint) return;
//                    ctx.fillText(text,transPoint.X,transPoint.Y,maxWidth);
//                };
//                ui.ctx.strokeText = function(text,x,y,maxWidth) {
//                    var transPoint = new ui.layout.Point(x, y).transform();
//                    if (!transPoint) return;
//                    ctx.strokeText(text,transPoint.X,transPoint.Y,maxWidth);
//                };

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

                this.isLiveGraphEvent = true;
            },

            init:function (options) {
                var opt = $.extend({}, options);
                ui.graph = $(opt.container);
                if (!ui.graph[0].getContext) return;
                ui.ctx = $(ui.graph)[0].getContext("2d");

                config = opt.config;
                graphics = opt.graphics;
                layout = opt.layout;
                gridlines = opt.gridlines;
                //ui.resize(opt.coordinate);
                return ui;
            }
        };

        return ui;
    })();

    return NAURE;
});