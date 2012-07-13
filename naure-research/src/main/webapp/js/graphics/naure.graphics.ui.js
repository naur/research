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
var ctx;

//function anonymous(ctx) {
//    ctx.beginPath();
//    var x = boundleft;
//    ctx.move(x, 81);
//    for (var x = boundleft; x < boundright; x += (boundright - boundleft) / width) {
//        ctx.line(x, 81);
//    }
//    ctx.stroke();
//    ctx.stroke();
//}


//                ui.ctx.beginPath();
//
//
//                var x = ui.layout.currCoord.X1 //boundleft;
//                ui.ctx.move({X:x, Y:pow(x, 2)});
//                for (var x = ui.layout.currCoord.X1; x < ui.layout.currCoord.X2; x += (ui.layout.currCoord.X2 - ui.layout.currCoord.X1) / ui.layout.width) {
//                    ui.ctx.line({X:x, Y:pow(x, 2)});
//                }
//                ui.ctx.stroke();

define(['jquery', 'naure', 'naure.math', 'naure.graphics', 'math'], function ($, NAURE) {

    NAURE.Graphics.UI = (function () {
        var ui = {
            container:null,
            layout:null,
            graph:null,
            ctx:null,
            graphics:null,
            clear:function () {
                this.ctx.fillStyle = "rgb(255,255,255)";
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

                this.gridlines();

                this.ctx.fillStyle = '#00f';

                for (key in opt.lines) {
                    //this.drawLine({expression:opt.lines[key]});
                    if (!opt.lines.hasOwnProperty(key)) break
                    this.drawLine(opt.lines[key]);
                }


                //opt.graphs[key].plot(this.ctx);
                //                var graphs = [];
//                for (key in this.lines) {
//                    if (!this.lines.hasOwnProperty(key)) break;
//                    graphs.push(new graphics.system.Graph(this.lines[key].equation, true, this.lines[key].color));
//                }
            },

            drawLine:function (options) {
                var opt = $.extend({}, ui.config, options);
                this.ctx.strokeStyle = opt.color;
                new ui.graphics.system.Graph(opt.equation, true, opt.color).plot(this.ctx);

//                ui.ctx.beginPath();
//
//
//                var x = ui.layout.currCoord.X1 //boundleft;
//                ui.ctx.move({X:x, Y:pow(x, 2)});
//                for (var x = ui.layout.currCoord.X1; x < ui.layout.currCoord.X2; x += (ui.layout.currCoord.X2 - ui.layout.currCoord.X1) / ui.layout.width) {
//                    ui.ctx.line({X:x, Y:pow(x, 2)});
//                }
//                ui.ctx.stroke();
//
//
//                // Done! Now fill the shape, 和 draw the stroke.
//                // Note: your shape will not be visible until you call any of the two methods.
//                //ui.ctx.fill();
//                ui.ctx.stroke();
//                //ui.ctx.closePath();
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
                var opt = $.extend({}, this.config.gridlines, options);

                if (!opt.show) return;

                opt.currCoord = this.layout.currCoord;
                opt.range = this.layout.range;
                opt.width = this.layout.width;
                opt.height = this.layout.height;

                //Calculate the scale of the gridlines
                for (i = 0.000000000001, c = 0; opt.range.X / i > opt.maxgridlines.X - 1; c++) {
                    if (c % 3 == 1) i *= 2.5;    //alternating between 2, 5 and 10
                    else i *= 2;
                }
                opt.xgridscale = i;

                //do the same for the y-axis
                for (i = 0.000000000001, c = 0; opt.range.Y / i > opt.maxgridlines.Y - 1; c++) {
                    if (c % 3 == 1) i *= 2.5;
                    else i *= 2;
                }
                opt.ygridscale = i;

                opt.xaxis = opt.yaxis = null;

                //currx is the current gridline being drawn, as a numerical value (not a pixel value)
                opt.currx = NAURE.Math.arbFloor(opt.currCoord.X1, opt.xgridscale);	//set it to before the lowest x-value on the screen
                opt.curry = NAURE.Math.arbFloor(opt.currCoord.Y1, opt.ygridscale);
                opt.ymainaxis = -1;
                opt.currx = Math.round(opt.currx * 100000000000) / 100000000000;	//round to the closest 0.00000001
                opt.curry = Math.round(opt.curry * 100000000000) / 100000000000;
                opt.xmainaxis = opt.charHeight;	//the next two variables are the axis on which text is going to be placed

                if (opt.currCoord.Y2 >= 0 && opt.currCoord.Y1 <= 0)    //y=0 appears on the screen - move the text to follow
                    opt.xmainaxis = opt.height - ((0 - opt.currCoord.Y1) / (opt.currCoord.Y2 - opt.currCoord.Y1)) * opt.height + (opt.charHeight * 1.2);
                else if (opt.currCoord.Y1 > 0)    //the smallest value of y is above the screen - the x-axis labels get pushed to the top of the screen
                    opt.xmainaxis = opt.height - 1;

                //the x-axis labels have to be a certain distance from the bottom of the screen
                if (opt.xmainaxis > opt.height - (opt.charHeight / 2))
                    opt.xmainaxis = opt.height - 1;

                //do the same as above with the y-axis
                if (opt.currCoord.X2 >= 0 && opt.currCoord.X1 <= 0)    //y-axis in the middle of the screen
                    opt.ymainaxis = ((0 - opt.currCoord.X1) / (opt.currCoord.X2 - opt.currCoord.X1)) * opt.width - 2;
                else if (opt.currCoord.X2 < 0)    //y-axis on the right side of the screen
                    opt.ymainaxis = opt.width - 2;

                if (opt.ymainaxis < (this.ctx.measureText(opt.curry).width + 1)) {
                    opt.ymainaxis = -1;
                }

                this.gridlinesVertical(opt);
                this.gridlinesHorizontal(opt);

                //Draw the axis
                if (opt.xaxis)
                    this.ctx.fillRect(opt.xaxis - 0.5, 0, 1, opt.height);
                if (opt.yaxis)
                    this.ctx.fillRect(0, opt.yaxis - 0.5, opt.width, 1);
            },
            //VERTICAL LINES
            gridlinesVertical:function (opt) {
                this.ctx.font = "8pt monospace";	//set the font
                this.ctx.textAlign = "center";
                opt.sigdigs = String(opt.currx).length + 3;

                for (i = 0; i < opt.maxgridlines.X; i++) {
                    xpos = ((opt.currx - opt.currCoord.X1) / (opt.currCoord.X2 - opt.currCoord.X1)) * opt.width;	//position of the line (in pixels)
                    //make sure it is on the screen
                    if (xpos - 0.5 > opt.width + 1 || xpos < 0) {
                        opt.currx += opt.xgridscale;
                        continue;
                    }

                    //currx = Calc.roundToSignificantFigures(currx, opt.sigdigs);
                    opt.currx = Math.round(opt.currx * 100000000000) / 100000000000;

                    if (opt.currx == 0)
                        opt.xaxis = xpos;

//                    if (jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(currx) % Calc.roundFloat((this.xgridscale * 2)) == 0)) {
                    this.ctx.fillStyle = "rgb(190,190,190)";
                    this.ctx.fillRect(xpos - 0.5, 0, 1, opt.height);
//                    }

                    this.ctx.fillStyle = "rgb(0,0,0)";

                    //Draw label
                    if (opt.currx != 0) {
                        xtextwidth = this.ctx.measureText(opt.currx).width;
                        if (xpos + xtextwidth * 0.5 > opt.width) //cannot overflow the screen
                            xpos = opt.width - xtextwidth * 0.5 + 1;
                        else if (xpos - xtextwidth * 0.5 < 0)
                            xpos = xtextwidth * 0.5 + 1;
                        this.ctx.fillText(opt.currx, xpos, opt.xmainaxis);
                    }

                    opt.currx += opt.xgridscale;

                }
            },
            //HORIZONTAL LINES
            gridlinesHorizontal:function (opt) {
                this.ctx.textAlign = "right";
                opt.sigdigs = String(opt.curry).length + 3;

                for (i = 0; i < opt.maxgridlines.Y; i++) {
                    ypos = opt.height - ((opt.curry - opt.currCoord.Y1) / (opt.currCoord.Y2 - opt.currCoord.Y1)) * opt.height;	//position of the line (in pixels)
                    //make sure it is on the screen
                    if (ypos - 0.5 > opt.height + 1 || ypos < 0) {
                        opt.curry += opt.ygridscale;
                        continue;
                    }

                    //curry = Calc.roundToSignificantFigures(curry, opt.sigdigs);
                    opt.curry = Math.round(opt.curry * 100000000000) / 100000000000;

                    if (opt.curry == 0)
                        opt.yaxis = ypos;

//                    if (jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(curry) % (Calc.roundFloat(this.ygridscale * 2)) == 0)) {
                    this.ctx.fillStyle = "rgb(190,190,190)";
                    this.ctx.fillRect(0, ypos - 0.5, opt.width, 1);
//                    }

                    this.ctx.fillStyle = "rgb(0,0,0)";

                    //Draw label
                    if (opt.curry != 0) {
                        ytextwidth = this.ctx.measureText(opt.curry).width;
                        if (ypos + (opt.charHeight / 2) > opt.height) //cannot overflow the screen
                            ypos = opt.height - (opt.charHeight / 2) - 1;
                        if (ypos - 4 < 0)
                            ypos = 4;
                        xaxispos = opt.ymainaxis;
                        if (opt.ymainaxis == -1)
                            xaxispos = ytextwidth + 1;
                        this.ctx.fillText(opt.curry, xaxispos, ypos + 3);
                    }
                    opt.curry += opt.ygridscale;
                }
            },

            init:function (options) {
                var opt = $.extend({}, options);
                ui.graph = $(opt.container);
                if (!ui.graph[0].getContext) return;
                ui.ctx = $(ui.graph)[0].getContext("2d");
                ui.layout = opt.layout;
                ui.resize();

                ctx = ui.ctx;

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