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
 *      <input type="button" title="Clean" onclick="NAURE.Message.empty();"/>
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
            layout:"panel-center", //left, right, center
            eventType:'click', //click, mouse,
            focus:'test', //'article section:last-child'
            html:'<figure>' +
                '   <figcaption class="panel-left {0}" style="background-color: {1};{6}">' +
                //'       <input title="{1}" CHECKED="checked" type="{2}">' +
                '       <input {2}></input>' +
                '   </figcaption>' +
                '   <figcaption class="panel-right {3}" style="background-color: {1};{7}"></figcaption>' +
                '   <figcaption class="panel-center">' +
                '       <span class="node" tag="{4}">{5}</span>' +
                '       <span class="delete"></span>' +
                '       <aside style="display: none;"></aside>' +
                '   </figcaption>' +
                '</figure>'
        }, options);

        opt.buttonsMinimize = false;
        opt.container =
            '<section class="overlay overlay-right-bottom">' +
                '   <section></section>' +
                '   <section class="buttons">' +
                '       <input type="button" title="Clean" onclick="NAURE.Message.empty();"/>' +
                '       <input style="display: none;" title="Reset Graph" type="button">' +
                '       <a class="help_button" title="Help Page" href="about/" target="_blank">&nbsp;</a>' +
                '       <input type="button" class="minimize" title="Minimize" onclick="NAURE.Message.empty();"/>' +
                '   </section>' +
                '</section>';

        $(opt.renderContainer).html(opt.container);
        $('.overlay section:eq(0)').empty();

        var isRichNode = false;
        for (key in opt.nodes) {
            if (typeof(opt.nodes[key]) != 'function')
                isRichNode = true;
            else
                isRichNode = false;
            $('.overlay section:eq(0)').append($.format(opt.html,
                (opt.layout.indexOf('left') != -1 || isRichNode) ? '' : 'panel-left-hide',
                isRichNode ? 'white' : '#07C',
                isRichNode ? NAURE.JSON.toHtml(opt.nodes[key].input) : 'type=checkbox',
                opt.layout.indexOf('right') != -1 ? '' : 'panel-right-hide',
                key,
                isRichNode ? opt.nodes[key].html : key,
                isRichNode ? 'margin-left: -40px;' : '',
                ''
            ));
        }

        //初始化 button 事件
        $('.overlay .node').each(function (index) {
            if (typeof(opt.nodes[$(this).attr('tag')]) == 'function')
                $(this).live(opt.eventType, opt.nodes[this.innerText]);
            else
                $(this).parent().prev().prev().children(':first-child').bind(opt.eventType, opt.nodes[$(this).attr('tag')].handler)
        });

        $('.minimize').live('click', function () {
            opt.buttonsMinimize = !opt.buttonsMinimize;
            if (opt.buttonsMinimize) {
                $('.overlay').addClass('overlay-pile')
                $('.overlay section:eq(0)').fadeOut(400);
            } else {
                $('.overlay section:eq(0)').fadeIn(400);
                $('.overlay').removeClass('overlay-pile')
            }
        });
    };

    $.fn.overlay = function (options) {
        options.renderContainer = this;
        $.overlay(options);
        return this;
    }
})(jQuery);