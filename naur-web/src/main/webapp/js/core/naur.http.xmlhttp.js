﻿/*
 * Script：
 *          贾睿之
 * Email：
 *          jiaruizhi@360buy.com
 * Description：
 *          封装 [XMLHttpRequest] 和 [Microsoft.XMLHTTP] 进行 js 请求数据
 *          提供 http 工具集。使用【XMLHttpRequest】和【Microsoft.XMLHTTP】
 *
 */

define(['jquery', 'naur'], function ($, NAUR) {
    NAUR.HTTP.state = function (state) {
        switch (state) {
            case 0:
                return 'Uninitialized';
            case 1:
                return 'Open';
            case 2:
                return 'Sent';
            case 3:
                return 'Receiving';
            case 4:
                return 'Loaded';
            default:
                return '';
        }
    };

    NAUR.HTTP.request = function (options) {
        var opt = $.extend({
            method: 'GET',
            uri: '',
            async: true,
            body: null,
            header: null,
            contentType: 'application/xml; charset=utf-8',
            error: null,
            success: null,
            complete: null,
            changed: null,
            context: null,
            htmlParser: {parser: null, delegate: null}
        }, options);


        $(opt.context).attr('disabled', true);

        opt.stateChange = function () {
//            if (opt.xmlhttp.readyState < 3)
//                return;
////            if (opt.xmlhttp.status <= 0)
////                return;
            if (opt.changed) {
                opt.changed({state: NAUR.HTTP.state(opt.xmlhttp.readyState), http: opt.xmlhttp});
            }

//            if (opt.xmlhttp.readyState == 4) {
//                if (opt.xmlhttp.status == 200) {
//                    if (opt.success) {
//                        opt.success({output: opt.xmlhttp.responseXML && opt.xmlhttp.responseXML.text.length > 0 ? opt.xmlhttp.responseXML : opt.xmlhttp.responseText, http: opt.xmlhttp, context: opt.context});
//                        if (opt.htmlParser) {
//                            if (!opt.htmlParser.parser) {
//                                if (opt.xmlhttp.getResponseHeader('Content-Type').search(/xml/g) >= 0)
//                                    opt.htmlParser.parser = NAUR.XML.Parser;
//                                if (opt.xmlhttp.getResponseHeader('Content-Type').search(/json/g) >= 0)
//                                    opt.htmlParser.parser = NAUR.JSON.Parser;
//                            }
//
//                            if (opt.htmlParser.parser)
//                                opt.htmlParser.parser(opt.xmlhttp.responseText, opt.htmlParser.delegate);
//                        }
//                    }
//                    if (opt.context)
//                        $(opt.context).attr('disabled', false);
//                } else {
//                    if (opt.error)
//                        opt.error({state: NAUR.HTTP.state(opt.xmlhttp.readyState), http: opt.xmlhttp, context: opt.context});
//                    if (opt.context)
//                        $(opt.context).attr('disabled', false);
//                }
//            }
        };

        opt.xmlhttp = NAUR.HTTP.createRequest();
        if (opt.xmlhttp != null) {
            //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
            opt.xmlhttp.open(opt.method, opt.uri, opt.async);
            opt.xmlhttp.onload = function () {
                if (opt.success) {
                    opt.success({
                        output: opt.xmlhttp.responseXML && opt.xmlhttp.responseXML.text.length > 0 ? opt.xmlhttp.responseXML : opt.xmlhttp.responseText,
                        http: opt.xmlhttp,
                        context: opt.context
                    });
                    if (opt.htmlParser) {
                        if (!opt.htmlParser.parser) {
                            if (opt.xmlhttp.getResponseHeader('Content-Type').search(/xml/g) >= 0)
                                opt.htmlParser.parser = NAUR.XML.Parser;
                            if (opt.xmlhttp.getResponseHeader('Content-Type').search(/json/g) >= 0)
                                opt.htmlParser.parser = NAUR.JSON.Parser;
                        }

                        if (opt.htmlParser.parser)
                            opt.htmlParser.parser(opt.xmlhttp.responseText, opt.htmlParser.delegate);
                    }
                }
                if (opt.context)
                    $(opt.context).attr('disabled', false);

                if (opt.complete)
                    opt.complete({
                        type: 'success',
                        output: opt.xmlhttp.responseXML && opt.xmlhttp.responseXML.text.length > 0 ? opt.xmlhttp.responseXML : opt.xmlhttp.responseText,
                        http: opt.xmlhttp,
                        context: opt.context
                    });
            };
            opt.xmlhttp.onerror = function () {
                if (opt.error)
                    opt.error({
                        state: NAUR.HTTP.state(opt.xmlhttp.readyState),
                        http: opt.xmlhttp,
                        context: opt.context
                    });
                if (opt.context)
                    $(opt.context).attr('disabled', false);
                if (opt.complete)
                    opt.complete({
                        type: 'error',
                        state: NAUR.HTTP.state(opt.xmlhttp.readyState),
                        http: opt.xmlhttp,
                        context: opt.context
                    });
            };
            opt.xmlhttp.onreadystatechange = opt.stateChange;
            opt.xmlhttp.withCredentials = true; //标准的CORS请求不对cookies做任何事情，既不发送也不改变。如果希望改变这一情况，就需要将withCredentials设置为true。
            opt.xmlhttp.setRequestHeader("Origin", "hq.sinajs.cn");
            opt.xmlhttp.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
            opt.xmlhttp.setRequestHeader("If-Modified-Since", "0");
            opt.xmlhttp.setRequestHeader("Content-Type", opt.contentType);
            if (opt.body)
                opt.xmlhttp.setRequestHeader("Content-Length", opt.body.length);
            opt.xmlhttp.send(opt.body);    //"name=guestuser&Passwd=111111"
            //if ($.browser.mozilla)
            //opt.xmlhttp.onreadystatechange = opt.stateChange;
        }
        else {
            if (opt.error) {
                opt.error({state: "Your browser does not support XMLHTTP."});
            }
            if (opt.complete) {
                opt.complete({type: 'error', state: "Your browser does not support XMLHTTP."});
            }
        }
    };

    NAUR.HTTP.createRequest = function () {
        if (window.XDomainRequest) {// code for all new browsers
            return new XDomainRequest();

        }
        if (window.XMLHttpRequest) {// code for all new browsers
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) { //"withCredentials" only exists on XMLHTTPRequest2 objects.
                return xhr;
            }
        }
        if (window.ActiveXObject) {// code for IE5 and IE6
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        return null;
    };

    var color = '#A22E00';
    NAUR.XML.Parser = function (rootElement, delegate, sp) {
        if (!rootElement) return;
        if (!delegate) return;
        if (!sp) sp = '';
        if (typeof(rootElement) == 'string') {
            var doc = new ActiveXObject("MSXML2.DOMDocument");
            doc.loadXML(rootElement);
            if (doc.parseError && doc.parseError.errorCode != 0) {
                delegate({content: doc.parseError.reason, color: 'red', inline: false});
                //delegate({content:doc.parseError.srcText, color:'red', inline:false});
                return;
            }
            rootElement = doc.documentElement;
        }

        var span = sp + sp;
        switch (rootElement.nodeType) {
            case 3:
                color = color == '#A22E00' ? '#000080' : '#A22E00';
                delegate({content: rootElement.nodeValue, datehide: true, color: color, inline: true});
                break;
            default:
                if (!rootElement.firstChild)
                    delegate({content: span + '&lt;' + rootElement.nodeName + '/&gt;', datehide: true});
                else {
                    if (rootElement.firstChild.nodeType == 3) {
                        delegate({
                            content: span + '&lt;' + rootElement.nodeName + '&gt;',
                            datehide: true,
                            inline: true
                        });
                    }
                    else
                        delegate({content: span + '&lt;' + rootElement.nodeName + '&gt;', datehide: true});
                }
                break;
        }

        var currentNode = rootElement.childNodes;
        for (var i = 0; i < currentNode.length; i++) {
            NAUR.XML.Parser(currentNode[i], delegate, span.length <= 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : span);
        }

        if (rootElement.nodeType != 3) {
            if (rootElement.firstChild && rootElement.firstChild.nodeType != 3 && rootElement.parentNode.nodeType != 3)
                delegate({content: span + '&lt;/' + rootElement.nodeName + '&gt;', datehide: true});
        }

        if (rootElement.nodeType == 3) {
            delegate({content: '&lt;/' + rootElement.parentNode.nodeName + '&gt;', datehide: true});
        }
    };
    NAUR.JSON.Parser = function (jsonObj, delegate) {
        if (!jsonObj) return;
        if (!delegate) return;
        if (typeof(jsonObj) == 'string')
            jsonObj = $.parseJSON(jsonObj);

        var containArray = false;
        for (var key in jsonObj) {
            if (jsonObj[key] && (typeof(jsonObj[key]) == 'object')
            //&& jsonObj[key].length
            ) {
                containArray = true;
                break;
            }
        }
        if (!containArray) {
            delegate({content: JSON.stringify(jsonObj), inline: false, datehide: true});
            return;
        }

        for (var key in jsonObj) {
            if (jsonObj[key] && (typeof(jsonObj[key]) == 'object') && jsonObj[key].length) {
                for (i = 0; i < jsonObj[key].length; i++) {
                    NAUR.JSON.Parser(jsonObj[key][i], delegate);
                }
            }
            else
                delegate({content: key + '":"' + JSON.stringify(jsonObj[key]), inline: false, datehide: true});
        }
    }

    NAUR.XML.Format = function (options) {
        var opt = $.extend({
            text: ''
        }, options);

        //去掉多余的空格
        opt.text = '\n' + opt.text.replace(/(<\w+)(\s.*?>)/g,
            function ($0, name, props) {
                return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
            }).replace(/>\s*?</g, ">\n<");

        //把注释编码
        opt.text = opt.text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g,
            function ($0, text) {
                var ret = '<!--' + escape(text) + '-->';
                //alert(ret);
                return ret;
            }).replace(/\r/g, '\n');

        //调整格式
        var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
        var nodeStack = [];
        var output = opt.text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
            var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
            //alert([all,isClosed].join('='));
            var prefix = '';
            if (isBegin == '!') {
                prefix = NAUR.XML.getPrefix(nodeStack.length);
            }
            else {
                if (isBegin != '/') {
                    prefix = NAUR.XML.getPrefix(nodeStack.length);
                    if (!isClosed) {
                        nodeStack.push(name);
                    }
                }
                else {
                    nodeStack.pop();
                    prefix = NAUR.XML.getPrefix(nodeStack.length);
                }


            }
            var ret = '\n' + prefix + all;
            return ret;
        });

        var prefixSpace = -1;
        var outputText = output.substring(1);
        //alert(outputText);

        //把注释还原并解码，调格式
        outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
            //alert(['[',prefix,']=',prefix.length].join(''));
            if (prefix.charAt(0) == '\r')
                prefix = prefix.substring(1);
            text = unescape(text).replace(/\r/g, '\n');
            var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
            //alert(ret);
            return ret;
        });

        return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');

    };
    NAUR.XML.getPrefix = function (prefixIndex) {
        var span = '    ';
        var output = [];
        for (var i = 0; i < prefixIndex; ++i) {
            output.push(span);
        }

        return output.join('');
    };

    return NAUR;
});
