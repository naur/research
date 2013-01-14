/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              13-1-14 下午2:37
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var global = {
    naure: null, message: null, number: null
};

var dom = {
    gcd: '#gcd',
    message: '.layout-right:first'
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(dom.gcd).live('click', function () {
        global.message.show({content: "GCD", clear: true});
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.math.number'], function ($, NAURE) {
    global.naure = NAURE;
    global.message = NAURE.Message;
    global.number = NAURE.Math.Number;

    $(function () {
        $(dom.message).message();
        initEvent();
    });
});

/*-------------------- 初始化 END --------------------*/