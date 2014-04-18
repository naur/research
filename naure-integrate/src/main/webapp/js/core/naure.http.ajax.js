/*
 * Script：
 *          贾睿之
 * Email：
 *          jiaruizhi@360buy.com
 * Description：
 *          提供 http 工具集。使用【ajax】
 *
 */

define('naure.http.ajax', ['jquery', 'naure', 'naure.utility'], function ($, NAURE) {

    var utility = NAURE.Utility;

    NAURE.HTTP.acquire = function (options) {
        var opt = $.extend({
            type: 'POST',
            dataType: 'json',

            uri: null,
            uriCache: false,

            data: null,
            container: null,

            context: null,
            domState: null,

            error: null,
            success: null,

            ver: 0
        }, options);

        opt.ajaxError = function (jqXHR, textStatus, errorThrown) {
            if (opt.error)
                opt.error({jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown, context: opt.context});
            if (opt.domState)
                opt.domState({disabled: false});
        };
        opt.ajaxSuccess = function (data, textStatus, jqXHR) {
            if (opt.container != null) {
                $(opt.container).html(utility.encodeHTML(data));
            }
            if (opt.success)
                opt.success({target: opt.container, output: data, context: opt.context});
            if (opt.domState)
                opt.domState({disabled: false});
            return false;
        };

        $.ajax({
            type: opt.type,
            cache: opt.uriCache,
            url: opt.uri,
            data: opt.data,
            dataType: opt.dataType,
            error: opt.ajaxError,
            success: opt.ajaxSuccess
        });
    };
});



