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
 *                  NAUR.Message.promptLine({content:  "文本内容信息"});
 *      example2:
 *                  $('.className').message({content: '查询数据结束！', placement: 'before', fade: true});
 *                  NAUR.Message.fade('获取数据错误！', 'red');
 *                  $('#className').message.fade({content: '切换表头！', color: 'red'});
 *      example3:
 *                  $('body').message({overlay: 'left-bottom', multiple: false});
 *
 * DOM Element：
 *       <div class="naur-message">
 *           <span class="naur-title">上传文件：</span>
 *          <span id="naur-prompt"></span>
 *
 *            <div class="naur-show">
 *                  <span class="naur-comment">反馈信息：</span>
 *                <span id="naur-information"></span>
 *      </div>
 * </div>
 */

define(['jquery', 'jquery.strings', 'naur', 'naur.utility'], function ($, $1, NAUR) {
    $.fn.appendLine = function (str) {
        $(this).append(str + '<br />');
    };

    NAUR.Message = (function () {

        var text = {
            loading: '<span class="naur_loading">正在努力获取数据，请稍候......</span>',
            error: '<span class="naur_error">获取数据错误，请稍后重试！</span>'
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
                $('.naur-message').hide();
                $('.naur-show').hide();
                $('#naur-prompt').empty();
                $('#naur-information').empty();
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
                $('.naur-message').show();
                $('.naur-show').hide();
                $('#naur-information').empty();
                NAUR.Message.renderHtml('#naur-prompt', opt);
            },
            promptLine: function (options) {
                if (!isInit) {
                    message.init(options);
                }

                var opt = $.extend({}, message.defaults, options);
                $('.naur-message').show();
                NAUR.Message.renderHtml('#naur-prompt', opt);
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
                $('.naur-show').show();
                NAUR.Message.renderHtml('#naur-information', opt);
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
                $('.naur-show').show();
                NAUR.Message.renderHtml('#naur-information', opt);
            },
            renderHtml: function (container, options) {
                if (options.multiple)
                    message.defaults.global.multiple = options.multiple;

                if (!message.defaults.global.multiple) {
                    $(container).empty();
                }

                //todo 对于使用 appendLine 和 append 的情况还需要分析
                if (!options.inline) $(container).appendLine(NAUR.Message.renderContent(options));
                else $(container).append(NAUR.Message.renderContent(options));

//                $('#naur-prompt').append(NAUR.Message.renderContent(options));
//                $('#naur-prompt').appendLine(NAUR.Message.renderContent(opt));
//
//                $('#naur-information').html(NAUR.Message.renderContent(opt));
//                $('#naur-information').appendLine(NAUR.Message.renderContent(opt));

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
                    opt.domElement = '<div class="naur-message-fade"><p>' + opt.content + '</p></div>';
                } else {
                    opt.domElement = $.format(
                            '<div class="naur-message {0}"><span class="naur-title">' +
                            (opt.title.length > 0 ? opt.title + '：' : '') +
                            '</span><span id="naur-prompt"></span><div class="naur-show"><span class="naur-comment">' +
                            opt.comment +
                            '：</span><span id="naur-information"></span></div></div>',
                        opt.overlay ? 'naur-message-' + opt.overlay : ''
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

                $('.naur-message>.naur-title').on('click', function () {
                    message.defaults.global.transparent = !message.defaults.global.transparent;
                    if (message.defaults.global.transparent) $('.naur-message').addClass('naur-message-transparent');
                    else $('.naur-message').removeClass('naur-message-transparent');
                });

                if (message.defaults.global.transparent) $('.naur-message').addClass('naur-message-transparent');

                isInit = true;
            },
            position: function (str) {
                //设置位置
                if (message.defaults.global.overlay)
                    $('.naur-message').removeClass('message-' + message.defaults.global.overlay);
                if (str)
                    $('.naur-message').addClass('message-' + str);
            }
        };

        message.fade = function (options) {
            var opt = $.extend({
                fadeClass: 'message-fade',
                fadeContainer: '.naur-message-fade p',
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
            NAUR.Message.fade(options);
        } else {
            NAUR.Message.show(options);
        }
        return this;
    };

    return NAUR;
});


//(function (window, undefined) {
//
//
//
//    //对 AMD 的支持
//    if (typeof define === "function" && define.amd && define.amd.NAUR) {
//        define("NAUR.Message", ['NAUR'], function (NAUR) {
//            return NAUR.Message;
//        });
//    }
//
////    if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
////        define( "jquery", [], function () { return jQuery; } );
////    }
//
//})(window);