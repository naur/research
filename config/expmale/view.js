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
 * loading: 'jquery', 'bootstrap', 'jquery.template','naur.analytics', 'naur.utility', 'naur.ui', 'naur.message', 'naur.pattern.ajax'
 * integrate-template: 'jquery', 'jquery.template'
 * research-template: 'jquery', 'integrate-template',
 * */
require(['loading', 'research-template'], function (mod) {
    global.message = mod.naur.Message;
    global.http = mod.naur.HTTP;
    global.utility = mod.naur.Utility;

    $(function () {
        init();
        $(global.dom.area[1]).message();
    });
});

/*-------------------- 初始化 END --------------------*/