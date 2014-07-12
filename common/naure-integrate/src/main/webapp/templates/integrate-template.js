/**
 * Created by Administrator on 3/8/14.
 */

define(['jquery', 'jquery.template'],
    function ($, $1, echarts, event) {
        //菜单
        $.templates("schedulerHead", "<tr><th>INDEX</th><th>ID</th><th>NAME</th><th>CRON</th><th>TASK</th></tr>");
        $.templates("scheduler", "<tr><td>{{:#index+1}}</td><td>{{>id}}</td><td>{{>name}}</td><td>{{>cron}}</td><td>{{>task}}</td><tr>");

        return {
            jquery: $
        }
    }
);
