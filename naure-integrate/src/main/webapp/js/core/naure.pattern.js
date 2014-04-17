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


define(['jquery', 'naure', 'naure.xsl.js'], function ($, NAURE) {

    NAURE.Pattern = (function () {
        var http = YHD.HTTP;

        var pattern = {
            'break': 'break',
            'continue': 'continue',
            /**
             * chainHandler
             * @param options
             */
            chainHandler: function (options) {
                var opt = $.extend({
                    handler: null,      //ajax请求类型，和页面处理逻辑
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
                        http.acquire({
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
                }
            }
        };
        return pattern;
    })();

    return NAURE;
});
