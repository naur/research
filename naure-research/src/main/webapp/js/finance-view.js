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
    'Equation':function () {
        NAURE.Graphics.System(NAURE.Graphics.Equation);
        NAURE.Graphics.draw();
    },
    'Finance':function () {
        NAURE.Graphics.System(NAURE.Graphics.Finance);
        NAURE.Graphics.draw();
    },
    'Reset':function () {
        NAURE.Graphics.reset();
    },
    'Date':function () {
        var tDate = new Date();
        tDate.setTime(new Number($('#overlay-input').val()) * 3600000);
        NAURE.Message.show({
            content:tDate.toString() + ' ---- ' + new Date().toString()
        });
    },
    'Test':function () {
        alert(new NAURE.Math.Matrix(0, 0, 1).row());
        alert(new NAURE.Math.Matrix([0, 0, 1], [1, 2, 2]).row());
        alert(JSON.stringify(new NAURE.Math.Matrix([0, 0, 1], [1, 2, 2])).matrix);
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay',
    'naure.graphics.ui',
    'naure.graphics.layout',
    'naure.graphics.equation',
    'naure.graphics.finance'], function ($, NAURE) {
    this.NAURE = NAURE;
    $(function () {
        $('body').message({overlay:'left-bottom'});
        $('body').overlay({
            nodes:overlayNodes
        });

        $('article section canvas').NAURE_Graphics({system:NAURE.Graphics.Finance});
    });
});

/*-------------------- 初始化 END --------------------*/

