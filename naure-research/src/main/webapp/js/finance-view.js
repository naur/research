/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/6/12 9:49 AM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/
var NAURE;
var overlayNodes = {
    Input:{
        html:'<input id="overlay-input" type="text" />'
    },
    'Stock':function () {
        NAURE.Graph.UI.drawLine();
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.graphics.ui', 'naure.graphics.layout'], function ($, NAURE) {
    this.NAURE = NAURE;
    $(function () {
        $('body').message({overlay:'left-bottom'});
        $('body').overlay({
            nodes:overlayNodes
        });

        $('article section canvas').NAURE_Graphics();
    });
});

/*-------------------- 初始化 END --------------------*/

