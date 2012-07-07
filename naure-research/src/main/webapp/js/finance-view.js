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

require(['jquery', 'naure.message', 'naure.overlay', 'naure.graph.ui'], function ($, NAURE) {

    /*-------------------- 全局变量 START ----------------*/

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

    $(function () {
        $('body').message({overlay:'left-bottom'});
        $('body').overlay({
            nodes:overlayNodes
        });

        $('article section canvas').NAURE_Graph_UI();
    });

    /*-------------------- 初始化 END --------------------*/

});