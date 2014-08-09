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
    jadeUri: '/jade/get.json',
    row: '<div class="row"></div>',
    dom: {
        contailer: '.row:last'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function query() {
    global.http.acquire({
        data: {
            name: null,
            classify: null
        },
        uri: global.jadeUri,
        error: function (err) {
        },
        success: function (obj) {
            var jades = obj.output.information.data;
            if (!jades) return;

            do {
                $(global.dom.contailer).after(global.row);
                $(global.dom.contailer).html(
                    $.render.jade(jades.splice(0, 6))
                );
            } while (jades.length > 0);
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/



/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'shoping-template', 'naure.utility'], function (mod) {
    global.http = mod.naure.HTTP;
    global.utility = mod.naure.Utility;

    $(function () {
        query();
    });
});

/*-------------------- 初始化 END --------------------*/