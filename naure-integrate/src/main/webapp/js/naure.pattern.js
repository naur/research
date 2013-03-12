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


define(['jquery', 'naure'], function ($, NAURE) {

    NAURE.Pattern = (function () {
        var pattern = {
            chainHandler:function (options) {
                var opt = $.extend({
                    handle:null,
                    successor:null,
                    success:null,
                    error:null,
                    request:null,
                    async:false
                }, options);

                this.handle = opt.handle;
                this.successor = opt.successor;
                this.success = opt.error;
                this.error = opt.success;
                this.request = opt.request;
                this.async = opt.async;

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

                this.process = function () {
                    if (this.handle) {
                        try {
                            if (this.async) {
                                setTimeout(opt.handle, 100)
                            } else {
                                var result = opt.handle(opt.request);
                                if (typeof(result) != 'undefined' && !result)
                                    return;
                            }
                            if (opt.success)
                                opt.success();
                        } catch (ex) {
                            if (opt.error)
                                opt.error({error:ex});
                        }

                        if (opt.successor)
                            opt.successor.process();
                    }
                }
            }
        };
        return pattern;
    })();

    return NAURE;
});
