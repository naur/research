/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yihaodian.com
 * Date:
 *              7/7/2014 9:21 PM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var global = {
    queryUri: '/finance/stock/{0}/{1}/{2}/{3}.json', // /{type}/{code}/{start}/{end}
    dom: {
        search: '#search',
        code: '#stock_code',
        start: '#stock_start_date',
        end: '#stock_end_date',
        chart: '#chart'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function init() {
    $(global.dom.start).val(new Date(new Date().getTime() - DyMilli - WkMilli).format('yyyy-MM-dd'));
    $(global.dom.end).val(new Date(new Date().getTime() - DyMilli).format('yyyy-MM-dd'));
    $(global.dom.search).on('click', function () {

        global.params = getParams();

        global.http.acquire({
            uri: global.utility.format(
                global.queryUri, global.params.type, global.params.code,
                global.params.start.format('yyyy-MM-dd'),
                global.params.end.format('yyyy-MM-dd')),
            context: this,
            error: function (err) {
                //TODO tbody
                $(global.dom.chart).html(global.utility.format(global.message.tableTemplate, JSON.stringify(err)));
            },
            success: function (obj) {
                if (0 == obj.output.information.level) {

                    var stocks = obj.output.information.data;
                    if (!stocks) {
                        return;
                    }
                    var data = {};
                    for (var stock in stocks) {
                        //TODO
                        //data[stocks[stock].id] = [];
                        data['stock'] = [];
                        for (var quote in stocks[stock].quotes) {
                            data['stock'].push({
                                key: new Date(stocks[stock].quotes[quote].date).format('yyyy-MM-dd'),
                                value: stocks[stock].quotes[quote].close
                            });
                        }
                    }
                    data = {
                        "stock": [
                            {"key": "2015-01-06", "value": 21.49},
                            {"key": "2015-01-07", "value": 21.25},
                            {"key": "2015-01-08", "value": 21.44},
                            {"key": "2015-01-09", "value": 21.33}
                        ]
                    };
                    var option = global.echarts.getChartOption(global.params);
                    var series = global.echarts.getSeries(data, global.params);
                    global.chart.render({option: option, series: series});
                } else {
                    //obj.output.information.keywords
                }
            }
        });
    });
}

function initEcharts() {
    global.chart = global.echarts.core.init(document.getElementById(global.dom.chart.substr(1)));
    global.chart.render = function (opt) {
        if (opt.option)
            this.setOption(opt.option, true);
        if (opt.series)
            this.setSeries(opt.series);
    };
}

function getParams() {
    var tmp = {
        type: $(global.dom.code).val().substr(0, 2),
        code: $(global.dom.code).val().substr(2, 6),
        start: new Date($(global.dom.start).val() + 'T00:00:00+08:00'),
        end: new Date($(global.dom.end).val() + 'T00:00:00+08:00'),
        lines: {stock: '---'},
        title: '----',
        dataZoomLimit: 40,
        pointFilter: function (date) {
            return global.date.stockHoliday(date);
        }
    };
    tmp.subtitle = new Date(tmp.start).format('yyyy年MM月dd日') + ' --- ' + new Date(tmp.end).format('yyyy年MM月dd日');
    tmp.points = global.echarts.parsePoints(tmp);
    return tmp;
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'research-template', 'naur.ui.echarts', 'naur.date.lunar'], function (mod) {
    global.message = mod.naur.Message;
    global.http = mod.naur.HTTP;
    global.utility = mod.naur.Utility;
    global.echarts = mod.naur.UI.Echarts;
    global.date = mod.naur.Date;
    global.chineseLunar = mod.naur.Date.ChineseLunar;
    $(function () {
        init();
        initEcharts();
    });
});

/*-------------------- 初始化 END --------------------*/
