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
    naur: null, message: null, number: null
};

var dom = {
    params: '#params',
    gcd: '#gcd-euclid',
    gcd_extended: '#gcd-euclid-extended',
    message: '.layout-left:first'
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(dom.gcd).on('click', function () {
        global.message.show({content: "GCD: Euclid's algorithm", clear: true});

        var opt = $.parseJSON($(dom.params).val());
        var maxGCD = global.number.gcd_euclid(opt.a, opt.b, function (msg) {
            global.message.show({content: JSON.stringify(msg)});
        });
        global.message.show({content: maxGCD, color: 'red'});
    });

    $(dom.gcd_extended).on('click', function () {
        global.message.show({content: "GCD: The extended form of Euclid's algorithm", clear: true});

        var opt = $.parseJSON($(dom.params).val());
        var maxGCD = global.number.gcd_euclid_extended(opt.a, opt.b, function (msg) {
            global.message.show({content: JSON.stringify(msg)});
        });
        global.message.show({content: JSON.stringify(maxGCD), color: 'red'});
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naur.message', 'naur.math.number'], function ($, NAUR) {
    global.naur = NAUR;
    global.message = NAUR.Message;
    global.number = NAUR.Math.Number;

    $(function () {
        $(dom.message).message();
        initEvent();
    });
});

/*-------------------- 初始化 END --------------------*/