/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/25/12 5:11 PM
 * Description:
 *              NAURE Analytics Service
 */
define(['jquery', 'jquery.strings', 'naure', 'naure.utility'], function ($, $1, NAURE) {
    var utility = NAURE.Utility;

    NAURE.Analytics = (function () {
        var analytics = {
            isTrack:true,

            track:function (options) {
                if (analytics.isTrack)
                    analytics.log(options);
            },

            log:function (options) {
                var opt = $.extend({
                    code:200,
                    type:'GET',
                    path:window.location.pathname,
                    host:window.location.host,
                    referer:''
                }, options);
                $.ajax({
                    url:'/diagnostic/session/add.xml',
                    type:'POST',
                    dataType:'xml',
                    cache:false,
                    data:{
                        user:utility.cookie('user'),
                        host:opt.host,
                        statusCode:opt.code,
                        type:opt.type,
                        requestPath:opt.path,
                        refererUrl:opt.referer,
                        cpu:window.navigator.cpuClass,
                        language:window.navigator.language ? window.navigator.language :
                            $.format("system:{0},user:{1},browser:{2}",
                                window.navigator.systemLanguage,
                                window.navigator.userLanguage,
                                window.navigator.browserLanguage
                            ),
                        platform:window.navigator.platform
                    },
                    //dataType:opt.dataType,
                    error:function (ex) {
                    },
                    success:function (obj) {
                    }
                });
            }
        };

        $(function () {
            if (!utility.cookie('user'))
                utility.cookie('user', Math.random().toString(16).substr(2), {expires:1});
            analytics.track();
        });

        return analytics;
    })();

    return NAURE;
});