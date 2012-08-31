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

define(['jquery', 'naure'], function ($, NAURE) {

    NAURE.Pattern = (function () {
        var pattern = {
            chainHandler:function (options) {
//                var opt = $.extend({
//                    handle:null,
//                    successor:null,
//                    request:null,
//                    error:null,
//                    success:null
//                }, options);

                this.handle = options.handle;
                this.successor = options.successor;
                this.success = options.error;
                this.error = options.success;
                this.request = options.request;

                this.process = function () {
                    if (this.handle) {
                        try {
                            var result = this.handle(this.request);
                            if (typeof(result) != 'undefined' && !result)
                                return;
                            if (this.success)
                                this.success();
                        } catch (ex) {
                            if (this.error)
                                this.error({error:ex});
                        }
                    }
                    if (this.successor)
                        this.successor.process();
                }
            }
        };
        return pattern;
    })();

    return NAURE;
});
