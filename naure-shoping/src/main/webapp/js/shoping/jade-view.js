/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yihaodian.com
 * Date:
 *              2014/6/27 15:13
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var global = {
    jadeUri: '/jade/all.json',
    dom: {
        contailer: '.row:first'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function query() {
    global.http.acquire({
        data: null,
        uri: global.jadeUri,
        error: function (err) {
        },
        success: function (obj) {
            $(global.dom.contailer).html($.render.jade(obj.output.information.data));
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/



/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'shoping-template'], function (mod) {
    global.http = mod.naure.HTTP;

    $(function () {
        query();
    });
});

/*-------------------- 初始化 END --------------------*/