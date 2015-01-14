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
                global.data = {};
                for (var stock in stocks) {
                    //设置线段名
                    global.params.lines[stocks[stock].code] = stocks[stock].type.toLowerCase() + stocks[stock].code;
                    global.data[stocks[stock].code] = [];
                    for (var quote in stocks[stock].quotes) {
                        global.data[stocks[stock].code].push({
                            key: new Date(stocks[stock].quotes[quote].date).format('yyyy-MM-dd'),
                            value: stocks[stock].quotes[quote].close
                        });
                    }
                }

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
    var seriesIdx = 0;
    var t1, t2, t3;
    for (var line in data) {
        var markPoints = [];
        for (var point in data[line]) {
            if (!t1) {
                t1 = data[line][point];
                continue;
            }
            if (!t2) {
                t2 = data[line][point];
                continue;
            }
            t3 = data[line][point];
            if (t2.value > t1.value && t2.value > t3.value) {
                markPoints.push(t2);
            }
            t1 = t2;
            t2 = t3;
        }
        global.chart.addMarkLine(seriesIdx, global.echarts.markDirectedPoint(markPoints, function (point) {
            return {
                xAxis: point.key,
                yAxis: point.value
            };
        }));
    }
}

function init() {
    $(global.dom.start).val(new Date(new Date().getTime() - DyMilli - 6 * WkMilli).format('yyyy-MM-dd'));
    $(global.dom.end).val(new Date(new Date().getTime() - DyMilli).format('yyyy-MM-dd'));
    $(global.dom.directedPoint).on('click', function () {
        markUpDownLine(global.data);
    });
    $(global.dom.search).on('click', function () {
        search(this);
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

function getParams() {
    var tmp = {
        stock: $(global.dom.stock).val(),
        start: new Date($(global.dom.start).val() + 'T00:00:00+08:00'),
        end: new Date($(global.dom.end).val() + 'T00:00:00+08:00'),
        lines: {},
        dataZoomLimit: 40,
        pointFilter: function (date) {
            return global.date.stockHoliday(date);
        }
    };
    tmp.title = new Date(tmp.start).format('yyyy年MM月dd日') + ' --- ' + new Date(tmp.end).format('yyyy年MM月dd日');
    tmp.points = global.echarts.parsePoints(tmp);
    return tmp;
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'research-template', 'naur.ui.echarts', 'naur.date.lunar'], function (mod) {
    global.message = mod.naur.Message;
    $(global.dom.message).message({multiple: false});
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
