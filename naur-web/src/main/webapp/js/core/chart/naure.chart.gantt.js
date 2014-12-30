/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/15/12 6:45 PM
 * Description:
 *
 */
define(['jquery', 'naur.message', 'naur.math', 'naur.utility'], function ($, NAUR) {

    NAUR.Chart.Gantt = (function () {

        var utility = NAUR.Utility;

        var gantt = {
            block:function (options) {
                var opt = $.extend({
                    container:null,
                    width:null,
                    height:null,
                    font:'8pt sans-serif',
                    coordinate:{X1:new Date(), X2:new Date(), Y1:null, Y2:null}
                }, options);

                opt.graph = $(opt.container);
                if (!opt.graph[0].getContext) return;
                opt.ctx = $(opt.graph)[0].getContext("2d");

                if (!opt.width)
                    opt.width = opt.graph.width()
                if (!opt.height)
                    opt.height = opt.graph.height()

                opt.graph.attr('width', opt.width);
                opt.graph.attr('height', opt.height);
                opt.ctx.height = opt.height;
                opt.ctx.width = opt.width;

                opt.ctx.font = opt.font;
                opt.ctx.strokeStyle = 'white'
                opt.ctx.lineWidth = 0.5;
                opt.ctx.textAlign = "center";
                opt.ctx.textBaseline = "top";

                opt.ctx.strokeRect(0, 0, opt.width, opt.height);

                opt.ctx.strokeStyle = '#b3d8ea'
                opt.ctx.fillStyle = "green";
                var daysX = utility.getDays(opt.coordinate.X1, opt.coordinate.X2);
                var daysY = utility.getDays(opt.coordinate.Y1, opt.coordinate.Y2);

                var unit = opt.width / daysX.length;
                var newTime = new Date().getTime();;
                for (var index in daysX) {
                    if (!daysX.hasOwnProperty(index)) continue;
                    //竖线
                    if (index != 0) {
                        opt.ctx.beginPath();
                        opt.ctx.moveTo(round(index * unit) + 0.5, 0);
                        opt.ctx.lineTo(round(index * unit) + 0.5, opt.height);
                        opt.ctx.stroke();
                    }
                    //文字
                    if (!daysY)
                        opt.ctx.fillText(daysX[index].getDate(), round(index * unit + unit / 2) + 0.5, 0);

                    if (daysY && daysY.length > 0 && 
                    	daysX[index].getFullYear() == daysY[0].getFullYear() &&
                    	daysX[index].getMonth() == daysY[0].getMonth() &&
                    	daysX[index].getDate() == daysY[0].getDate()) {
                        opt.ctx.save();
                        if (newTime > daysX[index].getTime())
                            opt.ctx.fillStyle = 'green';
                        else
                            opt.ctx.fillStyle = 'red';
                        opt.ctx.fillRect(round(index * unit) + 0.5, 0, unit, opt.height);
                        opt.ctx.fillStyle = '#A22E00';
                        opt.ctx.fillText(daysX[index].getDate(), round(index * unit + unit / 2) + 0.5, 0);
                        opt.ctx.restore();
                        daysY.shift();
                    }
                }
            }
        };

        return gantt;
    })();

    return NAUR;
});