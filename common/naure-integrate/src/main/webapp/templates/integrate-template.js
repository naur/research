/**
 * Created by Administrator on 3/8/14.
 */

define(['jquery', 'jquery.template'],
    function ($, $1, echarts, event) {
        //菜单
        $.templates("schedulerHead", "<tr><td>{{:#index+1}}: <b>{{>name}}</b> ({{>releaseYear}})</td><tr>");
        $.templates("scheduler", "<tr><td>{{:#index+1}}: <b>{{>name}}</b> ({{>releaseYear}})</td><tr>");

        return {
            jquery: $
        }
    }
);
