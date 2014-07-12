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
    uri: '/scheduler/task',
    dom: {
        container: '#scheduler-container ',
        query: '#search'
    }
}

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function initContainerHead() {
    $(global.dom.container + "thead").html($.render.schedulerHead());
}

function query() {
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvelt() {
    $(global.dom.search).on('click', function () {
        query();
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'integrate-template'], function (mod) {
    global.http = mod.naure.HTTP;
    $(function () {
        initEvelt();
        initContainerHead();
    });
});

/*-------------------- 初始化 END --------------------*/