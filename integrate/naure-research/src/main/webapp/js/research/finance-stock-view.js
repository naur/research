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
        start: '#start',
        end: '#end'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function init() {
    $(global.dom.start).val(new Date());
    $(global.dom.end).val(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'research-template'], function (NAURE) {
    $(function () {
    });
});

/*-------------------- 初始化 END --------------------*/
