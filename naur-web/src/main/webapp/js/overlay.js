/*
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Description:
 *              Advanced Design and Analysis Techniques
 * */

/*-------------------- 全局变量 START --------------------*/

var overlayNodes = {
    'Opening Databases':function () {
        NAUR.Message.empty();
    },
    'Deferred Write Databases':function () {
        NAUR.Message.empty();
    },
    'Temporary Databases':function () {
        NAUR.Message.empty();
    },
    'Closing Databases':function () {
        NAUR.Message.empty();
    }
};

/*-------------------- 全局变量 END --------------------*/

/*-------------------- 函数 START --------------------*/

function print(obj, color) {
    if (color)
        NAUR.Message.show({content:JSON.stringify($.toJSON(obj)), color:color});
    else
        NAUR.Message.show({content:JSON.stringify($.toJSON(obj))});
}

/*-------------------- 函数 END --------------------*/

/*-------------------- 事件 START --------------------*/

/*-------------------- 事件 END --------------------*/

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('article section:eq(0)').message({placement:'append'});
    $('nav').overlay({
        nodes:overlayNodes
    });
});

/*-------------------- 初始化 END --------------------*/