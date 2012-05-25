/*
 * Script：
 *              贾睿之
 * Email：
 *              jiaruizhi@360buy.com
 *
 *<section class="overlay overlay-right">
 *   <section>
 *       <figure>
 *          <!--<figcaption style="background-color: rgb(0, 119, 204);">-->
 *          <!--<input title="Show/Hide Graph" CHECKED="checked" type="checkbox">-->
 *          <!--</figcaption>-->
 *          <!--<span class="matheditor mathquill-rendered-math mathquill-editable"></span>-->
 *          <!--<span class="delete"></span>-->
 *          <!--<aside style="display: none;"></aside>-->
 *      </figure>
 *  </section>
 *
 *  <section class="buttons">
 *      <input type="button" title="Clean" onclick="$.message.empty();"/>
 *      <input style="display: none;" title="Reset Graph" type="button">
 *          <a class="help_button" title="Help Page" href="about/" target="_blank">&nbsp;</a>
 *      </section>
 *</section>
 *
 * Usage:
 */

(function ($) {
    $.overlay = function (options) {
        var opt = $.extend({
            target:null,
            nodes:null,
            renderContainer:null,
            eventHandlers:null,
            eventType:'click', //click, mouse,
            html:'<figure>' +
                '   <figcaption style="background-color: {0};">' +
                '       <input title="Show/Hide Graph" CHECKED="checked" type="checkbox">' +
                '   </figcaption>' +
                '   <span class="matheditor mathquill-rendered-math mathquill-editable"><span class="button">{1}</span></span>' +
                '   <span class="delete"></span>' +
                '   <aside style="display: none;"></aside>' +
                '</figure>'
        }, options);

        opt.buttonsMinimize = false
        opt.container =
            '<section class="overlay overlay-right">' +
                '   <section></section>' +
                '   <section class="buttons">' +
                '       <input type="button" title="Clean" onclick="$.message.empty();"/>' +
                '       <input style="display: none;" title="Reset Graph" type="button">' +
                '       <a class="help_button" title="Help Page" href="about/" target="_blank">&nbsp;</a>' +
                '       <input type="button" class="minimize" title="Minimize" onclick="$.message.empty();"/>' +
                '   </section>' +
                '</section>';

        $(opt.renderContainer).html(opt.container);
        $('.overlay section:eq(0)').empty();
        for (key in opt.nodes) {
            $('.overlay section:eq(0)').append($.format(opt.html, '#07C', key));
        }

        //初始化 button 事件
        $('.overlay .button').each(function (index) {
            $(this).live(opt.eventType, opt.nodes[this.innerText]);
        });
        $('.minimize').live('click', function () {
            if (opt.buttonsMinimize)
                $('.overlay section:eq(0)').fadeIn(500);
            else
                $('.overlay section:eq(0)').fadeOut(1000);
            opt.buttonsMinimize = !opt.buttonsMinimize;
        });
    };

    $.fn.overlay = function (options) {
        options.renderContainer = this;
        $.overlay(options);
        return this;
    }
})(jQuery);