/*
 * Script：
 *              贾睿之
 * Email：
 *              jiaruizhi@360buy.com
 * Description：
 *            提供 UI 布局的模板处理方法
 * Usage:
 */

define(['jquery', 'naure'], function($, NAURE) {
    /**
     * 翻页控件
     */
    NAURE.UI.pagination = (function () {
        var pagination = function (options) {
            var opt = $.extend({
                index: 1,
                size: 20,
                total: 0,
                region: 5,
                prev: '上一页',
                next: '下一页',
                startPrefix: [1, '...'],
                endPrefix: ['...'],
                container: null,
                onchange: null
            }, options);

            //数据校验
            opt.index = parseInt(opt.index);
            opt.size = parseInt(opt.size);
            opt.total = parseInt(opt.total);
            opt.region = parseInt(opt.region);
            opt.pages = Math.ceil(opt.total / opt.size);
            if (opt.index > opt.pages) opt.index = opt.pages;
            if (opt.index < 1) opt.index = 1;
            opt.endPrefix[1] = opt.pages;

            //计算 按钮数量
            var currRegion = Math.ceil(opt.region / -2) + opt.index;
            var buffer = [];
            for (var i = 0; i < opt.region; i++, currRegion++) {
                if (currRegion >= 1 && currRegion <= opt.pages)
                    buffer.push(currRegion);
            }
            if (buffer.length > 0) {
                buffer = opt.startPrefix.slice(0, buffer[0] - 1).concat(buffer);
                if (buffer[buffer.length - 1] != opt.pages)
                    buffer = buffer.concat(opt.endPrefix.slice(buffer[buffer.length - 1] - opt.pages));
                if (buffer.length >= 3) {
                    if (buffer[2] - buffer[0] == 2) buffer[1] = buffer[0] + 1;
                    if (buffer[buffer.length - 1] - buffer[buffer.length - 3] == 2) buffer[buffer.length - 2] = buffer[buffer.length - 1] - 1;
                }
                if (1 != opt.index) buffer.unshift(opt.prev);
                if (opt.pages != opt.index) buffer.push(opt.next);
            }

            //生成 html
            var str = '共' + opt.total + '条记录. ';
            for (var i in buffer) {
                if (opt.index == buffer[i])
                    str += '<a class="PageSelected">' + buffer[i] + '</a>'
                else
                    str += '<a>' + buffer[i] + '</a>'
            }
            if (opt.container) $(opt.container).html(str);

            //按钮事件
            $(opt.container + ' a').die().on('click', function () {
                var currIndex = $(this).text();
                if (currIndex == opt.index || currIndex == '...') return false;
                if (currIndex == opt.prev) currIndex = opt.index - 1;
                if (currIndex == opt.next) currIndex = opt.index + 1;
                currIndex = parseInt(currIndex);
                if (!currIndex) return false;
                pagination($.extend({}, opt, {
                    index: currIndex
                }));
                if (opt.onchange) opt.onchange({index: currIndex, size: opt.size});
                return false;
            });
        };
        return pagination;
    })();

    NAURE.UI.templet = (function (options) {
        var opt = $.extend({
            name: "",
            renderContainer:null,

            context:null,

            error:null,
            success:null
        }, options);

        NAURE.HTTP.xmlAcquire({
            xmlUrl: '/xml/templet/' + opt.name + '.xml',
            xmlCache:true,
            //xslUrl: '/xsl/body.xsl',
            renderContainer: opt.renderContainer,
            context: opt.context,
            error:function (ex) {
                if (opt.success != null) {
                    opt.success(ex);
                }
            },
            success:function(obj) {
//                $(opt.renderContainer).html(obj.xml.toString());
//                obj.renderContainer = renderContainer;
                if (opt.success != null) {
                    opt.success(obj);
                }
            }
        });
    });

    $.fn.naure_ui_templet = function (options) {
        if (!options) {
            options = {};
        }
        options.renderContainer = this;
        NAURE.UI.templet(options);
        return this;
    }
});
