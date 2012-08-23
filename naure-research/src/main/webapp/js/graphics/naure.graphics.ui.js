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

        var layout, graphics, system, gridlines, config, location = [];

        var ui = function () {
            this.ctx = null;

            //var container = null;
            var graph = null;
            var isLiveGraphEvent = false;
            var mousebutton = 0;
            //calccache:new Object;
            this.clear = function () {
                this.ctx.clearRect(0, 0, graph.width(), graph.height())
//                this.ctx.lineCap = "butt";
//                this.ctx.font = config.font;
//                this.ctx.strokeStyle = this.ctx.fillStyle = "rgb(255,255,255)";
//                this.ctx.fillRect(0, 0, graph.width(), graph.height());
            };

            this.arrange = function () {

            };

            this.measure = function () {

            };

            this.reset = function () {
                layout.reset();
                graphics.draw();
            };

            this.setSystem = function (sys) {
                system = sys;
            };

            this.draw = function (options) {
                var opt = $.extend({
                    lines:[]
                }, options);

                this.ctx.fillStyle = '#00f';

                for (var key in opt.lines) {
                    //this.drawLine({expression:opt.lines[key]});
                    if (!opt.lines.hasOwnProperty(key)) break
                    this.drawLine(opt.lines[key]);
                }
            };

            this.drawLine = function (options) {
                var opt = $.extend({}, config, options);
                this.ctx.strokeStyle = opt.color;
                new system.Graph(opt.equation, true, opt.color).plot(this.ctx, layout.coordinate);
            };

            this.resize = function () {
                //layout refresh
                layout.refresh({
                    width:graph.width(),
                    height:graph.height(),
                    offset:graph.offset()
                });

                //Resize the elements
                graph.attr('width', layout.width);
                graph.attr('height', layout.height);
                this.ctx.height = layout.height;
                this.ctx.width = layout.width;

                //todo Compute how many grid lines to show
                config.gridlines.maxgridlines.X = 0.015 * layout.width;
                config.gridlines.maxgridlines.Y = 0.015 * layout.height;

                this.liveGraphEvent();
            };

            this.mouseWheel = function (event) {
                if (event.wheelDelta > 0) {
                    this.zoom(config.zoomFactor, event);
                }
                else {
                    this.zoom(-config.zoomFactor, event);
                }
            };

            this.mouseDown = function (event) {
                document.body.style.cursor = "hand";
                if (mousebutton == 0) {
                    layout.refresh({pixel:{X:event.pageX, Y:event.pageY}, drag:'START'});
                }
                mousebutton = 1;
            };

            this.mouseUp = function (event) {
                document.body.style.cursor = "auto";
                mousebutton = 0;
                layout.refresh({drag:'RENEW'});
            };

            this.checkMove = function (x, y) {
                layout.refresh({
                    offset:graph.offset(),
                    pixel:{X:x, Y:y}
                });

                if (!layout.isDragMove()) return

                if (mousebutton == 1) {
                    layout.refresh({drag:'CONTINUE'});
                    graphics.draw();
                } else {

                    gridlines.alreadyDrawnPoints;


//                    var prev = location.pop();
//                    if (prev) {
//                        this.ctx.clearRect(prev.X, 0, 1, layout.height);
//                        this.ctx.clearRect(0, prev.Y, layout.width, 1);
//                        graphics.draw();
//                    }
//                    this.ctx.save();
//                    //this.ctx.globalCompositeOperation = config.CompositeOperation;
//                    this.ctx.fillStyle = "red";
//                    this.ctx.fillRect(x, 0, 1, layout.height);
//                    this.ctx.fillRect(0, y, layout.width, 1);
//                    this.ctx.restore();
//                    location.push({X:x, Y:y});
                }
            };

            this.zoom = function (scale, event) {
                if (event)
                    layout.refresh({zoom:{X:event.pageX, Y:event.pageY, Scale:scale}});
                else
                    layout.refresh({zoom:{X:null, Y:null, Scale:scale}});

                graphics.draw();
            };

            this.gridlines = function (options) {
                var opt = $.extend(options);
                gridlines.draw(opt);
            };

            this.liveGraphEvent = function () {
                if (isLiveGraphEvent) return;

                var self = this;

                //初始化 ctx 方法
                this.ctx.move = function (x, y) {
                    var transPixel = layout.toPixel(x, y); //new layout.Point(x, y).transform();
                    if (!transPixel) return;
                    return self.ctx.moveTo(transPixel.X, transPixel.Y);
                };

                this.ctx.line = function (x, y) {
                    var transPixel = layout.toPixel(x, y); //new layout.Point(x, y).transform();
                    if (!transPixel) return;
                    return self.ctx.lineTo(transPixel.X, transPixel.Y);
                };

//                this.ctx.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
//                    var transPoint = new ui.layout.Point(x, y).transform();
//                    if (!transPoint) return;
//                    return ctx.arc(transPoint.X, transPoint.Y, radius, startAngle, endAngle, anticlockwise);
//                };
//
//                this.ctx.fillText = function(text,x,y,maxWidth) {
//                    var transPoint = new ui.layout.Point(x, y).transform();
//                    if (!transPoint) return;
//                    ctx.fillText(text,transPoint.X,transPoint.Y,maxWidth);
//                };
//                this.ctx.strokeText = function(text,x,y,maxWidth) {
//                    var transPoint = new ui.layout.Point(x, y).transform();
//                    if (!transPoint) return;
//                    ctx.strokeText(text,transPoint.X,transPoint.Y,maxWidth);
//                };

                //初始化事件
                graph.on('mousemove', graph, function (event) {
                    self.checkMove(event.pageX, event.pageY);
                });
                graph.on('mousewheel', graph, function (event) {
                    self.mouseWheel(event.originalEvent);
                    return false;
                });
                graph.on('mousedown', graph, function (event) {
                    self.mouseDown(event);
                });
                graph.on('mouseup', graph, function (event) {
                    self.mouseUp(event);
                });
                graph.on('mouseleave', graph, function (event) {
                    self.mouseUp(event);
                });

                isLiveGraphEvent = true;
            };

            this.init = function (options) {
                graph = $(options.container);
                if (!graph[0].getContext) return;
                this.ctx = $(graph)[0].getContext("2d");

                config = options.config;
                graphics = options.graphics;
                layout = options.layout;
                system = options.system;
                gridlines = options.gridlines;
                //ui.resize(options.coordinate);
                return ui;
            };
        };

        return ui;
    })();

    return NAURE;
});