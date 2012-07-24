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
var naure, message, http, graphics, lines;

var overlayNodes = {
    StartDate:{
        html:'<input id="start-date" type="text" />'
    },
    EndDate:{
        html:'<input id="end-date" type="text" />'
    },
    Input:{
        html:'<input id="overlay-input" type="text" />'
    },
    CompositeOperation:{
        html:'<select id=composite-operation>' +
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
    'Equation':function () {
        lines = [];
        lines.push({equation:'y=x^2', color:'red'});
        lines.push({equation:"\\frac{d}{dx}\\left(sin\\left(x\\right)+log\\left(x+1\\right)\\right)", color:'blue'});
        //lines.push({equation : 'r<\sin \left(4\theta \right)', color : 'red'});
        graphics.System(graphics.Equation);
        graphics.draw({
            lines:lines
        });
    },
    'Finance':function () {
        graphics.System(graphics.Finance);
        graphics.draw();
    },
    'Reset':function () {
        graphics.reset();
    },
    'Date':function () {
        var tDate = new Date();
        tDate.setTime(new Number($('#overlay-input').val()) * 3600000);
        message.show({
            content:tDate.toString() + ' ---- ' + new Date().toString()
        });
    },
    'Sina':function () {
        //http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=19950802&end_date=20120723&type=xml
        $(this).attr('disabled', true);
        message.empty();
        message.show({content:'正在获取数据...'});

        http.Request({
            uri:'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=19950802&end_date=20120723&type=xml',
            context:this,
            error:function (ex) {
                message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                $(ex.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);
                message.show({content:'获取数据成功！'});
                lines = [];

                var price = ['l', 'c', 'h', 'o'];

                for (var key in price) {
                    if (!price.hasOwnProperty(key)) continue;
                    var equation = []
                    $(obj.output).find('content').each(function (index, data) {
                        var content = $(this);
                        equation.push({
                            X:content.attr('d'),
                            Y:content.attr('v'),
                            Y1:parseFloat(content.attr(price[key]))
                        });
                    });
                    lines.push({equation:equation, color:'#' + random().toString(16).substring(2, 5)});
                }
                graphics.draw({
                    lines:lines
                });
            }
        });
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
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.http',
    'naure.graphics.ui',
    'naure.graphics.layout',
    'naure.graphics.gridlines',
    'naure.graphics.equation',
    'naure.graphics.finance'], function ($, NAURE) {
    naure = NAURE;
    http = NAURE.HTTP;
    graphics = NAURE.Graphics;
    message = NAURE.Message;

    $(function () {
        $('body').message({overlay:'left-bottom'});
        $('body').overlay({
            nodes:overlayNodes
        });

        $('article section canvas').NAURE_Graphics({system:graphics.Finance});

        initEvent();
    });
});

/*-------------------- 初始化 END --------------------*/

