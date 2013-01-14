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
    params: '#params',
    gcd: '#gcd',
    message: '.layout-left:first'
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(dom.gcd).live('click', function () {
        global.message.show({content: "GCD", clear: true});

        var opt = JSON.parse($(dom.params).val());
        var maxGCD = global.number.gcd_euclid(opt.a, opt.b, function (msg) {
            global.message.show({content: JSON.stringify(msg)});
        });
        global.message.show({content: maxGCD, color: 'red'});
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