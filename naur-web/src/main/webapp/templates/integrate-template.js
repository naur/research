/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/25/12 5:11 PM
 * Description:
 *              NAUR Analytics Service
 * Usage:
 *
 *      STEP1: global.table: {index: 'INDEX',name: 'NAME'};
 *      STEP2: $(global.dom.container).html($.render.table(global.table));
 *      STEP3: $(global.dom.container + ' table tbody').html(
 *                      $.render.row(
 *                              $.views.toRow(obj.output.information.data, global.table)
 *                      )
 *                  );
 *      $('.link_className').flyout({prompt: '采购单号'});
 */

define(['jquery', 'jquery.template'],
    function ($) {

        var DOT = ".";
        var UNDERLINE = "_";

        //TODO http://msdn.microsoft.com/zh-cn/magazine/hh975379.aspx
        //TODO http://msdn.microsoft.com/zh-cn/magazine/hh882454.aspx
        //转换器
        $.views.converters({
            //毫秒转换
            millisFormat: function (value) {
                return new Date(value).toString();
            }
        });

        /**
         * 转化 JSON 数据为数组
         * @param properties
         * @param rows
         * @param parse
         * @returns {Array}
         */
        $.views.toRow = function (properties, rows, parse) {
            parse = $.extend({
                before: null,
                handle: function (data, prop, result) {
                    var value = null;
                    //当包含[.]时默认认为是子对象的属性
                    if (prop.indexOf(DOT) == -1) {
                        value = data[prop];
                    } else {
                        var props = prop.split(DOT);
                        if (data[props[0]]) {
                            value = data[props[0]][props[1]];
                        }
                    }
                    result[prop.replace(DOT, UNDERLINE)] = value;
                    return true;
                },
                after: null
            }, parse);

            var results = [];
            if (!rows || rows.length <= 0) return results;

            for (var row in rows) {
                if (!rows.hasOwnProperty(row)) continue;
                var result = {}, isBreak;
                result['index'] = parseInt(row) + 1;
                for (var prop in properties) {
                    if (!properties.hasOwnProperty(prop)) continue;
                    isBreak = false;
                    if (parse.before)
                        isBreak = parse.before(rows[row], prop, result);
                    if (parse.handle && !isBreak)
                        isBreak = parse.handle(rows[row], prop, result);
                    if (parse.after && !isBreak)
                        parse.after(rows[row], prop, result);
                }
                results.push(result);
            }

            return results;
        };

        $.templates('table', '<table><thead><tr><th class="head_index">INDEX</th>' +
        '{{props ~root}}' +
        '   <th class="head_{{>key}}">{{>prop}}</th>' +
        '{{/props}}' +
        '</tr></thead><tfoot></tfoot><tbody></tbody></table>');

        $.templates('row', '<tr>' +
        '{{props #data}}' +
        '   <td class="row_{{>key}}">{{:prop}}</td>' +
        '{{/props}}' +
        '</tr>');

        //session
        $.templates('session',
            '{{if logs}}' +
            '   {{for logs}}' +
            '      <tr><td>{{:#index}}</td>' +
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

        return {
            jquery: $
        }
    }
);
