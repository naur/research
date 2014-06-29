/**
 * Created by Administrator on 3/8/14.
 */

define(['jquery', 'jquery.template'],
    function ($, $1, echarts, event) {
        //菜单
        $.templates("menu", "<div>{{:#index+1}}: <b>{{>name}}</b> ({{>releaseYear}})</div>");
        //检测对象【平台信息 + 仓库信息】选择列表
        $.templates("whSelect", "{{if 0 == #index}} <option value='' selected> 全选</option> {{/if}}" +
            "<option value='{{>id}}' tag='{{>type}}'>" +
            '{{if 2 == type}} ---- {{>value}} ---- {{else}} {{>value}} {{/if}}' +
            "</option>");
        //检测对象【平仓库信息】，格式：{id:name, ...... } ，过滤掉平台信息，只返回仓库数据
        $.templates("whJson", '{{if 2 == type}} "{{>id}}" : "{{>value}}",{{/if}}');

        //作业环节选择列表
        $.templates("phaseSelect", "<option value='{{>id}}' tag='{{>type}}' " +
            "{{if 0 == #index}} selected {{/if}}" +
            " >{{>value}}</option>");
        //作业环节，格式：{id:name, ...... }
        $.templates("phaseJson", '"{{>id}}" : "{{>value}}",');

        $.templates('jade', '<div class=\"col-md-2\">' +
            '        <div class=\"thumbnail\">' +
            '            <img style=\"width: 100%;  display: block;\" alt=\"{{>title}}\"' +
            '                 src=\"{{>uri}}\"' +
            '' +
            '            <div class=\"caption\">' +
            '                <h4>{{>name}}</h4>' +
            '' +
            '                <p>{{>description}}</p>' +
            '' +
            '                <div class=\"text-right\">' +
            '                   <a class="btn btn-info btn-xs" role="button" href="#">购买</a>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>');

        return {
            jquery: $
        }
    }
);
