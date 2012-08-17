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
var naure, overlay, message, http, graphics, lines, finance;

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
        graphics.System(graphics.Equation);
        graphics.draw({lines:lines});
    },
    Finance:function () {
        lines = [];
        graphics.System(graphics.Finance);
        graphics.draw({lines:lines});
    },
    Reset:function () {
        graphics.reset();
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
        http.Request({
            uri:'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=' + symbol + '&begin_date=' + startDate.format('yyyyMMdd') + '&end_date=' + endDate.format('yyyyMMdd') + '&type=xml',
            context:this,
            error:function (ex) {
                message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                $(ex.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);
                message.show({content:'获取数据成功！'});

                var y1, y2;
                //var price = ['v', 'l', 'c', 'h', 'o'];
                var price = ['c', 'o'];
                for (var key in price) {
                    if (!price.hasOwnProperty(key)) continue;
                    var equation = []
                    $(obj.output).find('content').each(function (index, data) {
                        var content = $(this);
                        equation.push({
                            X:content.attr('d'),
                            Y:parseFloat(content.attr(price[key]))
                        });
                        if (!y1)
                            y1 = parseFloat(content.attr(price[key]));
                        else if (parseFloat(content.attr(price[key])) < y1)
                            y1 = parseFloat(content.attr(price[key]));

                        if (!y2)
                            y2 = parseFloat(content.attr(price[key]));
                        else if (parseFloat(content.attr(price[key])) > y2)
                            y2 = parseFloat(content.attr(price[key]));
                    });
                    if (!lines) lines = []
                    lines.push({equation:equation, color:'#' + random().toString(16).substring(2, 5)});
                }

                graphics.draw({
                    coordinate:{
                        X1:floor(startDate.getTime() / 86400000),
                        X2:ceil(endDate.getTime() / 86400000),
                        Y1:y1, Y2:y2
                    },
                    lines:lines
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
        graphics.config.CompositeOperation = $(this).val();
    });
    $('#zoom-axis').on('change', function () {
        graphics.config.zoomAxis = $(this).val();
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

require(['jquery', 'naure.message', 'naure.overlay', 'naure.http', 'naure.math.stats.finance',
    'naure.graphics.ui',
    'naure.graphics.layout',
    'naure.graphics.gridlines',
    'naure.graphics.equation',
    'naure.graphics.finance',
    'naure.analytics'], function ($, NAURE) {
    naure = NAURE;
    overlay = NAURE.UI.Overlay;
    http = NAURE.HTTP;
    graphics = NAURE.Graphics;
    message = NAURE.Message;
    finance = NAURE.Math.Stats.Finance;

    $(function () {
        $('body').message({overlay:'left-bottom', title:'', multiple:false});
        $('body').overlay({
            nodes:overlayNodes
        });

        message.position('left-top');
        //graphics.config.gridlines.show = false;
        $('article section canvas').NAURE_Graphics({system:graphics.Finance});

        initEvent();
    });
});

/*-------------------- 初始化 END --------------------*/

