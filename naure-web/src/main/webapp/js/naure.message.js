/*
 * Script：
 *              贾睿之
 * Email：
 *             jiaruizhi@360buy.com
 *
 * Description：
 *            状态管理，提供页面显示相关信息的功能集。
 *
 * Usage:
 *     example1:
 *                  $('.className').message({title: '上传文件', comment: '反馈信息'});
 *                  NAURE.Message.promptLine({content:  "文本内容信息"});
 *      example2:
 *                  $('.className').message({content: '查询数据结束！', placement: 'before', fade: true});
 *                  NAURE.Message.fade('获取数据错误！', 'red');
 *                  $('#className').message.fade({content: '切换表头！', color: 'red'});
 *
 * DOM Element：
 *       <div class="message">
 *           <span class="title">上传文件：</span>
 *          <span id="prompt"></span>
 *
 *            <div class="show">
 *                  <span class="comment">反馈信息：</span>
 *                <span id="information"></span>
 *      </div>
 * </div>
 */

(function ($) {

    $.fn.appendLine = function (str) {
        $(this).append(str + '<br />');
    };

    NAURE.Message = (function () {

        var isInit = false;

        var message = {
            defaults:{
                global: {
                    multiple:true,
                    transparent:false
                },
                content:'',
                type:'span',
                level:0,
                color:null,
                element:null,
                placement:'after', //append, prepend, after, before
                title:'RUN',
                comment:'FEEDBACK',
                fade:null,
                inline:false,
                fadeDefaultColor:'green',
                datehide:false,
                overlay:null, //left-bottom
                dateformat:'HH:mm:ss.fff'        //yyyy-MM-dd HH:mm:ss fff
            },
            empty:function () {
                $('.message').hide();
                $('.show').hide();
                $('#prompt').empty();
                $('#information').empty();
            },
            prompt:function (options) {
                if (!isInit) {
                    message.init(options);
                }

                if (!options.inline) {
                    this.promptLine(options);
                    return;
                }

                var opt = $.extend({}, message.defaults, options);
                $('.message').show();
                $('.show').hide();
                $('#information').empty();
                NAURE.Message.renderHtml('#prompt', opt);
            },
            promptLine:function (options) {
                if (!isInit) {
                    message.init(options);
                }

                var opt = $.extend({}, message.defaults, options);
                $('.message').show();
                NAURE.Message.renderHtml('#prompt', opt);
            },
            show:function (options) {
                if (!isInit) {
                    message.init(options);
                }

                if (!options.content) {
                    return;
                }

                if (!options.level) {
                    this.prompt(options);
                    return;
                }

                if (!options.global.multiple) options.inline = true;

                if (!options.inline) {
                    this.showLine(options);
                    return;
                }

                var opt = $.extend({}, message.defaults, options);
                $('.show').show();
                NAURE.Message.renderHtml('#information', opt);
            },
            showLine:function (options) {
                if (!isInit) {
                    message.init(options);
                }

                if (!options.level) {
                    this.promptLine(options);
                    return;
                }

                var opt = $.extend({}, message.defaults, options);
                $('.show').show();
                NAURE.Message.renderHtml('#information', opt);
            },
            renderHtml:function (container, options) {
                if (!options.global.multiple) {
                    $(container).empty();
                }

                //todo 对于使用 appendLine 和 append 的情况还需要分析
                if (!options.inline) $(container).appendLine(NAURE.Message.renderContent(options));
                else $(container).append(NAURE.Message.renderContent(options));

//                $('#prompt').append(NAURE.Message.renderContent(options));
//                $('#prompt').appendLine(NAURE.Message.renderContent(opt));
//
//                $('#information').html(NAURE.Message.renderContent(opt));
//                $('#information').appendLine(NAURE.Message.renderContent(opt));

            },
            renderContent:function (options) {
                var opt = $.extend({}, message.defaults, options);

                var dateStr;
                if (opt.dateformat) {
                    dateStr = new Date().format(opt.dateformat) + ' -- ';
                } else {
                    dateStr = new Date().toLocaleString() + ' -- ';
                }
                if (opt.datehide)
                    dateStr = '';
                if (!opt.color) {
                    return dateStr + opt.content;
                } else {
                    return '<' + opt.type +
                        (!opt.color ? '' : ' style="color:' + opt.color + ';"') + '>' + dateStr + opt.content + '</' + opt.type + '>';
                }
            },
            init:function (options) {
                var opt = $.extend({}, message.defaults, options);
                $.extend(message.defaults.global, options);
                if (!opt.element) {
                    return;
                }

                if (opt.fade) {
                    opt.domElement = '<div class="message-fade"><p>' + opt.content + '</p></div>';
                } else {
                    opt.domElement = $.format('<div class="message {0}"><span class="title">' + opt.title + '：</span><span id="prompt"></span><div class="show"><span class="comment">' + opt.comment + '：</span><span id="information"></span></div></div>', opt.overlay ? 'message-' + opt.overlay : '');
                }

                switch (opt.placement) {
                    case 'append':
                        $(opt.element).append(opt.domElement);
                        break;
                    case 'prepend':
                        $(opt.element).prepend(opt.domElement);
                        break;
                    case 'after':
                        $(opt.element).after(opt.domElement);
                        break;
                    case 'before':
                        $(opt.element).before(opt.domElement);
                        break;
                    default:
                        $(opt.element).after(opt.domElement);
                        break;
                }

                $('.message>.title').live('click', function () {
                    message.defaults.global.transparent = !message.defaults.global.transparent;
                    if (message.defaults.global.transparent) $('.message').addClass('message-transparent');
                    else $('.message').removeClass('message-transparent');
                });

                if (message.defaults.global.transparent) $('.message').addClass('message-transparent');

                isInit = true;
            }
        };

        message.fade = function (options) {
            var opt = $.extend({}, message.defaults, {placement:'before', fade:true}, options);
            if (!$('.message-fade p').length) {
                this.init(opt);
            }
            if (!options.content) {
                return;
            }
            if (opt.content) {
                $('.message-fade p').html(opt.content);
            }
            if (opt.color) {
                $('.message-fade p').css('background-color', opt.color);
            } else {
                $('.message-fade p').css('background-color', opt.fadeDefaultColor);
            }
            if (/In/i.test(opt.fade)) {
                $(".message-fade p").fadeIn(1000);
                return;
            }
            if (/Out/i.test(opt.fade)) {
                $(".message-fade p").fadeOut(4000);
                return;
            }
            $(".message-fade p").fadeIn(1000).fadeOut(4000);
        };

        return message;

    })();

    $.fn.message = function (options) {
        if (!options) {
            options = {};
        }
        options.element = this;
        if (options.fade) {
            NAURE.Message.fade(options);
        } else {
            NAURE.Message.show(options);
        }
        return this;
    }

})(jQuery);
