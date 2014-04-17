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

define(['jquery', 'jquery.strings.js', 'naure', 'naure.utility.js'], function ($, $1, NAURE) {

    NAURE.UI.Overlay = (function () {
        var dom = {
            overlay: '.overlay',
            overlaySection: '.overlay section:eq(0)',
            overlayClean: '.overlay-clean',
            overlayMinimize: '.overlay-minimize',
            overlayPile: 'overlay-pile'
        };
        var overlay = {
            items: [],
            isMminimize: false,
            onChanged: null,
            find: function (key) {
                for (var index in overlay.items) {
                    if (!overlay.items.hasOwnProperty(index)) break;
                    if (key == overlay.items[index].key)
                        return overlay.items[index].value;
                }
                return null;
            },
            minimize: function () {
                overlay.isMminimize = true;
                $(dom.overlay).addClass(dom.overlayPile)
                $(dom.overlaySection).fadeOut(400);
                if (overlay.onChanged)
                    overlay.onChanged();
            },
            maximize: function () {
                overlay.isMminimize = false;
                $(dom.overlaySection).fadeIn(400);
                $(dom.overlay).removeClass(dom.overlayPile)
                if (overlay.onChanged)
                    overlay.onChanged();
            },
            change: function () {
                if (overlay.isMminimize)  overlay.maximize();
                else overlay.minimize();
            },

            init: function (options) {
                var opt = $.extend({
                    target: null,
                    nodes: null,
                    container: 'body',
                    placement: "right-bottom", //left, right, center, top, center, bottom
                    eventHandlers: null,
                    layout: "panel-center", //left, right, center
                    eventType: 'click', //click, mouse,
                    focus: 'test', //'article section:last-child'
                    //model: 'nav', //nav , text
                    clear: null,
                    onChanged: null,
                    html: '<figure>' +
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

                overlay.isMminimize = false;
                overlay.onChanged = opt.onChanged;

                opt.navHtml =
                    '<nav class="overlay overlay-right-bottom">' +
                        '   <section></section>' +
                        '   <section class="buttons">' +
                        '       <input type="button" class="overlay-clean" title="Clean" />' +
                        '       <input style="display: none;" title="Reset Graph" type="button" />' +
                        '       <a class="help_button" title="Help Page" href="about/" target="_blank" />&nbsp;</a>' +
                        '       <input type="button" class="overlay-minimize" title="Minimize"/>' +
                        '   </section>' +
                        '</nav>';

                $(opt.container).append(opt.navHtml);
                $(dom.overlaySection).empty();

                var isRichNode = false;

                for (key in opt.nodes) {
                    if (!opt.nodes.hasOwnProperty(key)) break;
                    if (typeof(opt.nodes[key]) != 'function' && opt.nodes[key].input) isRichNode = true;
                    else isRichNode = false;
                    $(dom.overlaySection).append($.format(opt.html,
                        (opt.layout.indexOf('left') != -1 || isRichNode) ? '' : 'panel-left-hide',
                        isRichNode ? 'transparent' : '#07C',
                        isRichNode ? NAURE.JSON.toHtml(opt.nodes[key].input) : 'type=checkbox',
                        opt.layout.indexOf('right') != -1 ? '' : 'panel-right-hide',
                        key,
                        isRichNode || opt.nodes[key].html ? opt.nodes[key].html : key,
                        isRichNode ? 'margin-left: -36px;' : '',
                        ''
                    ));
                }

                //初始化 button 事件
                overlay.items = [];
                $('.overlay .node').each(function (index) {
                    if (typeof(opt.nodes[$(this).attr('tag')]) == 'function')
                        $(this).on(opt.eventType, opt.nodes[this.innerText]);
                    else
                        $(this).parent().prev().prev().children(':first-child').bind(opt.eventType, this, opt.nodes[$(this).attr('tag')].handler)

                    overlay.items.push({key: $(this).attr('tag'), value: this});
                });

                $(dom.overlayClean).on('click', function () {
                    NAURE.Message.empty();
                    if (opt.clean)
                        opt.clean();
                });

                $(dom.overlayMinimize).on('click', function () {
                    overlay.change();
                });
            }
        };

        return overlay;
    })();

    $.fn.overlay = function (options) {
        options.container = this;
        NAURE.UI.Overlay.init(options);
        return this;
    };

    return NAURE;
});

//(function ($) {
//
//})(jQuery);