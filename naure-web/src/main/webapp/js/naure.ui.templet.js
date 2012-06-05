/*
 * Script：
 *              贾睿之
 * Email：
 *              jiaruizhi@360buy.com
 * Description：
 *            提供 UI 布局的模板处理方法
 * Usage:
 */

(function ($) {
    NAURE.UI.templet = (function (options) {
        var opt = $.extend({
            name: "",
            renderContainer:null,

            context:null,

            error:null,
            success:null
        }, options);

        NAURE.HTTP.xmlAcquire({
            xmlUrl: '/xml/' + opt.name + '.xml',
            xmlCache:true,
            //xslUrl: '/xsl/body.xsl',
            renderContainer: opt.renderContainer,
            context: opt.context,
            error:function (ex) {
                if (opt.success != null) {
                    opt.success(ex);
                }
            },
            success:function(obj) {
//                $(opt.renderContainer).html(obj.xml.toString());
//                obj.renderContainer = renderContainer;
                if (opt.success != null) {
                    opt.success(obj);
                }
            }
        });
    });

    $.fn.naure_ui_templet = function (options) {
        if (!options) {
            options = {};
        }
        options.renderContainer = this;
        NAURE.UI.templet(options);
        return this;
    }
})(jQuery);