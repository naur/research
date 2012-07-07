/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/4/12 11:00 AM
 * Description:
 *
 */

define(['jquery', 'naure.message', 'naure.math', 'naure.graph.math'], function ($, NAURE) {

    NAURE.Graph.UI = (function () {
        var width, height, graph, ctx;
        var webkit = /[Ww]eb[kK]it/.test(navigator.userAgent);

        var ui = {
            config:{
                showGridlines:true,
                charHeight:8,
                quality:1,
                zoomFactor:0.1,
                maxgridlines:{x:13, y:13}
            },

            //Gets the scale (pixels per unit)
            getScale:function () {
                return {x:(this.width / (this.startCoord.x2 - this.startCoord.x1)),
                    y:(this.height / (this.startCoord.y2 - this.startCoord.y1))}
            },

            mouseWheel:function (event, delta) {
                if (delta > 0) {
                    this.zoom(this.config.zoomFactor, event);
                }
                else {
                    this.zoom(-this.config.zoomFactor, event);
                }
            },

            mouseDown:function (event) {
                document.body.style.cursor = "hand";
                if (this.mousebutton == 0) {
//                    if (this.currtool == "zoombox") {
//                        this.currtool = "zoombox_active";
//                    }
                    this.startDrag.x = event.pageX - this.canvasX;
                    this.startDrag.y = event.pageY - this.canvasY;
                    this.startCoord = NAURE.Utility.clone(this.currCoord);
                }
                this.mousebutton = 1;
            },

            mouseUp:function (event) {
                //document.body.style.cursor = "auto";
//                if (this.currtool == "zoombox_active") {
//                    this.doZoomBox(this.startDrag.x, this.startDrag.y, event.pageX - this.canvasX, event.pageY - this.canvasY);
//                    this.setTool("pointer");
//                }
//                if (this.currtool == "zoomin") {
//                    if (Math.abs((event.pageX - this.canvasX) - this.startDrag.x) + Math.abs((event.pageY - this.canvasY) - this.startDrag.y) < 5)
//                        this.zoom(0.10, event);
//                }
//                if (this.currtool == "zoomout") {
//                    if (Math.abs((event.pageX - this.canvasX) - this.startDrag.x) + Math.abs((event.pageY - this.canvasY) - this.startDrag.y) < 5)
//                        this.zoom(-0.10, event);
//                }
                this.mousebutton = 0;
                this.startCoord = NAURE.Utility.clone(this.currCoord);
            },

            checkMove:function (x, y) {
                NAURE.Message.show({content:JSON.stringify({X:x, Y:y}), multiple:false});
                if (x == this.prevDrag.x && y == this.prevDrag.y)
                    return;

                if (this.mousebutton == 1) {
                    if (this.currtool == "zoombox" || this.currtool == "zoombox_active") {    //ZOOM BOX
                        this.draw();
                        this.ctx.strokeStyle = "rgb(150,150,150)";
                        this.ctx.strokeRect(this.startDrag.x, this.startDrag.y, x - this.startDrag.x, y - this.startDrag.y);
                    }
                    else { //CLICK AND DRAG
                        //find the scale of the graph (units per pixel)
                        this.scale = this.getScale();
                        //dump(scale.x + " " + scale.y + " -- " + this.startCoord.x1 + " " + this.startCoord.y1);
                        //dump(this.startCoord.x1 + " " +(y - this.startDrag.y) / scale.y);
                        this.currCoord.x1 = this.startCoord.x1 - ((x - this.startDrag.x) / this.scale.x);
                        this.currCoord.x2 = this.startCoord.x2 - ((x - this.startDrag.x) / this.scale.x);
                        this.currCoord.y1 = this.startCoord.y1 + ((y - this.startDrag.y) / this.scale.y);
                        this.currCoord.y2 = this.startCoord.y2 + ((y - this.startDrag.y) / this.scale.y);

                        this.draw();
                    }
                }
                else if (this.currtool == "trace") {    //TRACE
                    this.draw();
                    this.drawTrace(this.getEquation(this.currEq), "#000000", x / scale.x + this.currCoord.x1);
                }
                else if (this.currtool == "vertex") {
                    this.draw();
                    this.drawVertex(this.getEquation(this.currEq), this.getColor(this.currEq), x);
                }
                else if (this.currtool == "root") {
                    this.draw();
                    this.drawRoot(this.getEquation(this.currEq), this.getColor(this.currEq), x);
                }
                else if (this.currtool == "intersect") {
                    this.draw();
                    this.drawIntersect(this.getEquation(this.currEq), this.getColor(this.currEq), x);
                }
                else if (this.currtool == "derivative") {
                    this.draw();
                    this.drawDerivative(this.getEquation(this.currEq), this.getColor(this.currEq), x);
                }
                this.prevDrag = {x:x, y:y};
            },

            zoom:function (scale, event) {
                range = this.getRange();
                if (event) {
                    mousex = event.pageX - this.canvasX;
                    mousey = event.pageY - this.canvasY;
                    mousetop = 1 - (mousey / this.height);	//if we divide the screen into two halves based on the position of the mouse, this is the top half
                    mouseleft = mousex / this.width;	//as above, but the left hald
                    this.currCoord.x1 += range.x * scale * mouseleft;
                    this.currCoord.y1 += range.y * scale * mousetop;
                    this.currCoord.x2 -= range.x * scale * (1 - mouseleft);
                    this.currCoord.y2 -= range.y * scale * (1 - mousetop);
                }
                else {
                    this.currCoord.x1 += range.x * scale;
                    this.currCoord.y1 += range.y * scale;
                    this.currCoord.x2 -= range.x * scale;
                    this.currCoord.y2 -= range.y * scale;
                }
                this.startCoord = NAURE.Utility.clone(this.currCoord);
                this.draw();
            },

            //get the range of values on the screen
            getRange:function () {
                return {x:Math.abs(this.startCoord.x2 - this.startCoord.x1),
                    y:Math.abs(this.startCoord.y2 - this.startCoord.y1)}
            },

            clearScreen:function () {
                this.ctx.fillStyle = "rgb(255,255,255)";
                this.ctx.fillRect(0, 0, this.width, this.height);
            },

            resizeGraph:function () {
                oldheight = this.height;
                oldwidth = this.width;
                this.width = this.graph.width();
                this.height = this.graph.height();

                //Resize the elements
                this.graph.attr('width', this.width);
                this.graph.attr('height', this.height);
                this.ctx.height = this.height;
                this.ctx.width = this.width;

                //Compute the new boundaries of the graph
                this.currCoord.x1 *= (this.width / oldwidth);
                this.currCoord.x2 *= (this.width / oldwidth);
                this.currCoord.y1 *= (this.height / oldheight);
                this.currCoord.y2 *= (this.height / oldheight);
                this.startCoord = NAURE.Utility.clone(this.currCoord);

                //Compute how many grid lines to show
                this.config.maxgridlines.x = 0.015 * this.width;
                this.config.maxgridlines.y = 0.015 * this.height;
            },

            Graph:function (n, disabled) {
                var latex = n;
                var auto = 0;
                if (n) {
                    auto = true;
                } else {
                    //Sample function
                    //latex = randfunc();
                    latex = 'y=x^2';
                }
                var t = {};
                var c = NAURE.Graph.Math.compile(latex);

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
                t.gid = random_hash();
                t.disabled = disabled;
                t.color = app.ui.colors.free.pop();
                if (t.color == undefined) {
                    //We ran out of colours!
                    t.color = "#000";
                }
                if (auto) {
                    t.auto = true;
                }

                //Create html <li> node.
                t.node = app.ui.add(t);

                return t;
            },

            draw:function (options) {
                var opt = $.extend({}, ui.config, options);

                if (opt.showGridlines)
                    this.gridlines();
//                for (var i in this.lines) {
//                    //dump(this.lines[i].equation);
//                    equation = Calc.parseEquation(this.lines[i].equation, true);
//                    this.drawEquation(equation, this.lines[i].color);
//                }

                NAURE.Message.show({content:JSON.stringify({
                    size:{width:this.width, height:this.height},
                    startCoord:this.startCoord,
                    currCoord:this.currCoord
                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            drawLine:function (options) {
                var opt = $.extend({
                    expression:'y=x^2'
                }, ui.config, options);

//                this.ctx.fillStyle = '#00f';
//                this.ctx.strokeStyle = '#f00';

                var graph = new this.Graph('y=x^2', true);
                graph.disabled = true;

                graph.plot(this.ctx);

//                this.ctx.beginPath();
//                // Start from the top-left point.
//
//                this.currCoord.x1
//
//                this.ctx.moveTo(10, 10); // give the (x,y) coordinates
//
//                this.ctx.lineTo(100, 10);
//                this.ctx.lineTo(10, 100);
//                //this.ctx.lineTo(10, 10);
//
//                // Done! Now fill the shape, 和 draw the stroke.
//                // Note: your shape will not be visible until you call any of the two methods.
//                //this.ctx.fill();
//                this.ctx.stroke();
//                this.ctx.closePath();
            },

            gridlines:function () {
                this.clearScreen();

                x1 = this.currCoord.x1;
                x2 = this.currCoord.x2;
                y1 = this.currCoord.y1;
                y2 = this.currCoord.y2;

                xrange = x2 - x1;
                yrange = y2 - y1;

                //Calculate the numeric value of each pixel (scale of the graph)
                xscale = xrange / this.width;
                yscale = yrange / this.height;

                //Calculate the scale of the gridlines
                for (i = 0.000000000001, c = 0; xrange / i > this.config.maxgridlines.x - 1; c++) {
                    if (c % 3 == 1) i *= 2.5;    //alternating between 2, 5 and 10
                    else i *= 2;
                }
                this.xgridscale = i;

                //do the same for the y-axis
                for (i = 0.000000000001, c = 0; yrange / i > this.config.maxgridlines.y - 1; c++) {
                    if (c % 3 == 1) i *= 2.5;
                    else i *= 2;
                }
                this.ygridscale = i;

                this.ctx.font = "8pt monospace";	//set the font
                this.ctx.textAlign = "center";

                xaxis = yaxis = null;

                //currx is the current gridline being drawn, as a numerical value (not a pixel value)
                currx = NAURE.Math.arbFloor(x1, this.xgridscale);	//set it to before the lowest x-value on the screen
                curry = NAURE.Math.arbFloor(y1, this.ygridscale);
                xmainaxis = this.config.charHeight;	//the next two variables are the axis on which text is going to be placed
                ymainaxis = -1;
                currx = Math.round(currx * 100000000000) / 100000000000;	//round to the closest 0.00000001
                curry = Math.round(curry * 100000000000) / 100000000000;

                if (y2 >= 0 && y1 <= 0)    //y=0 appears on the screen - move the text to follow
                    xmainaxis = this.height - ((0 - y1) / (y2 - y1)) * this.height + (this.config.charHeight * 1.2);
                else if (y1 > 0)    //the smallest value of y is above the screen - the x-axis labels get pushed to the top of the screen
                    xmainaxis = this.height - 1;

                //the x-axis labels have to be a certain distance from the bottom of the screen
                if (xmainaxis > this.height - (this.config.charHeight / 2))
                    xmainaxis = this.height - 1;

                //do the same as above with the y-axis
                if (x2 >= 0 && x1 <= 0)    //y-axis in the middle of the screen
                    ymainaxis = ((0 - x1) / (x2 - x1)) * this.width - 2;
                else if (x2 < 0)    //y-axis on the right side of the screen
                    ymainaxis = this.width - 2;

                if (ymainaxis < (this.ctx.measureText(curry).width + 1)) {
                    ymainaxis = -1;
                }

                sigdigs = String(currx).length + 3;
                //VERTICAL LINES
                for (i = 0; i < this.config.maxgridlines.x; i++) {
                    xpos = ((currx - x1) / (x2 - x1)) * this.width;	//position of the line (in pixels)
                    //make sure it is on the screen
                    if (xpos - 0.5 > this.width + 1 || xpos < 0) {
                        currx += this.xgridscale;
                        continue;
                    }

                    //currx = Calc.roundToSignificantFigures(currx, sigdigs);
                    currx = Math.round(currx * 100000000000) / 100000000000;

                    if (currx == 0)
                        xaxis = xpos;

//                    if (jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(currx) % Calc.roundFloat((this.xgridscale * 2)) == 0)) {
                    this.ctx.fillStyle = "rgb(190,190,190)";
                    this.ctx.fillRect(xpos - 0.5, 0, 1, this.height);
//                    }

                    this.ctx.fillStyle = "rgb(0,0,0)";

                    //Draw label
                    if (currx != 0) {
                        xtextwidth = this.ctx.measureText(currx).width;
                        if (xpos + xtextwidth * 0.5 > this.width) //cannot overflow the screen
                            xpos = this.width - xtextwidth * 0.5 + 1;
                        else if (xpos - xtextwidth * 0.5 < 0)
                            xpos = xtextwidth * 0.5 + 1;
                        this.ctx.fillText(currx, xpos, xmainaxis);
                    }

                    currx += this.xgridscale;

                }
                this.ctx.textAlign = "right";
                sigdigs = String(curry).length + 3;

                //HORIZONTAL LINES
                for (i = 0; i < this.config.maxgridlines.y; i++) {
                    ypos = this.height - ((curry - y1) / (y2 - y1)) * this.height;	//position of the line (in pixels)
                    //make sure it is on the screen
                    if (ypos - 0.5 > this.height + 1 || ypos < 0) {
                        curry += this.ygridscale;
                        continue;
                    }

                    //curry = Calc.roundToSignificantFigures(curry, sigdigs);
                    curry = Math.round(curry * 100000000000) / 100000000000;

                    if (curry == 0)
                        yaxis = ypos;

//                    if (jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(curry) % (Calc.roundFloat(this.ygridscale * 2)) == 0)) {
                    this.ctx.fillStyle = "rgb(190,190,190)";
                    this.ctx.fillRect(0, ypos - 0.5, this.width, 1);
//                    }

                    this.ctx.fillStyle = "rgb(0,0,0)";

                    //Draw label
                    if (curry != 0) {
                        ytextwidth = this.ctx.measureText(curry).width;
                        if (ypos + (this.config.charHeight / 2) > this.height) //cannot overflow the screen
                            ypos = this.height - (this.config.charHeight / 2) - 1;
                        if (ypos - 4 < 0)
                            ypos = 4;
                        xaxispos = ymainaxis;
                        if (ymainaxis == -1)
                            xaxispos = ytextwidth + 1;
                        this.ctx.fillText(curry, xaxispos, ypos + 3);
                    }
                    curry += this.ygridscale;
                }
                //Draw the axis
                if (xaxis)
                    this.ctx.fillRect(xaxis - 0.5, 0, 1, this.height);
                if (yaxis)
                    this.ctx.fillRect(0, yaxis - 0.5, this.width, 1);
            },

            render:function (options) {
                var opt = $.extend({
                    canvas:null,
                    data:null
                }, options);
            },

            init:function (options) {
                var opt = $.extend({
                    container:null
                }, ui.config, options);

                this.graph = $(opt.container);
                if (!this.graph[0].getContext) return;
                this.width = this.graph.width();
                this.height = this.graph.height();
                this.ctx = $(this.graph)[0].getContext("2d");
                this.startDrag = {x:0, y:0};
                this.prevDrag = {x:0, y:0};
                this.startCoord = {x1:0, y1:0, x2:0, y2:0};
                this.currCoord = {x1:-5, y1:-5, x2:5, y2:5};
                this.mousebutton = 0;
                this.calccache = new Object;
                this.lines = [];
                this.canvasX = this.graph.offset().left;
                this.canvasY = this.graph.offset().top;

                if (webkit) {
                    this.ctx.move = function (px, py, pz) {
                        return ctx.moveTo(scalex * px - cx, cy - scaley * py);
                    };
                    this.ctx.line = function (px, py, pz) {
                        return ctx.lineTo(scalex * px - cx, cy - scaley * py);
                    };
                } else {
                    this.ctx.move = function (px, py, pz) {
                        if (isNaN(px) || isNaN(py)) {
                            return;
                        }
                        if (px > overright) {
                            px = overright;
                        }
                        if (px < overleft) {
                            px = overleft;
                        }
                        if (py > overtop) {
                            py = overtop;
                        }
                        if (py < overbottom) {
                            py = overbottom;
                        }
                        return ctx.moveTo(scalex * px - cx, cy - scaley * py);
                        return;
                        if (!isNaN(py)) {
                            if (py > boundtop * 4) {
                                ctx.moveTo(scalex * (px - cx), scaley * (cy - boundtop * 4));
                                return;
                            } else if (py < boundbottom * 4) {
                                ctx.moveTo(scalex * (px - cx), scaley * (cy - boundbottom * 4));
                                return;
                            }
                            ctx.moveTo(scalex * (px + cx), scaley * (-cy - py));
                        }
                    };
                    this.ctx.line = function (px, py, pz) {
                        if (isNaN(px) || isNaN(py)) {
                            return;
                        }
                        if (px > overright) {
                            px = overright;
                        }
                        if (px < overleft) {
                            px = overleft;
                        }
                        if (py > overtop) {
                            py = overtop;
                        }
                        if (py < overbottom) {
                            py = overbottom;
                        }
                        return ctx.lineTo(scalex * px - cx, cy - scaley * py);
                        ctx.lineTo(scalex * px - cx, cy - scaley * py);
                        return;
                        if (!isNaN(py)) {
                            if (py > boundtop * 4) {
                                ctx.lineTo(scalex * (px - cx), scaley * (cy - boundtop * 4));
                                return;
                            } else if (py < boundbottom * 4) {
                                ctx.lineTo(scalex * (px - cx), scaley * (cy - boundbottom * 4));
                                return;
                            }
                            ctx.lineTo(scalex * (px - cx), scaley * (cy - py));
                        }
                    };
                }

                //初始化 Graph
                this.resizeGraph();
                this.draw(opt);
                //重置 Graph
                this.currCoord = {x1:-5 * (this.width / this.height), y1:-5, x2:5 * (this.width / this.height), y2:5};
                this.startCoord = NAURE.Utility.clone(this.currCoord);
                this.draw(opt);

                //事件
                var self = this;
                this.graph.on('mousemove', this.graph, function (event) {
                    self.canvasX = self.graph.offset().left;
                    self.canvasY = self.graph.offset().top;
                    self.checkMove(event.pageX - self.canvasX, event.pageY - self.canvasY);
                });
                this.graph.on('mousewheel', this.graph, function (event) {
                    self.mouseWheel(event.originalEvent, event.originalEvent.wheelDelta);
                    return false;
                });
                this.graph.on('mousedown', this.graph, function (event) {
                    self.mouseDown(event);
                });
                this.graph.on('mouseup', this.graph, function (event) {
                    self.mouseUp(event);
                });


//                $(window).resize(function() {
//                    if($("#sidewrapper").is(":visible"))
//                        $("#graph_wrapper").width($("#wrapper").width() - $("#sidewrapper").width());
//                    else
//                        $("#graph_wrapper").width($("#wrapper").width());
//                    self.resizeGraph($("#graph_wrapper").width(), $("#graph_wrapper").height());
//                });

            }
        };

        //this.ui.init();

        return ui;
    })();

    $.fn.NAURE_Graph_UI = function (options) {
        if (!options)
            options = {};
        options.container = this;
        NAURE.Graph.UI.init(options);
        return this;
    };

    return NAURE;
});