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
    queryUri: '/finance/stock/{0}/{1}/{2}.json', // /{type}/{code}/{start}/{end}
    dom: {
        message: '.row:eq(2) .col-md-12',
        search: '#search',
        stock: '#stock_code',
        start: '#stock_start_date',
        end: '#stock_end_date',
        chart: '#chart',
        directedPoint: '#directed_point'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function search(self) {

    global.params = getParams();
    if (!global.params.stock) {
        global.message.show({content: global.utility.format(global.message.text.paramsError, 'stock empty.')});
        return;
    }

    global.message.show({content: global.message.text.loading});

    global.http.acquire({
        uri: global.utility.format(
            global.queryUri, global.params.stock,
            global.params.start.format('yyyy-MM-dd'),
            global.params.end.format('yyyy-MM-dd')),
        context: self,
        error: function (err) {
            //TODO tbody
            global.message.show({content: global.utility.format(global.message.text.error, JSON.stringify(err))});
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {

                global.message.empty();

                var stocks = obj.output.information.data;
                if (!stocks) {
                    return;
                }
                var quote, stockName;
                global.data = {};
                for (var stock in stocks) {
                    //设置线段名
                    stockName = stocks[stock].name;
                    global.params.lines[stocks[stock].code] = stocks[stock].type.toLowerCase() + stocks[stock].code;
                    global.data[stocks[stock].code] = [];
                    for (var quote in stocks[stock].quotes) {
                        quote = stocks[stock].quotes[quote];
                        global.data[stocks[stock].code].push({
                            key: new Date(quote.date).format('yyyy-MM-dd'),
                            value: [quote.open, quote.close, quote.low, quote.high],
                            open: quote.open,
                            high: quote.high,
                            low: quote.low,
                            close: quote.close,
                            volume: quote.volume
                        });
                    }
                }

                global.params.title = stockName;
                var option = global.echarts.getChartOption(global.params);
                var series = global.echarts.getSeries(global.data, global.params);
                global.chart.render({option: option, series: series});
            } else {
                //TODO 暴露了密码信息 global.message.show({content: global.utility.format(global.message.text.error, obj.output.information.keywords)});
                global.message.show({content: global.message.text.error});
            }
        }
    });
}

function markUpDownLine(data) {
    var seriesIdx = 0, markPoints;
    for (var line in data) {
        markPoints = global.finance.SupInfLine(data[line], function (point) {
            return point.high;
        }, function (point) {
            return point.low;
        });
        global.chart.addMarkLine(seriesIdx, {
            data: global.echarts.markDirectedPoint(markPoints.sup, function (point) {
                return {
                    xAxis: point.key,
                    yAxis: point.high
                };
            })
        });
        global.chart.addMarkLine(seriesIdx, {
            data: global.echarts.markDirectedPoint(markPoints.inf, function (point) {
                return {
                    xAxis: point.key,
                    yAxis: point.low
                };
            })
        });
    }
}

function getParams() {
    var tmp = {
        stock: $(global.dom.stock).val(),
        start: new Date($(global.dom.start).val() + 'T00:00:00+08:00'),
        end: new Date($(global.dom.end).val() + 'T00:00:00+08:00'),
        lines: {},
        type: 'k',
        scale: true,
        tooltipFormat: function (params) {
            var res = params[0].seriesName + ' ' + params[0].name;
            res += '<br/>  open : ' + params[0].value[0] + '  high : ' + params[0].value[3];
            res += '<br/>  close : ' + params[0].value[1] + '  low : ' + params[0].value[2];
            return res;
        },
        dataZoomLimit: 60,
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

function init() {
    $(global.dom.stock).val('600247');
    $(global.dom.start).val(new Date(new Date().getTime() - DyMilli - 10 * WkMilli).format('yyyy-MM-dd'));
    $(global.dom.end).val(new Date(new Date().getTime() - DyMilli).format('yyyy-MM-dd'));
    $(global.dom.directedPoint).on('click', function () {
        if (!global.data) {
            global.message.show({content: global.utility.format(global.message.text.paramsError, 'data empty.')});
            return;
        }
        markUpDownLine(global.data);
    });
    $(global.dom.search).on('click', function () {
        search(this);
    });
    $(global.dom.start).datepicker({format: 'yyyy-mm-dd'});
    $(global.dom.end).datepicker({format: 'yyyy-mm-dd'});
    global.rompt = new dropdownPrompt({
        container: $(global.dom.stock),
        data: ["jvm", "class-load-info", "thread", "tomcat-processors-info", "tomcat-runtime-info", "data-sources", "operating-system", "system-properties"],
        onSelect: function (item) {
            alert($(item).text());
        }
    });
}

function initEcharts() {
    global.chart = global.echarts.core.init(document.getElementById(global.dom.chart.substr(1)), global.echarts.theme);
    global.chart.render = function (opt) {
        if (opt.option)
            this.setOption(opt.option, true);
        if (opt.series)
            this.setSeries(opt.series);
    };
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'research-template', 'naur.ui.echarts', 'naur.date.lunar', 'naur.math.statistics.finance'], function (mod) {
    global.message = mod.naur.Message;
    $(global.dom.message).message({multiple: false});
    global.http = mod.naur.HTTP;
    global.utility = mod.naur.Utility;
    global.echarts = mod.naur.UI.Echarts;
    global.date = mod.naur.Date;
    global.chineseLunar = mod.naur.Date.ChineseLunar;
    global.finance = mod.naur.Math.Statistics.Finance;
    $(function () {
        init();
        initEcharts();
    });
});

/*-------------------- 初始化 END --------------------*/
