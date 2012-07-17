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

define(['jquery', 'naure', 'naure.math', 'naure.graphics', 'naure.message'], function ($, NAURE) {

    NAURE.Graphics.Layout = (function () {
        var layout = {
            //全局变量
            width:0,
            height:0,
            scale:{X:1, Y:1},
            offset:{left:0, top:0},
            range:{X:0, Y:0}, //scope
            limits:{X1:-5, Y1:-5, X2:5, Y2:5},
            point:{X:0, Y:0},
            pixel:{X:0, Y:0},
            n:{x:10, y:10},
            metrix:[],

            //局部变量
            startDrag:{X:0, Y:0},
            prevDrag:{X:0, Y:0},
            defaultLimits:{X1:0, Y1:0, X2:0, Y2:0},
            startLimits:{X1:0, Y1:0, X2:0, Y2:0},


            isEqualsPoint:function (point1, point2) {
                return point1.X == point2.X && point1.Y == point1.Y
            },
            isDragMove:function () {
                return !this.isEqualsPoint(this.pixel, this.prevDrag);
            },

            absRange:function () {
                return {X:Math.abs(this.range.X),
                    Y:Math.abs(this.range.Y)}
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
                this.refreshCoordinate();

                NAURE.Message.show({content:JSON.stringify(coordinate).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
                //NAURE.Message.show({content:JSON.stringify(this.transform(coordinate.point)).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            refreshSize:function (opt) {
                if (!opt.width || !opt.height)  return;

                var oldheight = this.height;
                var oldwidth = this.width;
                this.width = opt.width;
                this.height = opt.height;

                if (oldheight != 0) {
                    //Compute the new boundaries of the graph
                    this.limits.X1 *= (this.width / oldwidth);
                    this.limits.X2 *= (this.width / oldwidth);
                    this.limits.Y1 *= (this.height / oldheight);
                    this.limits.Y2 *= (this.height / oldheight);
                } else {
                    this.limits.X1 = this.limits.X1 * (this.width / this.height);
                    this.limits.X2 = this.limits.X2 * (this.width / this.height);

//                    this.limits.X1 = -1000;
//                    this.limits.X2 = 1000;

//                        this.limits.Y1 = (this.height / oldheight);
//                        this.limits.Y2 = (this.height / oldheight);
                }

                this.startLimits = NAURE.Utility.clone(this.limits);
                this.defaultLimits = NAURE.Utility.clone(this.limits);
            },
            refreshZoom:function (opt) {
                if (opt.zoom) {
                    if (opt.zoom.X && opt.zoom.Y) {
                        var mousetop = 1 - ((opt.zoom.Y - this.offset.Y) / this.height);	//if we divide the screen into two halves based on the position of the mouse, this is the top half
                        var mouseleft = (opt.zoom.X - this.offset.X) / this.width;	//as above, but the left hald

                        this.limits.X1 += this.range.X * opt.zoom.Scale * mouseleft;
                        this.limits.Y1 += this.range.Y * opt.zoom.Scale * mousetop;
                        this.limits.X2 -= this.range.X * opt.zoom.Scale * (1 - mouseleft);
                        this.limits.Y2 -= this.range.Y * opt.zoom.Scale * (1 - mousetop);
                    }
                    else {
                        this.limits.X1 += this.range.X * opt.zoom.Scale;
                        this.limits.Y1 += this.range.Y * opt.zoom.Scale;
                        this.limits.X2 -= this.range.X * opt.zoom.Scale;
                        this.limits.Y2 -= this.range.Y * opt.zoom.Scale;
                    }
                    this.startLimits = NAURE.Utility.clone(this.limits);
                }
            },
            refreshDrag:function (opt) {
                if (opt.pixel) {
                    if (!this.isEqualsPoint(this.pixel, opt.pixel))
                        this.prevDrag = NAURE.Utility.clone(this.pixel);
                    this.pixel.X = opt.pixel.X - this.offset.X;
                    this.pixel.Y = opt.pixel.Y - this.offset.Y;
                }

                if (opt.drag == 'START') {
                    this.startDrag.X = opt.pixel.X - this.offset.X;
                    this.startDrag.Y = opt.pixel.Y - this.offset.Y;
                    //todo
                    this.startLimits = NAURE.Utility.clone(this.limits);
                }

                //todo
                if (opt.drag == 'CONTINUE') {
                    //find the scale of the graph (units per pixel)
                    //this.scale = this.currScale();
                    //dump(scale.x + " " + scale.y + " -- " + this.startLimits.x1 + " " + this.startLimits.y1);
                    //dump(this.startLimits.x1 + " " +(y - this.startDrag.y) / scale.y);
                    this.limits.X1 = this.startLimits.X1 - ((this.pixel.X - this.startDrag.X) / this.scale.X);
                    this.limits.X2 = this.startLimits.X2 - ((this.pixel.X - this.startDrag.X) / this.scale.X);
                    this.limits.Y1 = this.startLimits.Y1 + ((this.pixel.Y - this.startDrag.Y) / this.scale.Y);
                    this.limits.Y2 = this.startLimits.Y2 + ((this.pixel.Y - this.startDrag.Y) / this.scale.Y);
                }
                if (opt.drag == 'RENEW') {
                    this.startLimits = NAURE.Utility.clone(this.limits);
                }
            },

            refreshCoordinate:function () {
                this.range = {X:this.limits.X2 - this.limits.X1, Y:this.limits.Y2 - this.limits.Y1 };
                this.scale = { X:this.width / this.range.X, Y:this.height / this.range.Y};
                // x' =  Sx * x + 0 * y + width / 2
                //y' = 0 * x - y * Sy + height / 2
                this.metrix = [
                    [this.scale.X, 0, Math.abs(this.limits.X1) * this.scale.X],
                    [0, -this.scale.Y, Math.abs(this.limits.Y2) * this.scale.Y],
                    [0, 0, 1]
                ];

                $.extend(coordinate, this.limits)
                coordinate.width = this.width;
                coordinate.height = this.height;
                coordinate.range = NAURE.Utility.clone(this.range);
                coordinate.pixel = NAURE.Utility.clone(this.pixel);
                coordinate.scale = this.scale;
                coordinate.metrix = this.metrix;
                //coordinate.point = [this.pixel.X, this.pixel.Y].transform(this.metrix);
            },

            reset:function () {
                this.limits = NAURE.Utility.clone(this.defaultLimits);
                this.startLimits = NAURE.Utility.clone(this.limits);
                this.range = {X:this.limits.X2 - this.limits.X1, Y:this.limits.Y2 - this.limits.Y1 };
                this.scale = { X:this.width / this.range.X, Y:this.height / this.range.Y};
                this.refreshCoordinate();
            },

            coordinate:function () {
            },

            transform:function (point) {
                if (isNaN(point.X) || isNaN(point.Y)) {
                    return null;
                }
                if (point.X > layout.limits.X2) {
                    point.X = layout.limits.X2;
                    //return null;
                }
                if (point.X < layout.limits.X1) {
                    point.X = layout.limits.X1;
                    //return null;
                }
//                if (point.Y > layout.limits.Y2) {
//                    //point.Y = layout.limits.Y2;
//                    //return null;
//                }
//                if (point.Y < layout.limits.Y1) {
//                    //point.Y = layout.limits.Y1;
//                    //return null;
//                }

                return new NAURE.Math.Matrix(point.X, point.Y, 1).Transform2DTest(this.metrix);
            },

            transformPoint:function (pixel) {
                if (isNaN(pixel.X) || isNaN(pixel.Y)) {
                    return null;
                }
                return [point.X, point.Y].transform(this.metrix);
            }
        };

        return layout;
    })();

    return NAURE;
});