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
 *      example3:
 *                  $('body').message({overlay: 'left-bottom', multiple: false});
 *
 * DOM Element：
 *       <div class="naure-message">
 *           <span class="naure-title">上传文件：</span>
 *          <span id="naure-prompt"></span>
 *
 *            <div class="naure-show">
 *                  <span class="naure-comment">反馈信息：</span>
 *                <span id="naure-information"></span>
 *      </div>
 * </div>
 */

define(['jquery', 'jquery.strings', 'naure', 'naure.utility'], function ($, $1, NAURE) {
    $.fn.appendLine = function (str) {
        $(this).append(str + '<br />');
    };

    NAURE.Message = (function () {

        var text = {
            loading: '<span class="naure_loading">正在努力获取数据，请稍候......</span>',
            error: '<span class="naure_error">获取数据错误，请稍后重试！</span>'
        };

        var isInit = false;

        var message = {
            defaults: {
                global: {
                    multiple: true,
                    transparent: false, //透明度
                    overlay: null //'left-top'
                },
                content: '',
                type: 'span',
                color: null,
                element: null,
                placement: 'append', //append, prepend, after, before
                title: 'RUN',
                comment: 'FEEDBACK',
                fade: null,

                level: 0,
                inline: false,
                clear: false,

                fadeDefaultColor: 'green',
                datehide: false,
                overlay: null, //left-bottom
                dateformat: 'HH:mm:ss.fff'        //yyyy-MM-dd HH:mm:ss fff
            },
            empty: function () {
                $('.naure-message').hide();
                $('.naure-show').hide();
                $('#naure-prompt').empty();
                $('#naure-information').empty();
            },
            prompt: function (options) {
                if (!isInit) {
                    message.init(options);
                }

                if (!options.inline) {
                    this.promptLine(options);
                    return;
                }

                var opt = $.extend({}, message.defaults, options);
                $('.naure-message').show();
                $('.naure-show').hide();
                $('#naure-information').empty();
                NAURE.Message.renderHtml('#naure-prompt', opt);
            },
            promptLine: function (options) {
                if (!isInit) {
                    message.init(options);
                }

                var opt = $.extend({}, message.defaults, options);
                $('.naure-message').show();
                NAURE.Message.renderHtml('#naure-prompt', opt);
            },
            show: function (options) {
                //初始化
                if (!isInit) message.init(options);
                if (!options.content) return;
                if (options.clear) message.empty();

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
                $('.naure-show').show();
                NAURE.Message.renderHtml('#naure-information', opt);
            },
            showLine: function (options) {
                if (!isInit) {
                    message.init(options);
                }

                if (!options.level) {
                    this.promptLine(options);
                    return;
                }

                var opt = $.extend({}, message.defaults, options);
                $('.naure-show').show();
                NAURE.Message.renderHtml('#naure-information', opt);
            },
            renderHtml: function (container, options) {
                if (options.multiple)
                    message.defaults.global.multiple = options.multiple;

                if (!message.defaults.global.multiple) {
                    $(container).empty();
                }

                //todo 对于使用 appendLine 和 append 的情况还需要分析
                if (!options.inline) $(container).appendLine(NAURE.Message.renderContent(options));
                else $(container).append(NAURE.Message.renderContent(options));

//                $('#naure-prompt').append(NAURE.Message.renderContent(options));
//                $('#naure-prompt').appendLine(NAURE.Message.renderContent(opt));
//
//                $('#naure-information').html(NAURE.Message.renderContent(opt));
//                $('#naure-information').appendLine(NAURE.Message.renderContent(opt));

            },
            renderContent: function (options) {
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
            init: function (options) {
                var opt = $.extend({}, message.defaults, options);
                $.extend(message.defaults.global, options);
                if (!opt.element) {
                    return;
                }

                if (opt.overlay)
                    message.defaults.global.overlay = opt.overlay;
                if (opt.transparent)
                    message.defaults.global.transparent = opt.transparent;

                if (opt.fade) {
                    opt.domElement = '<div class="naure-message-fade"><p>' + opt.content + '</p></div>';
                } else {
                    opt.domElement = $.format(
                            '<div class="naure-message {0}"><span class="naure-title">' +
                            (opt.title.length > 0 ? opt.title + '：' : '') +
                            '</span><span id="naure-prompt"></span><div class="naure-show"><span class="naure-comment">' +
                            opt.comment +
                            '：</span><span id="naure-information"></span></div></div>',
                        opt.overlay ? 'naure-message-' + opt.overlay : ''
                    );
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

                $('.naure-message>.naure-title').on('click', function () {
                    message.defaults.global.transparent = !message.defaults.global.transparent;
                    if (message.defaults.global.transparent) $('.naure-message').addClass('naure-message-transparent');
                    else $('.naure-message').removeClass('naure-message-transparent');
                });

                if (message.defaults.global.transparent) $('.naure-message').addClass('naure-message-transparent');

                isInit = true;
            },
            position: function (str) {
                //设置位置
                if (message.defaults.global.overlay)
                    $('.naure-message').removeClass('message-' + message.defaults.global.overlay);
                if (str)
                    $('.naure-message').addClass('message-' + str);
            }
        };

        message.fade = function (options) {
            var opt = $.extend({
                fadeClass: 'message-fade',
                fadeContainer: '.naure-message-fade p',
                domHandle: function (status) {
                    if (options.element) {
                        if ('INPUT' == $(options.element).attr('tagName'))
                            $(options.element).attr('disabled', !status ? false : true);
                        else {
                            if (!$(options.element).attr('fade'))
                                $(options.element).attr('fade', $(options.element).css('display'));
                            $(options.element).css('display', !status ? $(options.element).attr('fade') : 'none');
                        }
                    }
                }
            }, message.defaults, {placement: 'before', fade: true}, options);

            if (!$(opt.fadeContainer).length || opt.fadeClass != $(options.element).prev().attr('class')) {
                this.init(opt);
            }
            if (!options.content) {
                return;
            }
            if (opt.content) {
                $(options.element).prev().children('p').html(opt.content);
            }
            if (opt.color) {
                $(options.element).prev().children('p').css('background-color', opt.color);
            } else {
                $(options.element).prev().children('p').css('background-color', opt.fadeDefaultColor);
            }

            opt.domHandle(true);
            if (/In/i.test(opt.fade)) {
                $(options.element).prev().children('p').fadeIn(1000, opt.domHandle);
                return;
            }
            if (/Out/i.test(opt.fade)) {
                $(options.element).prev().children('p').fadeOut(1500, opt.domHandle);
                return;
            }
            $(options.element).prev().children('p').fadeIn(1000).fadeOut(1500, opt.domHandle);
        };

        message.text = text;
        message.tableTemplate = '<tr><td colspan="100">{0}</td></tr>'

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
    };

    return NAURE;
});


//(function (window, undefined) {
//
//
//
//    //对 AMD 的支持
//    if (typeof define === "function" && define.amd && define.amd.NAURE) {
//        define("NAURE.Message", ['NAURE'], function (NAURE) {
//            return NAURE.Message;
//        });
//    }
//
////    if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
////        define( "jquery", [], function () { return jQuery; } );
////    }
//
//})(window);