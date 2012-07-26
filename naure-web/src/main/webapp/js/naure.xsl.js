/*
 * Script：
 *          贾睿之
 * Email：
 *          jiaruizhi@360buy.com
 * Description：
 *          数据获取 和 XSL 处理。
 *
 */

define(['jquery', 'naure', 'naure.utility', 'ajaxslt'], function ($, NAURE) {

    var utility = NAURE.Utility;

    NAURE.HTTP.xmlAcquire = function (options) {
        var opt = $.extend({
            type:'POST',
            dataType:'xml',

            xml:null,
            xmlUrl:null,
            xmlCache:false,

            xsl:null,
            xslUrl:null,
            xslCache:true,

            optionData:null,
            renderContainer:null,
            pagingContainer:null,

            context:null,

            count:0,
            pageSize:0,
            pageIndex:1,

            error:null,
            success:null,
            pagingHandler:null,

            ver:0
        }, options);


        opt.ajaxError = function (jqXHR, textStatus, errorThrown) {
            opt.count = 0;
            if (opt.error != null) {
                opt.error({jqXHR:jqXHR, textStatus:textStatus, errorThrown:errorThrown, context:opt.context});
            }
        };
        opt.ajaxSuccess = function (data, textStatus, jqXHR) {
            if (opt.pagingHandler) {
                opt.count = $(data).find('result item:eq(0)').text();
            }

            opt.xml = data;
            if (opt.xsl == null && opt.xslUrl == null) {
                if (opt.renderContainer != null || opt.dataType == 'json') {
                    $(opt.renderContainer).html(utility.encodeHTML(opt.xml.xml));
                }
                if (opt.success != null) {
                    opt.success({target:opt.renderContainer, output:opt.xml, context:opt.context});
                }
                return false;
            }
            opt.xsltHandler(opt);
        };
        opt.xsltHandler = function (opt) {
            if (opt.ver == 0) {
                $.xslt({
                        xml:opt.xml,
                        xmlCache:opt.xmlCache,
                        xslUrl:opt.xslUrl,
                        xslCache:opt.xslCache,
                        target:opt.renderContainer,
                        error:opt.xsltError,
                        context:opt.context,
                        success:opt.xsltSuccess
                    }
                );
            } else {
                $.xsltv1({
                        xml:opt.xml,
                        xmlCache:opt.xmlCache,
                        xslUrl:opt.xslUrl,
                        xslCache:opt.xslCache,
                        target:opt.renderContainer,
                        error:opt.xsltError,
                        success:opt.xsltSuccess
                    }
                );
            }
        };
        opt.xsltError = function (ex) {
            if (opt.error != null) {
                opt.error(ex);
            }
        };
        opt.xsltSuccess = function (obj) {
            if (opt.count == 0) {
                //要注意的部分，测试
                $(opt.pagingContainer).html('');
            } else {
                if (opt.pagingContainer) {
                    //分页
                    $(opt.pagingContainer).renderPaginator({
                        pageSize:opt.pageSize,
                        pageIndex:opt.pageIndex,
                        count:opt.count,
                        handler:function (selectedIndex) {
                            if (opt.pagingHandler != null) {
                                opt.pagingHandler(selectedIndex);
                            }
                        }
                    });
                }
            }
            if (opt.success != null) {
                //output, opt.renderContainer
                opt.success(obj);
            }
        };

        //if (/^\s*</.test(opt.xmlUrl)) {
        if (opt.xml) {
            opt.ajaxSuccess(opt.xml);
        } else {
            $.ajax({
                type:opt.type,
                cache:opt.xmlCache,
                url:opt.xmlUrl,
                data:opt.optionData,
                dataType:opt.dataType,
                error:opt.ajaxError,
                success:opt.ajaxSuccess
            });
        }
    };
    $.fn.NAURE_HTTP_xmlAcquire = function (options) {
        options.renderContainer = this;
        NAURE.HTTP.xmlAcquire(options);
        return this;
    }

    $.xslt = function (options) {
        // Default settings
        var opt = {
            xml:null,
            xmlUrl:null,
            xmlCache:true,

            xsl:null,
            xslUrl:null,
            xslCache:true,

            context:null,

            target:null,
            error:null,
            success:null,
            dataTypeXML:false,

            hasError:false
        };
        $.extend(opt, options);

        // Can we go async?
        //opt.async = ((opt.callback != null) || (opt.target != null));
        opt.async = ((opt.success != null) || (opt.target != null));

        // Setup finish function
        opt.finish = function (opt) {
            if ((opt.xml != null) && (opt.xsl != null) && (opt.hasError == false)) {
                // We got the data and no error occured

                // Convert text to XML nodes if necessary
                if ((opt.xml !== null) && (typeof(opt.xml) != 'object')) {
                    opt.xml = $.xslt.textToXML(opt.xml);
                }
                if ((opt.xsl !== null) && (typeof(opt.xsl) != 'object')) {
                    opt.xsl = $.xslt.textToXML(opt.xsl);
                }

                // Perform the transform
                var output = xsltProcess(opt.xml, opt.xsl);

                // Set target content to transformed XML
                if (opt.target != null) {
                    $(opt.target).html(utility.encodeHTML(output));
                    //$(opt.target).html(output);
                }

                if (opt.success != null) {
                    opt.success({target:opt.target, output:output, context:opt.context});
                }

                return output;
            } else if (opt.hasError) {
                // Error occured
                if (opt.error != null) {
                    opt.error({content:false, context:opt.context});
                }
                return false;
            } else {
                return true;
            }
        }

        if (((opt.xml == null) && (opt.xmlUrl == null)) || ((opt.xsl == null) && (opt.xslUrl == null))) {
            // Not going to work.
            opt.hasError = true;
            return opt.finish(opt);
        }

        // Retrieve XML and XSL from cache if possible
        if ((opt.xml == null) && (opt.xmlUrl != null) && (opt.xmlCache == true) && ($.xslt.cache.xml[opt.xmlUrl])) {
            opt.xml = $.xslt.cache.xml[opt.xmlUrl];
        }

        if ((opt.xsl == null) && (opt.xslUrl != null) && (opt.xslCache == true) && ($.xslt.cache.xsl[opt.xslUrl])) {
            opt.xsl = $.xslt.cache.xsl[opt.xslUrl];
        }

        // Get XML and XSL from url if necessary
        if ((opt.xmlUrl != null) && (opt.xml == null)) {
            $.ajax({
                url:opt.xmlUrl,
                dataType:opt.dataTypeXML ? 'xml' : 'html',
                error:function () {
                    opt.hasError = true;
                    opt.finish(opt);
                },
                success:function (data) {
                    opt.xml = data;
                    if (opt.xmlCache) {
                        $.xslt.cache.xml[opt.xmlUrl] = opt.dataTypeXML ? data : $.xslt.textToXML(data);
                    }
                    opt.finish(opt);
                },
                async:opt.async
            });
        }

        if ((opt.xslUrl != null) && (opt.xsl == null)) {
            $.ajax({
                url:opt.xslUrl,
                dataType:opt.dataTypeXML ? 'xml' : 'html',
                error:function (data, textStatus, jqXHR) {
                    opt.hasError = true;
                    opt.finish(opt);
                },
                success:function (data) {
                    opt.xsl = data;
                    if (opt.xslCache) {
                        $.xslt.cache.xsl[opt.xslUrl] = opt.dataTypeXML ? data : $.xslt.textToXML(data);
                    }
                    opt.finish(opt);
                },
                async:opt.async
            });
        }

        // Return the transformed XML (string) if we're done, true if
        // we're working async, false if there has been an error
        return opt.finish(opt);
    }
    $.extend($.xslt, {
        // $.xslt.version.plugin - Plugin version
        // $.xslt.version.ajaxslt - AJAXSLT version
        version:{
            plugin:0.1,
            ajaxslt:'0.8.1'
        },

        // $.xslt.textToXML(text) - Convert text to XML DOM node
        textToXML:function (text) {
            return xmlParse(text);
        },

        // $.xslt.xmlToText(xml) - Convert XML DOM node to text
        xmlToText:function (xml) {
            return xmlText(xml);
        },

        // XML / XSL cache
        cache:{
            xml:{},
            xsl:{}
        }
    });
    $.fn.xslt = function (options) {
        options.target = this;
        $.xslt(options);
        return this;
    };

    //XSLT Ver 1：提供对 AjaxXSLT 未支持的函数的调用。
    (function ($) {
        $.fn.xsltv1 = function () {
            return this;
        }
        var str = /^\s*</;
        if ($.browser.msie) { // IE 5+
            $.fn.xsltv1 = function (options) {
                var opt = $.extend({
                    xml:null,
                    xsl:null,
                    target:null,
                    callback:null
                }, options);

                //var target = $(this);
                var change = function () {
                    var c = 'complete';
                    if (xm.readyState == c && xs.readyState == c) {
                        window.setTimeout(function () {
                            var output = xm.transformNode(xs.XMLDocument)
                            if (opt.target != null) {
                                $(opt.target).html(output);
                            }
                            if (opt.callback != null) {
                                opt.callback(output);
                            }
                        }, 50);
                    }
                };

                var xm = document.createElement('xml');
                xm.onreadystatechange = change;
                xm[str.test(opt.xml) ? "innerHTML" : "src"] = opt.xml;

                var xs = document.createElement('xml');
                xs.onreadystatechange = change;
                xs[str.test(opt.xsl) ? "innerHTML" : "src"] = opt.xsl;

                $('body').append(xm).append(xs);
                return this;
            };
        }
        else if (window.DOMParser != undefined && window.XMLHttpRequest != undefined && window.XSLTProcessor != undefined) { // Mozilla 0.9.4+, Opera 9+
            var processor = new XSLTProcessor();
            var support = false;
            if ($.isFunction(processor.transformDocument)) {
                support = window.XMLSerializer != undefined;
            }
            else {
                support = true;
            }
            if (support) {
                $.fn.xsltv1 = function (options) {
                    var opt = $.extend({
                        xml:null,
                        xsl:null,
                        target:null,
                        callback:null
                    }, options);

                    //var target = $(this);
                    var transformed = false;

                    var xm = {
                        readyState:4
                    };
                    var xs = {
                        readyState:4
                    };

                    var change = function () {
                        if (xm.readyState == 4 && xs.readyState == 4 && !transformed) {
                            var processor = new XSLTProcessor();
                            var output = null;
                            if ($.isFunction(processor.transformDocument)) {
                                // obsolete Mozilla interface
                                resultDoc = document.implementation.createDocument("", "", null);
                                processor.transformDocument(xm.responseXML, xs.responseXML, resultDoc, null);
                                output = new XMLSerializer().serializeToString(resultDoc);
                                if (opt.target != null) {
                                    $(opt.target).html(output);
                                }
                            }
                            else {
                                processor.importStylesheet(xs.responseXML);
                                resultDoc = processor.transformToFragment(xm.responseXML, document);
                                output = resultDoc;
                                if (opt.target != null) {
                                    $(opt.target).empty().append(output);
                                }
                            }
                            transformed = true;
                            if (opt.callback != null) {
                                opt.callback(output);
                            }
                        }
                    };

                    if (str.test(opt.xml)) {
                        xm.responseXML = new DOMParser().parseFromString(opt.xml, "text/xml");
                    }
                    else {
                        xm = $.ajax({ dataType:"xml", url:opt.xml});
                        xm.onreadystatechange = change;
                    }

                    if (str.test(opt.xsl)) {
                        xs.responseXML = new DOMParser().parseFromString(opt.xsl, "text/xml");
                        change();
                    }
                    else {
                        xs = $.ajax({ dataType:"xml", url:opt.xsl});
                        xs.onreadystatechange = change;
                    }
                    return this;
                };
            }
        }

        $.xsltv1 = function (options) {
            var opt = $.extend({
                xml:null,
                xsl:null,
                target:null,
                callback:null
            }, options);
            $.fn.xsltv1(opt);
            return this;
        }
    })(jQuery);

//XSLT Ver 2：提供对 AjaxXSLT 未支持的函数的调用。
    (function ($) {
        $.xsltv2 = function (options) {
            var parameters = $.extend({
                xml:null,
                xsl:null,
                target:null,
                error:null,
                callback:null
            }, options);
            var xmlDoc;
            var xslDoc;
            var output;
            // 判断浏览器的类型
            if ($.browser.msie) {
                try {
                    // 支持IE浏览器
                    xmlDoc = new ActiveXObject('Msxml2.DOMDocument');
                    xmlDoc.async = false;
                    xmlDoc.load(parameters.xml);

                    xslDoc = new ActiveXObject('Msxml2.DOMDocument');
                    xslDoc.async = false;
                    xslDoc.load(parameters.xsl);

                    output = xmlDoc.documentElement.transformNode(xslDoc);
                }
                catch (e) {
                    if (parameters.error != null) {
                        parameters.error(e);
                    }
                }
            } else if ($.browser.mozilla || $.browser.opera) {
                // 支持Mozilla浏览器
                try {
//                xmlDoc = document.implementation.createDocument("", "", null);
//                xmlDoc.async = false;
//                xmlDoc.load(parameters.xml);

//                var domParser = new DOMParser();
//                var xmlDoc = domParser.parseFromString(parameters.xml, "text/xml");


                    xslDoc = document.implementation.createDocument("", "", null);
                    xslDoc.async = false;
                    xslDoc.load(parameters.xsl);

                    // 定义XSLTProcessor对象
                    var xsltProcessor = new XSLTProcessor();
                    xsltProcessor.importStylesheet(xslDoc);
                    // transformToDocument方式
                    var result = xsltProcessor.transformToDocument(parameters.xml);
                    var serializer = new XMLSerializer();
                    //output = serializer.serializeToString(result.documentElement);
                    output = result.documentElement.firstChild.data;
                }
                catch (e) {
                    if (parameters.error != null) {
                        parameters.error(e);
                    }
                }
            } else {
                if (parameters.error != null) {
                    parameters.error('不支持');
                }
            }
            if (parameters.callback != null) {
                parameters.callback(output);
            }
        }
        $.fn.xsltv2 = function (options) {
            options.target = this;
            $.xsltv2(options);
            return this;
        }
    })(jQuery);

    (function ($) {
        $.chainHandler = function (options) {
            var opt = $.extend({
                xml:null,
                xmlUrl:null,
                xmlCache:false,
                xsl:null,
                xslUrl:null,
                xslCache:true,
                optionData:null,
                container:null,
                successor:null,
                errorPrompt:'获取数据错误，请稍后重试！',
                emptyPrompt:null,
                error:null,
                success:null
            }, options);
            $(opt.container).NAURE_HTTP_xmlAcquire({
                xml:opt.xml,
                xmlUrl:opt.xmlUrl,
                xmlCache:opt.xmlCache,
                xsl:opt.xsl,
                xslUrl:opt.xslUrl,
                xslCache:opt.xslCache,
                optionData:opt.optionData,
                success:opt.success,
                error:function (ex) {
                    if (opt.errorPrompt != null) {
                        NAURE.Message.show({content:opt.errorPrompt, color:'red', inline:true});
                    }
                    if (opt.error) {
                        opt.error(ex);
                    }
                },
                success:function (obj) {
                    if (opt.success != null) {
                        opt.success(obj);
                    }
                    if (opt.output == "" && opt.emptyPrompt != null) {
                        NAURE.Message.show({content:opt.emptyPrompt, color:'red', inline:true});
                        //$('#query').attr('disabled', true);
                        //$('#query').attr('disabled', true);
                        //暂时处理方式：对返回的为空的内容，产生 error 事件。
                        if (!opt.error) {
                            opt.error(ex);
                        }
                    } else {
                        if (opt.successor != null) {
                            opt.successor();
                        }
                    }
                }
            });
        }
        $.fn.chainHandler = function (options) {
            options.container = this;
            $.chainHandler(options);
            return this;
        };
    })(jQuery);
});

