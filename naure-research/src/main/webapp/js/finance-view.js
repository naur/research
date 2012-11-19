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
var global = {
    naure: null, structures: null, overlay: null, message: null, http: null, graphics: [], lines: null, volumes: null, finance: null, systemFinance: null, systemEquation: null, exponents: [], coordinate: null
};

var dom = {
    compositeOperation: '#composite-operation',
    zoomAxis: '#zoom-axis',
    overlayInput: '#overlay-input',
    canvas: ['article section canvas:eq(0)', 'article section canvas:eq(1)'],
    exponent: '#exponent'
};

global.nodes = {
    '指标': {
        html: '<select id="exponent" style="width:150px;">' +
            '<option value="">无</option>' +
            '<option value="AccumulationDistributionLine">Accumulation/Distribution Line</option>' +
            '</select>'
    },
    Input: {
        html: '<input id="overlay-input" type="text" />'
    },
    Date: {
        html: '<input id="start-date" style="width:60px;" type="text" />-<input id="end-date" style="width:60px;" type="text" />'
    },
    ZoomAxis: {
        html: '<select id="zoom-axis" style="width:60px;">' +
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
    Equation: function () {
        global.lines = [];
        global.lines.push({equation: 'y=x^2', color: 'red'});
        global.lines.push({equation: "\\frac{d}{dx}\\left(sin\\left(x\\right)+log\\left(x+1\\right)\\right)", color: 'blue'});
        //global.lines.push({equation : 'r<\sin \left(4\theta \right)', color : 'red'});
        global.graphics[0].System(global.systemEquation);
        global.graphics[0].draw({lines: global.lines});
    },
    Finance: function () {
        global.lines = [];
        global.graphics[0].System(global.systemFinance);
        global.graphics[0].draw({lines: global.lines});
    },
    Reset: function () {
        global.graphics[0].reset();
    },
    Sina: function () {
        //http://www.google.com/ig/api?stock=600455
        //http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=19950802&end_date=20120723&type=xml
        $(this).attr('disabled', true);
        global.message.empty();
        global.message.show({content: '正在获取数据...'});

        var startDate = $('#start-date').val().length > 0 ? new Date(Date.parse($('#start-date').val())) : new Date('2012-01-01');
        var endDate = $('#end-date').val().length > 0 ? Date.parse($('#end-date').val()) : new Date();
        var symbol = $('#overlay-input').val().length > 0 ? $('#overlay-input').val() : 'sz000010';

        //http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=sz000010&begin_date=20120101&end_date=20120701&type=xml
        global.http.xmlAcquire({
            xmlUrl: 'http://biz.finance.sina.com.cn/stock/flash_hq/kline_data.php?&rand=random(10000)&symbol=' + symbol + '&begin_date=' + startDate.format('yyyyMMdd') + '&end_date=' + endDate.format('yyyyMMdd') + '&type=xml',
            context: this,
            error: function (ex) {
                global.message.show({content: '获取数据错误，请稍后重试！', color: 'red'});
                $(ex.context).attr('disabled', false);
            },
            success: function (obj) {
                $(obj.context).attr('disabled', false);
                global.message.show({content: '获取数据成功！'});

                global.exponents = []
                var y1, y2, volumeMax, volumeMin;
                var equationPrice = [], equationClose = [], equationVolumes = [];
                $(obj.output).find('content').each(function (index, data) {
                    var content = $(this);

                    var o = parseFloat(content.attr('o'));
                    var h = parseFloat(content.attr('h'));
                    var l = parseFloat(content.attr('l'));
                    var c = parseFloat(content.attr('c'));
                    var v = parseFloat(content.attr('v'));
                    var d = content.attr('d');

                    global.exponents.push(new global.finance.Quote(d, o, h, l, c, v));
                    equationPrice.push({X: d, Y: o});
                    equationVolumes.push({X: d, Y: v});

                    if (!y1) y1 = min(o, c);
                    if (!y2) y2 = max(o, c);
                    if (!volumeMax) volumeMax = v;
                    if (!volumeMin) volumeMin = v;

                    y1 = min(min(o, c), y1);
                    y2 = max(max(o, c), y2);
                    volumeMax = max(v, volumeMax);
                    volumeMin = min(v, volumeMin);
                });

                if (!global.lines) global.lines = [];
                if (!global.volumes) global.volumes = []
                global.lines.push({equation: equationPrice, color: '#' + random().toString(16).substring(2, 5)});
                global.volumes.push({equation: equationVolumes, color: '#' + random().toString(16).substring(2, 5)});

                global.coordinate = {
                    X1: floor(startDate.getTime() / 86400000),
                    X2: ceil(endDate.getTime() / 86400000),
                    Y1: volumeMin, Y2: volumeMax
                };
                global.graphics[0].draw({
                    coordinate: {
                        X1: floor(startDate.getTime() / 86400000),
                        X2: ceil(endDate.getTime() / 86400000),
                        Y1: y1, Y2: y2
                    },
                    lines: global.lines
                });
                global.graphics[1].draw({
                    coordinate: {
                        X1: floor(startDate.getTime() / 86400000),
                        X2: ceil(endDate.getTime() / 86400000),
                        Y1: volumeMin, Y2: volumeMax
                    },
                    lines: global.volumes
                });
            }
        });
    },

    MA: function () {
        global.finance.MovingAverage();
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(dom.compositeOperation).on('change', function () {
        global.graphics[0].config.CompositeOperation = $(this).val();
    });
    $(dom.zoomAxis).on('change', function () {
        global.graphics[0].config.zoomAxis = $(this).val();
    });
    $(dom.overlayInput).on('keydown', function (event) {
        var ev = document.all ? window.event : event;
        if (ev.keyCode == 13) {
            var button = global.overlay.find('Sina');
            if (button) button.click();
        }
    });
    $(dom.exponent).live('change', function () {
        if ($(dom.exponent).val()) {
            var buffer = [];
            var linked = new global.structures.Linked();
            linked.prev = 0;
            linked.next = 0;
            global.finance.AccumulationDistributionLine({
                quotes: global.exponents,
                linked: linked,
                result: function (obj) {
                    buffer.push({X: obj.date, Y: obj.value});
                }
            });

            global.graphics[1].draw({
                coordinate: global.coordinate,
                lines: [
                    {equation: buffer, color: 'red'}
                ]
            });
        }
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.xsl', 'naure.math.statistics.finance',
    'naure.graphics.equation',
    'naure.graphics.finance'], function ($, NAURE) {
    global.naure = NAURE;
    global.structures = NAURE.Math.Structures;
    global.overlay = NAURE.UI.Overlay;
    global.http = NAURE.HTTP;
    global.message = NAURE.Message;
    global.finance = NAURE.Math.Statistics.Finance;
    global.systemFinance = new NAURE.Graphics.Finance();
    global.systemEquation = new NAURE.Graphics.Equation();

    $.support.cors = true;

    $(function () {
        $('body').message({overlay: 'left-bottom', title: '', multiple: false});
        $('body').overlay({
            nodes: global.nodes
        });

        global.message.position('left-top');
        //graphics.config.gridlines.show = false;
        global.graphics[0] = $(dom.canvas[0]).NAURE_Graphics({system: global.systemFinance});
        global.graphics[1] = $(dom.canvas[1]).NAURE_Graphics({system: new NAURE.Graphics.Finance()});

        initEvent();
    });
});

/*-------------------- 初始化 END --------------------*/

