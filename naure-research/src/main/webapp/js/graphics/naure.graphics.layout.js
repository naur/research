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

define(['jquery', 'naure', 'naure.math.matrixes', 'naure.graphics', 'naure.message'], function ($, NAURE) {

    var matrixes = NAURE.Math.Matrixes;
    var message = NAURE.Message;
    var utility = NAURE.Utility;
    var system;

    NAURE.Graphics.Layout = (function () {
        var layout = {
            //全局变量
            width:0,
            height:0,
            scale:{X:1, Y:1},
            offset:{left:0, top:0},

            scope:{X:0, Y:0},
            coordinate:{X1:-5, Y1:-5, X2:5, Y2:5},

            point:{X:0, Y:0},
            pixel:{X:0, Y:0},
            n:{x:10, y:10},

            //局部变量
            matrix:[],
            matrixInvertible:[],
            startDrag:{X:0, Y:0},
            prevDrag:{X:0, Y:0},
            defaultCoordinate:{X1:0, Y1:0, X2:0, Y2:0},
            startCoordinate:{X1:0, Y1:0, X2:0, Y2:0},

            isEqualsCoordinate:function (coordinate1, coordinate2) {

            },

            isEqualsPoint:function (point1, point2) {
                return point1.X == point2.X && point1.Y == point1.Y
            },
            isDragMove:function () {
                return !this.isEqualsPoint(this.pixel, this.prevDrag);
            },

            absRange:function () {
                return {X:Math.abs(this.scope.X),
                    Y:Math.abs(this.scope.Y)}
            },


            refresh:function (options) {
                var opt = $.extend({}, options);

                if (opt.offset) this.offset = {X:opt.offset.left, Y:opt.offset.top};
                if (opt.prevDrag) this.prevDrag = opt.prevDrag;

                //窗口大小改变时
                this.refreshSize(opt);

                //发生鼠标事件时  【Drag 变化】
                this.refreshDrag(opt);

                //ZOOM
                this.refreshZoom(opt);

                //Update Coordinate
                this.refreshCoordinate(opt);

                var curPoint = system.parseCoordinate(
                    layout.toPoint(this.pixel.X, this.pixel.Y)
                );
                //curPoint.X = curPoint.X.format('yyyy-MM-dd HH:mm:ss');
                message.show({content:JSON.stringify({
                    point:curPoint,
                    coordinate:layout.coordinate
                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            refreshSize:function (opt) {
                if (!opt.width || !opt.height)  return;

                var oldheight = this.height;
                var oldwidth = this.width;
                this.width = opt.width;
                this.height = opt.height;

//                var autoRatio = {};
//                if (oldheight == 0) {
//                    autoRatio.X = this.width / this.height;
//                    autoRatio.Y = autoRatio.X;
//                } else {
//                    autoRatio.X = this.width / oldwidth;
//                    autoRatio.Y = this.height / oldheight;
//                }

//                if (oldheight != 0) {
//                    //Compute the new boundaries of the graph
//                    this.coordinate.X1 *= autoRatio.X;
//                    this.coordinate.X2 *= autoRatio.X;
//                    this.coordinate.Y1 *= autoRatio.Y;
//                    this.coordinate.Y2 *= autoRatio.Y;
//                }

                var autoRatio = this.width / this.height;
                if (this.coordinate.X1 == this.coordinate.Y1)
                    this.coordinate.X1 *= autoRatio;
                if (this.coordinate.X2 == this.coordinate.Y2)
                    this.coordinate.X2 *= autoRatio;

                if (this.coordinate.X1 == this.coordinate.X2 || this.coordinate.Y1 == this.coordinate.Y2)
                    throw 'coordinate init error! ';

                this.startCoordinate = utility.clone(this.coordinate);
                this.defaultCoordinate = utility.clone(this.coordinate);
            },
            refreshZoom:function (opt) {
                if (opt.zoom) {
                    opt.zoom = system.zoomAxis(opt.zoom);
                    if (opt.zoom.X) {
                        var mouseleft = (opt.zoom.X - this.offset.X) / this.width;	//as above, but the left hald
                        this.coordinate.X1 += this.scope.X * opt.zoom.Scale * mouseleft;
                        this.coordinate.X2 -= this.scope.X * opt.zoom.Scale * (1 - mouseleft);
                    }
                    if (opt.zoom.Y) {
                        var mousetop = 1 - ((opt.zoom.Y - this.offset.Y) / this.height);
                        this.coordinate.Y1 += this.scope.Y * opt.zoom.Scale * mousetop;
                        this.coordinate.Y2 -= this.scope.Y * opt.zoom.Scale * (1 - mousetop);
                    }
                    if (!opt.zoom.X && !opt.zoom.Y) {
                        this.coordinate.X1 += this.scope.X * opt.zoom.Scale;
                        this.coordinate.Y1 += this.scope.Y * opt.zoom.Scale;
                        this.coordinate.X2 -= this.scope.X * opt.zoom.Scale;
                        this.coordinate.Y2 -= this.scope.Y * opt.zoom.Scale;
                    }
                    this.startCoordinate = utility.clone(this.coordinate);
                }
            },
            refreshDrag:function (opt) {
                if (opt.pixel) {
                    if (!this.isEqualsPoint(this.pixel, opt.pixel))
                        this.prevDrag = utility.clone(this.pixel);
                    this.pixel.X = opt.pixel.X - this.offset.X;
                    this.pixel.Y = opt.pixel.Y - this.offset.Y;
                }

                if (opt.drag == 'START') {
                    this.startDrag.X = opt.pixel.X - this.offset.X;
                    this.startDrag.Y = opt.pixel.Y - this.offset.Y;
                    //todo
                    this.startCoordinate = utility.clone(this.coordinate);
                }

                //todo
                if (opt.drag == 'CONTINUE') {
                    //find the scale of the graph (units per pixel)
                    //this.scale = this.currScale();
                    //dump(scale.x + " " + scale.y + " -- " + this.startCoordinate.x1 + " " + this.startCoordinate.y1);
                    //dump(this.startCoordinate.x1 + " " +(y - this.startDrag.y) / scale.y);
                    this.coordinate.X1 = this.startCoordinate.X1 - ((this.pixel.X - this.startDrag.X) / this.scale.X);
                    this.coordinate.X2 = this.startCoordinate.X2 - ((this.pixel.X - this.startDrag.X) / this.scale.X);
                    this.coordinate.Y1 = this.startCoordinate.Y1 + ((this.pixel.Y - this.startDrag.Y) / this.scale.Y);
                    this.coordinate.Y2 = this.startCoordinate.Y2 + ((this.pixel.Y - this.startDrag.Y) / this.scale.Y);
                }
                if (opt.drag == 'RENEW') {
                    this.startCoordinate = utility.clone(this.coordinate);
                }
            },

            refreshCoordinate:function (opt) {
                if (opt.coordinate) {
                    if (opt.coordinate.X1)
                        layout.coordinate.X1 = opt.coordinate.X1;
                    if (opt.coordinate.X2)
                        layout.coordinate.X2 = opt.coordinate.X2;
                    if (opt.coordinate.Y1)
                        layout.coordinate.Y1 = opt.coordinate.Y1;
                    if (opt.coordinate.Y2)
                        layout.coordinate.Y2 = opt.coordinate.Y2;
                }

                this.scope.X = this.coordinate.X2 - this.coordinate.X1;
                this.scope.Y = this.coordinate.Y2 - this.coordinate.Y1;
                this.scale.X = this.width / this.scope.X;
                this.scale.Y = this.height / this.scope.Y;
                // x' =  Sx * x + 0 * y + width / 2
                //y' = 0 * x - y * Sy + height / 2
                this.matrix = [
                    [this.scale.X, 0, -this.coordinate.X1 * this.scale.X],
                    [0, this.scale.Y, -this.coordinate.Y2 * this.scale.Y],
                    [0, 0, 1]
                ];
                this.matrixInvertible = [
                    [1 / this.scale.X, 0, this.coordinate.X1],
                    [0, 1 / this.scale.Y, this.coordinate.Y2],
                    [0, 0, 1]
                ];

                this.coordinate.width = this.width;
                this.coordinate.height = this.height;
            },

            reset:function () {
                this.coordinate.X1 = this.defaultCoordinate.X1;
                this.coordinate.Y1 = this.defaultCoordinate.Y1;
                this.coordinate.X2 = this.defaultCoordinate.X2;
                this.coordinate.Y2 = this.defaultCoordinate.Y2;
                this.startCoordinate = utility.clone(this.coordinate);
                this.scope.X = this.coordinate.X2 - this.coordinate.X1;
                this.scope.Y = this.coordinate.Y2 - this.coordinate.Y1;
                this.scale.X = this.width / this.scope.X;
                this.scale.Y = this.height / this.scope.Y;
                this.refreshCoordinate();
            },

            toPixel:function (x, y) {
                if (isNaN(x) || isNaN(y)) {
                    return null;
                }
                if (x > layout.coordinate.X2) {
                    x = layout.coordinate.X2;
                    //return null;
                }
                if (x < layout.coordinate.X1) {
                    x = layout.coordinate.X1;
                    //return null;
                }
//                if (point.Y > layout.coordinate.Y2) {
//                    //point.Y = layout.coordinate.Y2;
//                    //return null;
//                }
//                if (point.Y < layout.coordinate.Y1) {
//                    //point.Y = layout.coordinate.Y1;
//                    //return null;
//                }
                var result = matrixes.Transform2D(layout.matrix, [x, y]);
                return {X:result[0][0], Y:-result[1][0]};
            },
            toPixelX:function (x) {
                return x * layout.matrix[0][0] + layout.matrix[0][2];
            },
            toPixelY:function (y) {
                return -(y * layout.scale.Y - layout.coordinate.Y2 * layout.scale.Y);
            },

            toPoint:function (x, y) {
                if (isNaN(x) || isNaN(y)) {
                    return null;
                }
                var result = matrixes.Transform2D(layout.matrixInvertible, [x, -y]);
                return {X:result[0][0], Y:result[1][0]};
            },
            toPointX:function (x, y) {
            },
            toPointY:function (x, y) {
            },

            init:function (options) {
                //todo
                //graphics = options.graphics;
                system = options.system;
                return layout;
            }
        };

        return layout;
    })();

    return NAURE;
});