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
    $(global.dom.start).val(new Date());
    $(global.dom.end).val(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
    $(global.dom.search).on('click', function () {
        global.http.acquire({
            uri: global.queryUri,
            context: this,
            error: function (err) {
                $(tbody).html(global.utility.format(global.message.tableTemplate, err));
            },
            success: function (obj) {
                if (0 == obj.output.information.level) {
                    $(tbody).html($.render.session(obj.output.information.data));
                } else {
                    $(tbody).html(global.utility.format(global.message.tableTemplate, obj.output.information.keywords));
                }
            }
        });
    });
}

function initEcharts() {
    global.chart = global.echarts.core.init(document.getElementById(global.dom.chart.substr(1)));
    global.chart.setOption(global.echarts.options.line);
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
