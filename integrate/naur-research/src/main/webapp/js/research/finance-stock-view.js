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
    queryUri: '/finance/stock', // /{type}/{code}/{start}/{end}
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
    $(global.dom.start).val(new Date(new Date().getTime() - WkMilli).format('yyyy-MM-dd'));
    $(global.dom.end).val(new Date().format('yyyy-MM-dd'));
    $(global.dom.search).on('click', function () {

        global.params = getParams();
        var data = {
            'stock': [
                {key: '2014-12-26', value: 20},
                {key: '2014-12-27', value: 60},
                {key: '2014-12-28', value: 120},
                {key: '2014-12-29', value: 10},
                {key: '2015-01-02', value: 30}
            ]
        };
        var option = global.echarts.getChartOption(global.params);
        var series = global.echarts.getSeries(data, global.params);
        global.chart.render({option: option, series: series});

        //global.http.acquire({
        //    uri: global.queryUri,
        //    context: this,
        //    error: function (err) {
        //        $(tbody).html(global.utility.format(global.message.tableTemplate, err));
        //    },
        //    success: function (obj) {
        //        if (0 == obj.output.information.level) {
        //            $(tbody).html($.render.session(obj.output.information.data));
        //        } else {
        //            $(tbody).html(global.utility.format(global.message.tableTemplate, obj.output.information.keywords));
        //        }
        //    }
        //});
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
        start: $(global.dom.start).val() + 'T00:00:00+08:00',
        end: $(global.dom.end).val() + 'T00:00:00+08:00',
        lines: {stock: '---'},
        title: '----',
        dataZoomLimit: 40,
        pointFilter: function (date) {
            return global.utility.holiday(date);
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

require(['loading', 'research-template', 'naur.ui.echarts'], function (mod) {
    global.message = mod.naur.Message;
    global.http = mod.naur.HTTP;
    global.utility = mod.naur.Utility;
    global.echarts = mod.naur.UI.Echarts;
    $(function () {
        init();
        initEcharts();
    });
});

/*-------------------- 初始化 END --------------------*/
