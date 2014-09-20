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
    http: null,
    message: null,
    sessionUri: '/diagnostic/session.json',
    dom: {
        area: ['.row:eq(0) div', '.row:eq(0) div'],
        session: '#session',
        analysis: '#analysis'
    }
};

/*-------------------- 初始化 START --------------------*/

/*
 * loading: 'jquery', 'bootstrap', 'jquery.template','naure.analytics', 'naure.utility', 'naure.ui', 'naure.message', 'naure.pattern.ajax'
 * integrate-template: 'jquery', 'jquery.template'
 * research-template: 'jquery', 'integrate-template',
 * */
require(['loading', 'research-template'], function (mod) {
    global.message = mod.naure.Message;
    global.http = mod.naure.HTTP;
    global.utility = mod.naure.Utility;

    $(function () {
        init();
        $(global.dom.area[1]).message();
    });
});

/*-------------------- 初始化 END --------------------*/