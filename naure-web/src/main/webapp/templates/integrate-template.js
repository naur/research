/**
 * Created by Administrator on 3/8/14.
 */

define(['jquery', 'jquery.template'],
    function ($, $1, echarts, event) {
        //菜单
        $.templates("schedulerHead", "<tr><th>INDEX</th><th>ID</th><th>NAME</th><th>CRON</th><th>TASK</th><th>OPTIONS</th></tr>");
        $.templates("scheduler", '<tr><td>{{:#index+1}}</td><td>{{>id}}</td><td>{{>name}}</td><td>{{>cron}}</td><td>{{>task}}</td>' +
            '<td>' +
            '   <div class="row">' +
            '        <div class="col-md-10 col-md-offset-1">' +
            '            <div class="input-group input-group-sm">' +
            '                <input type="text"  class="form-control">' +
            '           &nbsp;&nbsp;' +
            '                <span class="input-group-btn">' +
            '                    <button class="btn btn-default"  type="button">Execute!</button>' +
            '                </span>' +
            '          </div>' +
            '        </div>' +
            '    </div>' +
            '</td>' +
            '</tr>');

        //Session
        $.templates();

        return {
            jquery: $
        }
    }
);
