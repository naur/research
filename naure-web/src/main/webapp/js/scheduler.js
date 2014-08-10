/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yihaodian.com
 * Date:
 *              2014/7/12 17:13
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var global = {
    uri: '/scheduler/task.json',
    dom: {
        container: '#scheduler-container ',
        search: '#search'
    },
    tableMessage: '<tr><td colspan="100">{0}</td></tr>'
}

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function initContainerHead() {
    $(global.dom.container + "thead").html($.render.schedulerHead());
}

function search() {
    $(global.dom.container + "tbody").html(global.utility.format(global.tableMessage, global.message.text.loading));
    global.http.acquire({
        uri: global.uri,
        error: function (err) {
            $(global.dom.container + "tbody").html(global.utility.format(global.tableMessage, err));
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                $(global.dom.container + "tbody").html($.render.scheduler(obj.output.information.data));
            } else {
                $(global.dom.container + "tbody").html(global.utility.format(global.tableMessage, obj.output.information.keywords));
            }
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvelt() {
    $(global.dom.search).on('click', function () {
        search();
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'integrate-template'], function (mod) {
    global.http = mod.naure.HTTP;
    global.message = mod.naure.Message;
    global.utility = mod.naure.Utility;
    $(function () {
        initEvelt();
        initContainerHead();
        $(global.dom.search).click();
    });
});

/*-------------------- 初始化 END --------------------*/