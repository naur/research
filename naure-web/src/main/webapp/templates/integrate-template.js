/**
 * Created by Administrator on 3/8/14.
 */

define(['jquery', 'jquery.template'],
    function ($, $1, echarts, event) {
        //table
        $.templates('table', '<table><thead></thead> <tbody></tbody></table>');

        //session
        $.templates('sessionHead', '<tr>' +
            '<th>application</th><th>sessionId</th>' +
            '<th>ipAddress</th><th>hostName</th><th>cpu</th><th>user</th><th>language</th><th>platform</th><th>severity</th>' +
            '<th>userAgent</th><th>requestType</th><th>timestamp</th><th>requestHost</th><th>statusCode</th><th>requestPath</th><th>refererUrl</th></tr>');
        $.templates('session',
                '{{if logs}}' +
                '   {{for logs}}' +
                '      <tr>' +
                '       {{if #index===0}}' +
                '               <td rowspan="{{>#parent.parent.data.logs.length}}">{{>#parent.parent.data.application}}</td><td rowspan="{{>#parent.parent.data.logs.length}}">{{>#parent.parent.data.sessionId}}</td>' +
                '       {{/if}}' +
                '           <td>{{>ipAddress}}</td><td>{{>hostName}}</td><td>{{>cpu}}</td><td>{{>user}}</td><td>{{>language}}</td><td>{{>platform}}</td><td>{{>severity}}</td>' +
                '           <td>{{>userAgent}}</td><td>{{>requestType}}</td><td>{{>timestamp}}</td><td>{{>requestdost}}</td><td>{{>statusCode>}}</td><td>{{>requestPatd}}</td><td>{{>refererUrl}}</td>' +
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
