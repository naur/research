/**
 * Created by Administrator on 3/8/14.
 */


define(['jquery', 'metro', 'jquery.template',
    'naure.utility', 'naure.ui', 'naure.pattern.ajax'],
    function ($, $1, $2, naure) {
        //TODO 导航菜单
//        $.get("/templates/navigation.html", function (value) {
//            $.templates('navigation', value);
//            $(global.dom.navigation).html($.render.navigation());
//            $.Metro.initAll();
//        });

        echarts.EVENT = event;
        return {
            jquery: $,
            naure: naure,
            echarts: echarts
        }
    }
);