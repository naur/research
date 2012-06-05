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
    'Dynamic Programming':function () {
        NAURE.Message.empty();
        NAURE.Message.show({content:'Dynamic Programming', color:'silver'});
        var matrixChain = new MatrixChain(
            '30 x 35',
            '35 x 15',
            '15 x 5',
            '5 x 10',
            '10 x 20',
            '20 x 25'
        );

        matrixChain.inorderWalk(matrixChain.p, function (item) {
            NAURE.Message.show({content:JSON.stringify($.toJSON(item))});
        });

        matrixChain.order(matrixChain.p);

        matrixChain.inorderWalk(matrixChain.m, function (item) {
            NAURE.Message.show({content:JSON.stringify($.toJSON(item)), color:'blue'});
        });
        matrixChain.inorderWalk(matrixChain.s, function (item) {
            NAURE.Message.show({content:JSON.stringify($.toJSON(item)), color:'red'});
        });

        NAURE.Message.show({content:'memoized', color:'silver'});

        matrixChain.memoized(matrixChain.p);
        matrixChain.inorderWalk(matrixChain.m, function (item) {
            NAURE.Message.show({content:JSON.stringify($.toJSON(item)), color:'yellow'});
        });
    },
    'Longest Common Subsequence':function () {
        NAURE.Message.empty();
    },
    'Greedy Algorithms':function () {
        NAURE.Message.empty();
    },
    'Amortized Analysis': function () {

    }
};

/*-------------------- 全局变量 END --------------------*/

/*-------------------- 函数 START --------------------*/

function print(obj, color) {
    if (color)
        NAURE.Message.show({content:JSON.stringify($.toJSON(obj)), color:color});
    else
        NAURE.Message.show({content:JSON.stringify($.toJSON(obj))});
}

/*-------------------- 函数 END --------------------*/

/*-------------------- 事件 START --------------------*/

/*-------------------- 事件 END --------------------*/

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('body').naure_ui_templet({name: 'templet1', success: function() {
        $('article section:eq(0)').message({placement:'append'});
        $('aside').overlay({
            nodes:overlayNodes
        });
    }});
});

/*-------------------- 初始化 END --------------------*/