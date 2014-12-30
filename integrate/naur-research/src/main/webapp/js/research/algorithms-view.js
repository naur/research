/**
 * Script:
 *              贾睿之
 * Email:
 *              naur@live.cn
 * Date:
 *              7/4/12 11:01 AM
 * Description:
 *
 */



/*-------------------- 全局变量 START ----------------*/

var NAUR;
var overlayNodes = {
    'arbor':function () {
    },
    'Stacks':function () {
    },
    'Queues':function () {
    },
    'Linked lists':function () {

    },
    'Linked lists (sentinel)':function () {
    },
    'Binary Search Trees':function () {
    },
    'Red-Black Trees':function () {
        NAUR.Message.empty();
        NAUR.Message.show({content:'START'});
    },
    'Treaps':function () {
    },
    'order-statistic tree':function () {
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naur.message', 'naur.ui.overlay', 'naur.graph.ui', 'naur.analytics'], function ($, NAUR) {
    this.NAUR = NAUR;
    $(function () {
        $('body:last-child').message({overlay:'left-bottom'});
        $('body').overlay({
            nodes:overlayNodes
        });

        $('article section canvas').NAUR_Graph_UI();
    });
}, function (err) {
    console.log(err);
});

/*-------------------- 初始化 END --------------------*/



