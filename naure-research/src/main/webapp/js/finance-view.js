/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/6/12 9:49 AM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/
var naure, overlay, message, http, graphics1, graphics2, lines, volumes, finance, systemFinance, systemEquation;
var canvas1 = 'article section canvas:eq(0)',
    canvas2 = 'article section canvas:eq(1)';

var overlayNodes = {
    Input:{
        html:'<input id="overlay-input" type="text" />'
    },
    Date:{
        html:'<input id="start-date" style="width:60px;" type="text" />-<input id="end-date" style="width:60px;" type="text" />'
    },
    ZoomAxis:{
        html:'<select id="zoom-axis" style="width:60px;">' +
            '<option>both</option>' +
            '<option>horizontal</option>' +
            '<option>vertical</option>' +
            '</select>' +
            '<select id="composite-operation" style="width:80px;">' +
            '<option>source-over</option>' +
            '<option>source-in</option>' +
            '<option>source-out</option>' +
            '<option>source-atop</option>' +
            '<option>lighter</option>' +
            '<option>xor</option>' +
            '<option>destination-over</option>' +
            '<option>destination-in</option>' +
            '<option>destination-out</option>' +
            '<option>destination-atop</option>' +
            '<option>darker</option>' +
            '<option>copy</option>' +
            '</select>'
    },
    Equation:function () {
        lines = [];
        lines.push({equation:'y=x^2', color:'red'});
        lines.push({equation:"\\frac{d}{dx}\\left(sin\\left(x\\right)+log\\left(x+1\\right)\\right)", color:'blue'});
        //lines.push({equation : 'r<\sin \left(4\theta \right)', color : 'red'});
        graphics1.System(systemEquation);
        graphics1.draw({lines:lines});
    },
    Finance:function () {
        lines = [];
        graphics1.System(systemFinance);
        graphics1.draw({lines:lines});
    },
    Reset:function () {
        graphics1.reset();
    },
    Sina:function () {
        //http://www.google.com/ig/api?stock=600455
        //http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=19950802&end_date=20120723&type=xml
        $(this).attr('disabled', true);
        message.empty();
        message.show({content:'正在获取数据...'});

        var startDate = $('#start-date').val().length > 0 ? new Date(Date.parse($('#start-date').val())) : new Date('2012-01-01');
        var endDate = $('#end-date').val().length > 0 ? Date.parse($('#end-date').val()) : new Date();
        var symbol = $('#overlay-input').val().length > 0 ? $('#overlay-input').val() : 'sz000010';

        //http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=20120101&end_date=20120701&type=xml
        http.xmlAcquire({
            xmlUrl:'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=' + symbol + '&begin_date=' + startDate.format('yyyyMMdd') + '&end_date=' + endDate.format('yyyyMMdd') + '&type=xml',
            context:this,
            error:function (ex) {
                message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                $(ex.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);
                message.show({content:'获取数据成功！'});

                var y1, y2, volumeMax, volumeMin;
                //var price = ['v', 'l', 'c', 'h', 'o'];
//                var price = ['v', 'c', 'o'];
//                for (var key in price) {
//                    if (!price.hasOwnProperty(key)) continue;
//                    //var equation = [], volumes = [];
//                    $(obj.output).find('content').each(function (index, data) {
//                        var content = $(this);
//                        equation.push({
//                            X:content.attr('d'),
//                            Y:parseFloat(content.attr(price[key]))
//                        });
//                        volumes.push({
//                            X:content.attr('d'),
//                            Y:parseFloat(content.attr(price[key]))
//                        });
//                        if (!y1)
//                            y1 = parseFloat(content.attr(price[key]));
//                        else if (parseFloat(content.attr(price[key])) < y1)
//                            y1 = parseFloat(content.attr(price[key]));
//
//                        if (!y2)
//                            y2 = parseFloat(content.attr(price[key]));
//                        else if (parseFloat(content.attr(price[key])) > y2)
//                            y2 = parseFloat(content.attr(price[key]));
//                    });
//                }

                //todo
                var equationPrice = [], equationClose = [], equationVolumes = [];
                $(obj.output).find('content').each(function (index, data) {
                    var content = $(this);
                    var o = parseFloat(content.attr('o'));
                    var c = parseFloat(content.attr('c'));
                    var v = parseFloat(content.attr('v'));
                    equationPrice.push({
                        X:content.attr('d'),
                        //Y:o,
                        O:o,
                        C:c
                    });
                    equationVolumes.push({
                        X:content.attr('d'),
                        O:o,
                        C:c,
                        //Y:v
                        V:v
                    });
                    if (!y1) y1 = min(o, c);
                    if (!y2) y2 = max(o, c);
                    if (!volumeMax) volumeMax = v;
                    if (!volumeMin) volumeMin = v;

                    y1 = min(min(o, c), y1);
                    y2 = max(max(o, c), y2);
                    volumeMax = max(v, volumeMax);
                    volumeMin = min(v, volumeMin);
                });

                if (!lines) lines = [];
                if (!volumes) volumes = []
                lines.push({equation:equationPrice, color:'#' + random().toString(16).substring(2, 5)});
                volumes.push({equation:equationVolumes, color:'#' + random().toString(16).substring(2, 5)});

                graphics1.draw({
                    coordinate:{
                        X1:floor(startDate.getTime() / 86400000),
                        X2:ceil(endDate.getTime() / 86400000),
                        Y1:y1, Y2:y2
                    },
                    lines:lines
                });
                graphics2.draw({
                    coordinate:{
                        X1:floor(startDate.getTime() / 86400000),
                        X2:ceil(endDate.getTime() / 86400000),
                        Y1:volumeMin, Y2:volumeMax
                    },
                    lines:volumes
                });
            }
        });
    },

    MA:function () {
        finance.MovingAverage();
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $('#composite-operation').on('change', function () {
        graphics1.config.CompositeOperation = $(this).val();
    });
    $('#zoom-axis').on('change', function () {
        graphics1.config.zoomAxis = $(this).val();
    });
    $('#overlay-input').on('keydown', function (event) {
        var ev = document.all ? window.event : event;
        if (ev.keyCode == 13) {
            var button = overlay.find('Sina');
            if (button) button.click();
        }
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.xsl', 'naure.math.stats.finance',
    'naure.graphics.ui',
    'naure.graphics.layout',
    'naure.graphics.gridlines',
    'naure.graphics.equation',
    'naure.graphics.finance',
    'naure.analytics'], function ($, NAURE) {
    naure = NAURE;
    overlay = NAURE.UI.Overlay;
    http = NAURE.HTTP;
    message = NAURE.Message;
    finance = NAURE.Math.Stats.Finance;
    systemFinance = new NAURE.Graphics.Finance();
    systemEquation = new NAURE.Graphics.Equation();

    $.support.cors = true;

    $(function () {
        $('body').message({overlay:'left-bottom', title:'', multiple:false});
        $('body').overlay({
            nodes:overlayNodes
        });

        message.position('left-top');
        //graphics.config.gridlines.show = false;
        graphics1 = $(canvas1).NAURE_Graphics({system:systemFinance});
        graphics2 = $(canvas2).NAURE_Graphics({system:new NAURE.Graphics.Finance()});

        initEvent();
    });
});

/*-------------------- 初始化 END --------------------*/

