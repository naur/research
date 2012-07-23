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
    Input:{
        html:'<input id="overlay-input" type="text" />'
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

                var equation = []
                $(obj.output).find('content').each(function (index, data) {
                    var content = $(this);
                    equation.push({
                        X:content.attr('d'),
                        Y:content.attr('v'),
                        Y1:content.attr('l'),
                        Y2:content.attr('c'),
                        Y3:content.attr('h'),
                        Y4:content.attr('o')
                    });
                });

                lines.push({equation:equation, color:'red'});
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
    });
});

/*-------------------- 初始化 END --------------------*/

