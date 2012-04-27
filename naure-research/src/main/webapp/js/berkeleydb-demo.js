/*
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Description:
 *              Advanced Design and Analysis Techniques
 * */

/*-------------------- 全局变量 START --------------------*/

var eventHndlers = {
    1:function () {
        $.message.empty();
    },
    2:function () {
        $.message.empty();
    },
    3:function () {
        $.message.empty();
    },
    4:function () {
        $.message.empty();
    }
};

/*-------------------- 全局变量 END --------------------*/

/*-------------------- 函数 START --------------------*/

function print(obj, color) {
    if (color)
        $.message.show({content:JSON.stringify($.toJSON(obj)), color:color});
    else
        $.message.show({content:JSON.stringify($.toJSON(obj))});
}

/*-------------------- 函数 END --------------------*/

/*-------------------- 事件 START --------------------*/

/*-------------------- 事件 END --------------------*/

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('article section:eq(0)').message({placement:'append'});
    $.overlay({
        nodes:new Array('Opening Databases', 'Deferred Write Databases', 'Temporary Databases', 'Closing Databases'),
        eventHandlers:eventHndlers
    });
});

/*-------------------- 初始化 END --------------------*/