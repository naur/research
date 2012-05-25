/*
 * Script：
 *              贾睿之
 * Email：
 *              jiaruizhi@360buy.com
 * Usage:
 *
 */

(function ($) {
    $.overlay = function (options) {
        var opt = $.extend({
            target:null,
            nodes:null,
            eventHandlers:null,
            eventType:'click', //click, mouse,
            html:'<figure>' +
                '<figcaption style="background-color: {0};">' +
                '<input title="Show/Hide Graph" CHECKED="checked" type="checkbox">' +
                '</figcaption>' +
                '<span class="matheditor mathquill-rendered-math mathquill-editable"><span class="button">{1}</span></span>' +
                '<span class="delete"></span>' +
                '<aside style="display: none;"></aside>' +
                '</figure>'
        }, options);

        $('.overlay section:eq(0)').empty();

        for (key in opt.nodes) {
            $('.overlay section:eq(0)').append($.format(opt.html, '#07C', key));
        }

        //初始化 button 事件
        $('.overlay .button').each(function (index) {
            $(this).live(opt.eventType, opt.nodes[this.innerText]);
        });
    };
})(jQuery);