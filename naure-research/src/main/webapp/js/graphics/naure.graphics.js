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
Array.prototype.remove = function (elem) {
    var index = this.indexOf(elem);
    if (index !== -1) {
        this.splice(index, 1)
    }
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var coordinate;

define(['jquery', 'naure', 'math'], function ($, NAURE) {
    NAURE.Graphics = (function () {
        var graphics = {
            ui:null,
            system:null,
            layout:null,
            lines:[],
            config:{
                gridlines:{
                    show:true,
                    maxgridlines:{X:13, Y:13},
                    charHeight:8
                },
                quality:1,
                //todo
                scale:function (scale) {
                    graphics.layout.scale = scale;
                },
                zoomFactor:0.1
            },

            draw:function (options) {
                this.lines = [];
                this.lines.push({equation : 'y=x^2', color : 'red'});
                this.ui.draw({lines:this.lines});

//                var graphs = [];
//                for (key in this.lines) {
//                    if (!this.lines.hasOwnProperty(key)) break;
//                    graphs.push(new graphics.system.Graph(this.lines[key].equation, true, this.lines[key].color));
//                }
//
//                //jsgcalc.lines.push({equation : $("input", this).val(), color : $(".graph_color_indicator", this).css('backgroundColor')});
//                this.ui.draw({graphs:graphs});


//                for (var i in this.lines) {
//                    //dump(this.lines[i].equation);
//                    equation = Calc.parseEquation(this.lines[i].equation, true);
//                    this.drawEquation(equation, this.lines[i].color);
//                }

//                NAURE.Message.show({content:JSON.stringify({
//                    size:{width:this.width, height:this.height},
//                    startCoord:this.startCoord,
//                    currCoord:this.currCoord
//                }).replace(/"(\w+)":/gi, '<span style="color:red;">$1:</span>')});
            },

            reset:function () {
                this.ui.reset();
            },

            init:function (options) {
                graphics.ui = NAURE.Graphics.UI;
                graphics.ui.config = NAURE.Graphics.config;
                graphics.ui.graphics = graphics;
                graphics.layout = NAURE.Graphics.Layout;

                graphics.ui.init($.extend({
                    layout:graphics.layout
                }, options));

                this.draw();
            }
        };

        return graphics;
    })();


    $.fn.NAURE_Graphics = function (options) {
        if (!options)
            options = {};
        options.container = this;
        NAURE.Graphics.init(options);
        return this;
    };

    return NAURE;
});