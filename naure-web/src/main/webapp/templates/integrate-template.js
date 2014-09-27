/**
 * Created by Administrator on 3/8/14.
 */

define(['jquery', 'jquery.template'],
    function ($) {
        //TODO http://msdn.microsoft.com/zh-cn/magazine/hh975379.aspx
        //TODO http://msdn.microsoft.com/zh-cn/magazine/hh882454.aspx
        //转换器
        $.views.converters({
            //毫秒转换
            millisFormat: function (value) {
                return new Date(value).toString();
            }
        });

        $.templates('table', '<table><thead><tr>' +
            '{{props ~root}}' +
            '   <th class="head_{{>key}}">{{>prop}}</th>' +
            '{{/props}}' +
            '</tr></thead><tfoot></tfoot><tbody></tbody></table>');

        $.templates('row', '<tr>' +
            '{{props ~root}}' +
            '   <td class="row_{{>key}}">{{>prop}}</td>' +
            '{{/props}}' +
            '</tr>');

        //session
        $.templates('session',
                '{{if logs}}' +
                '   {{for logs}}' +
                '      <tr>' +
                '       {{if #index === 0}}' +
                //TODO https://github.com/BorisMoore/jsrender/issues/96
                //TODO https://github.com/BorisMoore/jsrender/issues/97
                //TODO {{:#index}} returns the index of the view it is in. Any block tag renders its content as a new child view, and that includes the {{if}} tag. So {{:#index}} is not finding the index of the same view if it is in the content of the {{if}} tag. {{:#parent.index}} will find you the index of the parent view, outside the {{if}} block.
                '               <td rowspan="{{>#parent.parent.parent.data.logs.length}}">{{>#parent.parent.parent.data.application}}</td><td rowspan="{{>#parent.parent.parent.data.logs.length}}">{{>#parent.parent.parent.data.sessionId}}</td>' +
                '       {{/if}}' +
                '           <td>{{>ipAddress}}</td><td>{{millisFormat:timestamp}}</td><td>{{>requestType}}</td><td>{{>hostName}}</td><td>{{>requestPath}}</td><td>{{>platform}}</td>' +
                '           <td>{{>cpu}}</td><td>{{>user}}</td><td>{{>language}}</td><td>{{>userAgent}}</td><td>{{>statusCode}}</td><td>{{>severity}}</td><td>{{>refererUrl}}</td><td>{{>requestHost}}</td>' +
                '      </tr>' +
                '   {{/for}} ' +
                '{{else}}' +
                '   <tr><td>{{>application}}</td><td>{{>sessionId}}</td><td colspan="14"></td></tr>' +
                '{{/if}} ');

        //scheduler
        $.templates('schedulerHead', '<tr><th>INDEX</th><th>NAME</th><th>CRON</th><th>TASK</th>' +
            '<th>RECENT</th><th>STARTTIME</th><th>COMPLETED</th><th>MESSAGE</th><th>DURATION</th>' +
            '<th>OPTIONS</th></tr>');
        $.templates('scheduler', '<tr tag="{{>id}}"><td>{{:#index+1}}</td><td>{{>name}}</td><td>{{>cron}}</td><td>{{>task}}</td>' +
            '{{if status}}' +
            '<td>{{>status.recent}}</td><td>{{>status.startTime}}</td><td>{{>status.completed}}</td><td>{{>status.message}}</td><td>{{>status.duration}}</td>' +
            '{{else}}' +
            '<td></td><td></td><td></td><td></td><td></td>' +
            '{{/if}}' +
            '<td>' +
            '   <div class="row">' +
            '        <div class="col-md-10 col-md-offset-1">' +
            '            <div class="input-group input-group-sm">' +
            '                <input type="text"  class="form-control">' +
            '           &nbsp;&nbsp;' +
            '                <span class="input-group-btn">' +
            '                    <button class="btn btn-default run"  type="button">RUN!</button>' +
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
