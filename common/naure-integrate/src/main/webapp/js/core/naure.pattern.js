/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/31/12 3:59 PM
 * Description:
 *
 */

asyncHandler = function (callback, timeout, param) {
    var args = Array.prototype.slice.call(arguments, 2);
    var _cb = function () {
        callback.apply(null, args);
    }
    setTimeout(_cb, timeout);
}


define('naure.pattern', ['jquery', 'naure'], function ($, NAURE) {

    NAURE.Pattern = (function () {

        var pattern = {
            http: null,
            'break': 'break',
            'continue': 'continue',
            /**
             * chainHandler
             * @param options
             */
            chainHandler: function (options) {
                var opt = $.extend({
                    handler: null,      //两种：【ajax请求类型,既然 uri】或【页面处理逻辑】
                    successor: null,
                    success: null,
                    error: null,
                    context: null,
                    container: null,
                    request: null,      //参数
                    async: false
                }, options);

                this.handler = opt.handler;
                this.successor = opt.successor;
                this.success = opt.success;
                this.error = opt.error;
                this.request = opt.request;
                this.async = opt.async;
                this.context = opt.context;
                this.container = opt.container;

//                var exec = function (opt) {
//                    try {
//                        var result = opt.handle(opt.request);
//                        if (typeof(result) != 'undefined' && !result)
//                            return;
//                        if (opt.success)
//                            opt.success();
//                    } catch (ex) {
//                        if (opt.error)
//                            opt.error({error:ex});
//                    }
//                    if (opt.successor)
//                        opt.successor.process();
//                };

                //处理逻辑
                this.process = function (options) {
                    var currOpt = $.extend({}, this, options);

                    if (typeof(currOpt.request) == 'function')
                        currOpt.request = currOpt.request(currOpt);
                    switch (currOpt.request) {
                        case pattern['break']:
                            return;
                        case pattern['continue']:
                            if (currOpt.success) currOpt.success(currOpt);
                            if (currOpt.successor) currOpt.successor.process(options);
                            return;
                    }

                    //处理 handler 对应的函数，既处理逻辑
                    if (!currOpt.handler || (currOpt.handler && typeof(currOpt.handler) == 'function')) {
                        try {
                            if (currOpt.async && currOpt.handler) {
                                setTimeout(currOpt.handler, 100)
                            } else {
                                var result = currOpt.handler ? currOpt.handler(currOpt.request) : currOpt.request;
                                if (typeof(result) != 'undefined' && !result)
                                    return;
                            }

                            if (currOpt.success)
                                currOpt.success($.extend(currOpt, {result: result}));
                        } catch (ex) {
                            if (currOpt.error)
                                currOpt.error({error: ex});
                        }

                        if (options) delete options.result;
                        if (currOpt.successor)
                            currOpt.successor.process(options);
                    } else {
                        //使用 ajax 请求处理
                        pattern.http.acquire({
                            uri: currOpt.handler,
                            data: currOpt.request,
                            context: currOpt.context,
                            error: this.error ? this.error : function (err) {
//                            if (window.console && window.console.log)
//                                window.console.log(JSON.stringify(err));
                            },
                            success: function (result) {
                                if (currOpt.success) currOpt.success($.extend(currOpt, {result: result}));
                                if (options) delete options.result;
                                if (currOpt.successor) currOpt.successor.process(options);
                            }
                        });
                    }
                };

                return this;
            }
        };
        return pattern;
    })();

    return NAURE;
});


/**
 * 基于 naure.http.ajax 版本的
 */
define('naure.pattern.ajax', ['jquery', 'naure.pattern', 'naure.http.ajax'], function ($, NAURE) {
    NAURE.Pattern.http = NAURE.HTTP;
    return NAURE;
});


/**
 * 基于 naure.http.xsl 版本的
 */
define('naure.pattern.xsl', ['jquery', 'naure.pattern', 'naure.http.xsl'], function ($, NAURE) {
    NAURE.Pattern.http = NAURE.HTTP;
    return NAURE;
});

//
//
//(function ($) {
//    $.chainHandler = function (options) {
//        var opt = $.extend({
//            xml: null,
//            xmlUrl: null,
//            xmlCache: false,
//            xsl: null,
//            xslUrl: null,
//            xslCache: true,
//            optionData: null,
//            container: null,
//            successor: null,
//            errorPrompt: '获取数据错误，请稍后重试！',
//            emptyPrompt: null,
//            error: null,
//            success: null
//        }, options);
//
//        $(opt.container).NAURE_HTTP_Acquire({
//            xml: opt.xml,
//            xmlUrl: opt.xmlUrl,
//            xmlCache: opt.xmlCache,
//            xsl: opt.xsl,
//            xslUrl: opt.xslUrl,
//            xslCache: opt.xslCache,
//            optionData: opt.optionData,
//            success: opt.success,
//            error: function (ex) {
//                if (opt.errorPrompt != null) {
//                    NAURE.Message.show({content: opt.errorPrompt, color: 'red', inline: true});
//                }
//                if (opt.error) {
//                    opt.error(ex);
//                }
//            },
//            success: function (obj) {
//                if (opt.success != null) {
//                    opt.success(obj);
//                }
//                if (opt.output == "" && opt.emptyPrompt != null) {
//                    NAURE.Message.show({content: opt.emptyPrompt, color: 'red', inline: true});
//                    //$('#query').attr('disabled', true);
//                    //$('#query').attr('disabled', true);
//                    //暂时处理方式：对返回的为空的内容，产生 error 事件。
//                    if (!opt.error) {
//                        opt.error(ex);
//                    }
//                } else {
//                    if (opt.successor != null) {
//                        opt.successor();
//                    }
//                }
//            }
//        });
//    }
//    $.fn.chainHandler = function (options) {
//        options.container = this;
//        $.chainHandler(options);
//        return this;
//    };
//})(jQuery);
