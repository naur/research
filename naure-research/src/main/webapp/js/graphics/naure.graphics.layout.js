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

define(['jquery', 'naure', 'math', 'naure.graphics', 'naure.message'], function ($, NAURE) {

    NAURE.Graphics.Layout = (function () {
        var layout = {
            width:0,
            height:0,
            scale:{X:1, Y:1},
            range:{X:0, Y:0},
            startDrag:{X:0, Y:0},
            prevDrag:{X:0, Y:0},
            currDrag:{X:0, Y:0},
            defaultCoord:{X1:0, Y1:0, X2:0, Y2:0},
            startCoord:{X1:0, Y1:0, X2:0, Y2:0},
            currCoord:{X1:-5, Y1:-5, X2:5, Y2:5},
            offset:{left:0, top:0},
            centerPosition:{X:null, Y:null, Z:null},

            Point:function (x, y, z) {
                this.X = x;
                this.Y = y;
                this.Z = z;
            },

            isEqualsPoint:function (point1, point2) {
                return point1.X == point2.X && point1.Y == point1.Y
            },
            isDragMove:function () {
                return !this.isEqualsPoint(this.currDrag, this.prevDrag);
            },

            absRange:function () {
                return {X:Math.abs(this.range.X),
                    Y:Math.abs(this.range.Y)}
            },

            refresh:function (options) {
                var opt = $.extend({}, options);

                if (opt.offset) this.offset = {X:opt.offset.left, Y:opt.offset.top};
                if (opt.prevDrag) this.prevDrag = opt.prevDrag;

                if (opt.width && opt.height) {
                    var oldheight = this.height;
                    var oldwidth = this.width;
                    this.width = opt.width;
                    this.height = opt.height;

                    if (oldheight != 0) {
                        //Compute the new boundaries of the graph
                        this.currCoord.X1 *= (this.width / oldwidth);
                        this.currCoord.X2 *= (this.width / oldwidth);
                        this.currCoord.Y1 *= (this.height / oldheight);
                        this.currCoord.Y2 *= (this.height / oldheight);
                    } else {
                        this.currCoord.X1 = this.currCoord.X1 * (this.width / this.height);
                        this.currCoord.X2 = this.currCoord.X2 * (this.width / this.height);
                        //this.currCoord.Y1 = (this.height / oldheight);
                        //this.currCoord.Y2 = (this.height / oldheight);
                    }

                    this.startCoord = NAURE.Utility.clone(this.currCoord);
                    this.defaultCoord = NAURE.Utility.clone(this.currCoord);
                }

                //鼠标事件时  【Drag 变化】
                if (opt.startDrag) {
                    this.startDrag.X = opt.startDrag.X - this.offset.X;
                    this.startDrag.Y = opt.startDrag.Y - this.offset.Y;
                    //todo
                    this.startCoord = NAURE.Utility.clone(this.currCoord);
                }
                if (opt.currDrag) {
                    this.currDrag.X = opt.currDrag.X - this.offset.X;
                    this.currDrag.Y = opt.currDrag.Y - this.offset.Y;
                }
                //todo
                if (opt.continue) {
                    //find the scale of the graph (units per pixel)
                    //this.scale = this.currScale();
                    //dump(scale.x + " " + scale.y + " -- " + this.startCoord.x1 + " " + this.startCoord.y1);
                    //dump(this.startCoord.x1 + " " +(y - this.startDrag.y) / scale.y);
                    this.currCoord.X1 = this.startCoord.X1 - ((this.currDrag.X - this.startDrag.X) / this.scale.X);
                    this.currCoord.X2 = this.startCoord.X2 - ((this.currDrag.X - this.startDrag.X) / this.scale.X);
                    this.currCoord.Y1 = this.startCoord.Y1 + ((this.currDrag.Y - this.startDrag.Y) / this.scale.Y);
                    this.currCoord.Y2 = this.startCoord.Y2 + ((this.currDrag.Y - this.startDrag.Y) / this.scale.Y);
                }
                if (opt.renew) {
                    this.startCoord = NAURE.Utility.clone(this.currCoord);
                }

                //ZOOM
                if (opt.zoom) {
                    if (opt.zoom.X && opt.zoom.Y) {
                        var mousetop = 1 - ((opt.zoom.Y - this.offset.Y) / this.height);	//if we divide the screen into two halves based on the position of the mouse, this is the top half
                        var mouseleft = (opt.zoom.X - this.offset.X) / this.width;	//as above, but the left hald

                        this.currCoord.X1 += this.range.X * opt.zoom.Scale * mouseleft;
                        this.currCoord.Y1 += this.range.Y * opt.zoom.Scale * mousetop;
                        this.currCoord.X2 -= this.range.X * opt.zoom.Scale * (1 - mouseleft);
                        this.currCoord.Y2 -= this.range.Y * opt.zoom.Scale * (1 - mousetop);
                    }
                    else {
                        this.currCoord.X1 += this.range.X * opt.zoom.Scale;
                        this.currCoord.Y1 += this.range.Y * opt.zoom.Scale;
                        this.currCoord.X2 -= this.range.X * opt.zoom.Scale;
                        this.currCoord.Y2 -= this.range.Y * opt.zoom.Scale;
                    }
                    this.startCoord = NAURE.Utility.clone(this.currCoord);
                }

                this.range = {X:this.currCoord.X2 - this.currCoord.X1, Y:this.currCoord.Y2 - this.currCoord.Y1 };
                this.scale = { X:this.width / this.range.X, Y:this.height / this.range.Y};

                NAURE.Message.show({content:JSON.stringify({
                    //size:{width:this.width, height:this.height},
                    currDrag:this.currDrag,
                    //startCoord:this.startCoord,
                    currCoord:this.currCoord,
                    //scale:this.scale,
                    range:this.range
                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            reset:function () {
                this.currCoord = NAURE.Utility.clone(this.defaultCoord);
            },

            coordinate:function () {
            },

            transform:function (point) {
                if (isNaN(point.X) || isNaN(point.Y)) {
                    return null;
                }
                if (point.X > layout.currCoord.X2) {
                    //point.X = layout.currCoord.X2;
                    return null;
                }
                if (point.X < layout.currCoord.X1) {
                    //point.X = layout.currCoord.X1;
                    return null;
                }
                if (point.Y > layout.currCoord.y2) {
                    //point.Y = layout.currCoord.y2;
                    return null;
                }
                if (point.Y < layout.currCoord.Y1) {
                    //point.Y = layout.currCoord.Y1;
                    return null;
                }

                return new layout.Point(layout.scale.X * point.X - layout.centerPosition.X, layout.centerPosition.Y - layout.scale.Y * point.Y);
            }
        };

        return layout;
    })();

    return NAURE;
});