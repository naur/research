/*
 * Script：
 *          贾睿之
 * Email：
 *          jiaruizhi@360buy.com
 * Description：
 *          提供 http 工具集。
 *
 */

(function ($) {
    NAURE.HTTP.State = function (state) {
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

    NAURE.HTTP.Request = function (options) {
        var opt = $.extend({
            method:'GET',
            uri:'',
            async:true,
            body:null,
            header:null,
            contentType:'application/xml; charset=utf-8',
            error:null,
            success:null,
            changed:null,
            htmlParser:{parser:null, delegate:null}
        }, options);

        opt.stateChange = function () {
            if (opt.xmlhttp.readyState < 3)
                return;
//            if (opt.xmlhttp.status <= 0)
//                return;
            if (opt.changed) {
                opt.changed({state:NAURE.HTTP.State(opt.xmlhttp.readyState), http:opt.xmlhttp});
            }

            if (opt.xmlhttp.readyState == 4) {
                if (opt.xmlhttp.status == 200) {
                    if (opt.success) {
                        opt.success({xmlDocument:opt.xmlhttp.responseXML, http:opt.xmlhttp});
                        if (opt.htmlParser) {
                            if (!opt.htmlParser.parser) {
                                if (opt.xmlhttp.getResponseHeader('Content-Type').search(/xml/g) >= 0)
                                    opt.htmlParser.parser = NAURE.XML.Parser;
                                if (opt.xmlhttp.getResponseHeader('Content-Type').search(/json/g) >= 0)
                                    opt.htmlParser.parser = NAURE.JSON.Parser;
                            }

                            if (opt.htmlParser.parser)
                                opt.htmlParser.parser(opt.xmlhttp.responseText, opt.htmlParser.delegate);
                        }
                    }
                }
                else {
                    if (opt.error) {
                        opt.error({state:NAURE.HTTP.State(opt.xmlhttp.readyState), http:opt.xmlhttp});
                    }
                }
            }
        };

        opt.xmlhttp = NAURE.HTTP.CreateRequest();
        if (opt.xmlhttp != null) {
            //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
            opt.xmlhttp.onreadystatechange = opt.stateChange;
            opt.xmlhttp.open(opt.method, opt.uri, opt.async);
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
                opt.error({state:"Your browser does not support XMLHTTP."});
            }
        }
    };

    NAURE.HTTP.CreateRequest = function () {
        if (window.XMLHttpRequest) {// code for all new browsers
            return new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {// code for IE5 and IE6
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        return null;
    };

    var color = '#A22E00';
    NAURE.XML.Parser = function (rootElement, delegate, sp) {
        if (!rootElement) return;
        if (!delegate) return;
        if (!sp) sp = '';
        if (typeof(rootElement) == 'string') {
            var doc = new ActiveXObject("MSXML2.DOMDocument");
            doc.loadXML(rootElement);
            rootElement = doc.documentElement;
        }

        var span = sp + sp;
        switch (rootElement.nodeType) {
            case 3:
                color = color == '#A22E00' ? '#000080' : '#A22E00';
                delegate({content:rootElement.nodeValue, datehide:true, color:color, inline:true});
                break;
            default:
                if (rootElement.firstChild.nodeType == 3) {
                    delegate({content:span + '&lt;' + rootElement.nodeName + '&gt;', datehide:true, inline:true});
                }
                else
                    delegate({content:span + '&lt;' + rootElement.nodeName + '&gt;', datehide:true});
                break;
        }

        var currentNode = rootElement.childNodes;
        for (var i = 0; i < currentNode.length; i++) {
            NAURE.XML.Parser(currentNode[i], delegate, span.length <= 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : span);
        }

        if (rootElement.nodeType != 3) {
            if (rootElement.firstChild.nodeType != 3 && rootElement.parentNode.nodeType != 3)
                delegate({content:span + '&lt;/' + rootElement.nodeName + '&gt;', datehide:true});
        }

        if (rootElement.nodeType == 3) {
            delegate({content:'&lt;/' + rootElement.parentNode.nodeName + '&gt;', datehide:true});
        }
    };
    NAURE.JSON.Parser = function (jsonObj, delegate) {
        if (!jsonObj) return;
        if (!delegate) return;
        if (typeof(jsonObj) == 'string')
            jsonObj = $.parseJSON(jsonObj);

        var containArray = false;
        for (var key in jsonObj) {
            if (jsonObj[key] && (typeof(jsonObj[key]) == 'object') && jsonObj[key].length) {
                containArray = true;
                break;
            }
        }
        if (!containArray) {
            delegate({content:JSON.stringify(jsonObj), inline:false, datehide:true});
            return;
        }

        for (var key in jsonObj) {
            if (jsonObj[key] && (typeof(jsonObj[key]) == 'object') && jsonObj[key].length) {
                for (i = 0; i < jsonObj[key].length; i++) {
                    NAURE.JSON.Parser(jsonObj[key][i], delegate);
                }
            }
            else
                delegate({content:key + '":"' + JSON.stringify(jsonObj[key]), inline:false, datehide:true});
        }
    }

    NAURE.XML.Format = function (options) {
        var opt = $.extend({
            text:''
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
                prefix = NAURE.XML.getPrefix(nodeStack.length);
            }
            else {
                if (isBegin != '/') {
                    prefix = NAURE.XML.getPrefix(nodeStack.length);
                    if (!isClosed) {
                        nodeStack.push(name);
                    }
                }
                else {
                    nodeStack.pop();
                    prefix = NAURE.XML.getPrefix(nodeStack.length);
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
    NAURE.XML.getPrefix = function (prefixIndex) {
        var span = '    ';
        var output = [];
        for (var i = 0; i < prefixIndex; ++i) {
            output.push(span);
        }

        return output.join('');
    };

})  (jQuery);
