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

    NAURE.Graphics.Layout = (function () {

        var layout = function () {

            var system;

            //全局变量
            this.width = 0;
            this.height = 0;
            this.scale = {X:1, Y:1};
            this.offset = {left:0, top:0};

            this.scope = {X:0, Y:0};
            this.coordinate = {X1:-5, Y1:-5, X2:5, Y2:5};

            this.point = {X:0, Y:0};
            this.pixel = {X:0, Y:0};
            this.n = {x:10, y:10};

            //局部变量
            var matrix = [];
            var matrixInvertible = [];
            var startDrag = {X:0, Y:0};
            var prevDrag = {X:0, Y:0};
            var defaultCoordinate = {X1:0, Y1:0, X2:0, Y2:0};
            var startCoordinate = {X1:0, Y1:0, X2:0, Y2:0};

            this.isEqualsCoordinate = function (coordinate1, coordinate2) {

            };

            this.isEqualsPoint = function (point1, point2) {
                return point1.X == point2.X && point1.Y == point1.Y
            };
            this.isDragMove = function () {
                return !this.isEqualsPoint(this.pixel, prevDrag);
            };

            this.absRange = function () {
                return {X:Math.abs(this.scope.X),
                    Y:Math.abs(this.scope.Y)}
            };

            this.refresh = function (options) {
                var opt = $.extend({}, options);

                if (opt.offset) this.offset = {X:opt.offset.left, Y:opt.offset.top};
                if (opt.prevDrag) prevDrag = opt.prevDrag;

                //窗口大小改变时
                this.refreshSize(opt);

                //发生鼠标事件时  【Drag 变化】
                this.refreshDrag(opt);

                //ZOOM
                this.refreshZoom(opt);

                //Update Coordinate
                this.refreshCoordinate(opt);

                var curPoint = system.parseCoordinate(
                    this.toPoint(this.pixel.X, this.pixel.Y)
                );
                //curPoint.X = curPoint.X.format('yyyy-MM-dd HH:mm:ss');
                message.show({content:JSON.stringify({
                    point:curPoint,
                    coordinate:this.coordinate
                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            };

            this.refreshSize = function (opt) {
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

                startCoordinate = utility.clone(this.coordinate);
                defaultCoordinate = utility.clone(this.coordinate);
            };

            this.refreshZoom = function (opt) {
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
                    startCoordinate = utility.clone(this.coordinate);
                }
            };

            this.refreshDrag = function (opt) {
                if (opt.pixel) {
                    if (!this.isEqualsPoint(this.pixel, opt.pixel))
                        prevDrag = utility.clone(this.pixel);
                    this.pixel.X = opt.pixel.X - this.offset.X;
                    this.pixel.Y = opt.pixel.Y - this.offset.Y;
                }

                if (opt.drag == 'START') {
                    startDrag.X = opt.pixel.X - this.offset.X;
                    startDrag.Y = opt.pixel.Y - this.offset.Y;
                    //todo
                    startCoordinate = utility.clone(this.coordinate);
                }

                //todo
                if (opt.drag == 'CONTINUE') {
                    //find the scale of the graph (units per pixel)
                    //this.scale = this.currScale();
                    //dump(scale.x + " " + scale.y + " -- " + startCoordinate.x1 + " " + startCoordinate.y1);
                    //dump(startCoordinate.x1 + " " +(y - startDrag.y) / scale.y);
                    this.coordinate.X1 = startCoordinate.X1 - ((this.pixel.X - startDrag.X) / this.scale.X);
                    this.coordinate.X2 = startCoordinate.X2 - ((this.pixel.X - startDrag.X) / this.scale.X);
                    this.coordinate.Y1 = startCoordinate.Y1 + ((this.pixel.Y - startDrag.Y) / this.scale.Y);
                    this.coordinate.Y2 = startCoordinate.Y2 + ((this.pixel.Y - startDrag.Y) / this.scale.Y);
                }
                if (opt.drag == 'RENEW') {
                    startCoordinate = utility.clone(this.coordinate);
                }
            };

            this.refreshCoordinate = function (opt) {
                if (opt.coordinate) {
                    if (opt.coordinate.X1)
                        this.coordinate.X1 = opt.coordinate.X1;
                    if (opt.coordinate.X2)
                        this.coordinate.X2 = opt.coordinate.X2;
                    if (opt.coordinate.Y1)
                        this.coordinate.Y1 = opt.coordinate.Y1;
                    if (opt.coordinate.Y2)
                        this.coordinate.Y2 = opt.coordinate.Y2;
                }

                this.scope.X = this.coordinate.X2 - this.coordinate.X1;
                this.scope.Y = this.coordinate.Y2 - this.coordinate.Y1;
                this.scale.X = this.width / this.scope.X;
                this.scale.Y = this.height / this.scope.Y;
                // x' =  Sx * x + 0 * y + width / 2
                //y' = 0 * x - y * Sy + height / 2
                matrix = [
                    [this.scale.X, 0, -this.coordinate.X1 * this.scale.X],
                    [0, this.scale.Y, -this.coordinate.Y2 * this.scale.Y],
                    [0, 0, 1]
                ];
                matrixInvertible = [
                    [1 / this.scale.X, 0, this.coordinate.X1],
                    [0, 1 / this.scale.Y, this.coordinate.Y2],
                    [0, 0, 1]
                ];

                this.coordinate.width = this.width;
                this.coordinate.height = this.height;
            };

            this.reset = function () {
                this.coordinate.X1 = defaultCoordinate.X1;
                this.coordinate.Y1 = defaultCoordinate.Y1;
                this.coordinate.X2 = defaultCoordinate.X2;
                this.coordinate.Y2 = defaultCoordinate.Y2;
                startCoordinate = utility.clone(this.coordinate);
                this.scope.X = this.coordinate.X2 - this.coordinate.X1;
                this.scope.Y = this.coordinate.Y2 - this.coordinate.Y1;
                this.scale.X = this.width / this.scope.X;
                this.scale.Y = this.height / this.scope.Y;
                this.refreshCoordinate();
            };

            this.toPixel = function (x, y) {
                if (isNaN(x) || isNaN(y)) {
                    return null;
                }
                if (x > this.coordinate.X2) {
                    x = this.coordinate.X2;
                    //return null;
                }
                if (x < this.coordinate.X1) {
                    x = this.coordinate.X1;
                    //return null;
                }
//                if (point.Y > this.coordinate.Y2) {
//                    //point.Y = this.coordinate.Y2;
//                    //return null;
//                }
//                if (point.Y < this.coordinate.Y1) {
//                    //point.Y = this.coordinate.Y1;
//                    //return null;
//                }
                var result = matrixes.Transform2D(matrix, [x, y]);
                return {X:result[0][0], Y:-result[1][0]};
            };

            this.toPixelX = function (x) {
                return x * matrix[0][0] + matrix[0][2];
            };

            this.toPixelY = function (y) {
                return -(y * this.scale.Y - this.coordinate.Y2 * this.scale.Y);
            };

            this.toPoint = function (x, y) {
                if (isNaN(x) || isNaN(y)) {
                    return null;
                }
                var result = matrixes.Transform2D(matrixInvertible, [x, -y]);
                return {X:result[0][0], Y:result[1][0]};
            };

            this.toPointX = function (x, y) {
            };

            this.toPointY = function (x, y) {
            };

            this.init = function (options) {
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