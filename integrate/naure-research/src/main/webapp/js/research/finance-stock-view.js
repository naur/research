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
        end: '#stock_end_date'
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

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'research-template'], function (mod) {
    global.message = mod.naure.Message;
    global.http = mod.naure.HTTP;
    global.utility = mod.naure.Utility;
    $(function () {
        init();
    });
});

/*-------------------- 初始化 END --------------------*/
