var JAM = {Dom:{elById:function (b) {
    var a = document.getElementById(b);
    if (this.__DebugAssertOnSelectFail)return a
}, elArrayByClass:function (g, b, c) {
    var f = [];
    if (b === null || b === undefined)b = document;
    if (c === null || c === undefined)c = "*";
    var d = b.getElementsByTagName(c), h = d.length, i = new RegExp("(^|\\s)" + g + "(\\s|$)"), a, e;
    for (a = 0, e = 0; a < h; a++)if (i.test(d[a].className)) {
        f[e] = d[a];
        e++
    }
    if (this.__DebugAssertOnSelectFail)return f
}, elByClass:function (c, e, f, d, b) {
    var a = this.elArrayByClass(c, e, f, d, b);
    if (a.length > 0)return a[0];
    return null
}, playerById:function (a) {
    if (window.document[a])return window.document[a]; else if (document.embeds && document.embeds[a])return document.embeds[a]; else return document.getElementById(a)
}, optionByValue:function (b, c) {
    for (var a = 0; a < b.options.length; a++)if (b.options[a].value == c)return b.options[a];
    return null
}, __DebugAssertOnSelectFail:true, removeEl:function (a) {
    a.innerHTML = "";
    a.parentNode.removeChild(a)
}}, Obj:{isNum:function (a) {
    return !isNaN(parseInt(a, 10))
}, hasValue:function (a) {
    return a !== null && a !== undefined
}}, Array:{indexOf:function (b, c) {
    for (var a = 0; a < b.length; a++)if (b[a] == c)return a;
    return -1
}, "ensure":function (a) {
    if (a && !a.length)a = [a];
    return a
}}, String:{trim:function (a) {
    return a.replace(/^\s+|\s+$/g, "")
}, isNonEmpty:function (a) {
    return JAM.Obj.hasValue(a) && typeof a === "string" && a.length > 0
}, replace:function (c, b, a) {
    return c.split(b).join(a)
}, shorten:function (d, b, c) {
    var a = this.trim(d);
    if (a.length > b) {
        a = a.substr(0, c ? b : b - 3);
        if (!c)a += "..."
    }
    return a
}, toDBC:function (c) {
    var a = [];
    for (var b = 0; b < c.length; b++)if (c.charCodeAt(b) == 12288)a[a.length] = String.fromCharCode(32); else if (c.charCodeAt(b) > 65248 && c.charCodeAt(b) < 65375)a[a.length] = String.fromCharCode(c.charCodeAt(b) - 65248); else a[a.length] = c.charAt(b);
    return a.join("")
}, sanitize:function (a, c) {
    var b = 2e3;
    if (a.length >= b)a = a.substr(0, b);
    a = a.replace(/(?:&[#A-Za-z0-9]+;)|(?:[\\/<>\(\)\t%])/g, "");
    if (!c)a = this.trim(a);
    return a
}}, URL:{decode:function (a) {
    try {
        return decodeURIComponent(a)
    } catch (b) {
        return unescape(a)
    }
}, parseQueryFromSearch:function () {
    var b = "", a = location.search.match(/[?&]q=([^&$]*)/);
    if (a !== null && a.length > 0)b = a[1];
    return b
}, parseQueryFromHash:function (d) {
    var a = "", c = "";
    if (d)c = d; else c = location.hash;
    a = c.replace("#", "");
    if (a) {
        var b = [];
        b = a.split("|");
        if (b && b.length > 1)a = b[0]
    }
    return a
}}, UI:{setElOpacity:function (a, d) {
    if (navigator.appVersion.indexOf("MSIE") != -1)if (d >= 10) {
        a.style.filter = "";
        if (a.style.cssText) {
            var b = a.style.cssText.split(";"), c = "";
            for (var e in b)if (b[e].toLowerCase().indexOf("filter:") == -1) {
                c += b[e];
                if (e < b.length - 1)c += ";"
            }
            a.style.cssText = c
        }
    } else a.style.filter = "alpha(opacity=" + d * 10 + ")"; else a.style.opacity = d / 10
}, setElText:function (a, b) {
    if (JAM.Obj.hasValue(a.textContent))a.textContent = b; else a.innerText = b
}, getElText:function (b) {
    var a = null;
    if (b.textContent)a = b.textContent; else a = b.innerText;
    return a
}, getElTop:function (b, c) {
    if (b == null || b.offsetTop == null)return -1;
    var d = b.offsetTop, a = b.offsetParent;
    while (a != null) {
        if (c)if (a == c)break;
        d += a.offsetTop;
        a = a.offsetParent
    }
    return d
}, getElLeft:function (a, c) {
    if (a === null || a === undefined || a.offsetLeft === null || a.offsetLeft === undefined || a.offsetParent === null || a.offsetParent == undefined)return -1;
    var d = a.offsetLeft, b = a.offsetParent;
    while (b !== null) {
        if (c)if (b == c)break;
        d += b.offsetLeft;
        b = b.offsetParent
    }
    return d
}, getElRight:function (a) {
    return this.getElLeft(a) + a.offsetWidth
}, getElStyle:function (c, d, f, b) {
    var a = null;
    if (!b)b = d;
    if (c.currentStyle)a = c.currentStyle[d]; else if (window.getComputedStyle) {
        var e = window.getComputedStyle(c, "");
        a = e.getPropertyValue(b)
    }
    if (f)a = parseInt(a, 10);
    return a
}, getNoWrapElWidth:function (d) {
    var a = d.cloneNode(true);
    a.style.visibility = "hidden";
    a.style.position = "absolute";
    a.style.left = 0;
    a.style.top = 0;
    a.id = "";
    a.whiteSpace = "nowrap";
    var b = document.body.appendChild(a), c = b.offsetWidth;
    JAM.Dom.removeEl(b);
    return c
}, getNoWrapElHeight:function (d) {
    var a = d.cloneNode(true);
    a.style.visibility = "hidden";
    a.style.display = "block";
    a.style.height = "auto";
    a.style.position = "absolute";
    a.style.left = "0px";
    a.style.top = "0px";
    a.id = "";
    a.whiteSpace = "nowrap";
    var b = document.body.appendChild(a), c = b.offsetHeight;
    JAM.Dom.removeEl(b);
    return c
}}, Mouse:{getMouseLocFromEvent:function (e) {
    function f(a, b) {
        this.X = a;
        this.Y = b
    }

    var a = null, b = null, c = null, d = null;
    if (!isNaN(window.scrollX)) {
        a = e.clientX;
        b = e.clientY;
        c = window.scrollX;
        d = window.scrollY
    } else if (!isNaN(window.event.clientX)) {
        a = window.event.clientX;
        b = window.event.clientY;
        c = document.documentElement.scrollLeft + document.body.scrollLeft;
        d = document.documentElement.scrollTop + document.body.scrollTop
    }
    return new f(a + c, b + d)
}}, History:{push:function (a, e, f, d) {
    a = encodeURIComponent(a);
    if (!d && g_fIE7orLess) {
        if (!document.__historyIframe) {
            var c = document.createElement("iframe");
            c.id = "historyIframe";
            c.height = c.width = c.frameborder = "0px";
            document.__historyIframe = document.appendChild(c)
        }
        var g = document.__historyIframe;
        document.__historyCallBackThisPtr = f;
        document.__historyChangedHandler = e;
        if (!document.__historyCallBackBootStrapper)document.__historyCallBackBootStrapper = function (a) {
            document.__historyChangedHandler.apply(document.__historyCallBackThisPtr, [a])
        };
        a = a.replace(/'/g, "\\'");
        var h = "<html><head><title>" + a + "</title><script>parent.document.__historyCallBackBootStrapper('" + a + "')</script></head></html>", b = g.contentDocument;
        if (!b)b = g.contentWindow.document;
        if (!b)return;
        if (b.title != a) {
            b.open();
            b.write(h);
            b.close()
        }
    }
    if (!this._listenerIntId)this._enableLocationHashListener(f, e);
    if (!d && window.location.hash != "#" + a)window.location.hash = a
}, _listenerIntId:null, _enableLocationHashListener:function (c, b) {
    var a = window.location.hash;
    this._listenerIntId = window.setInterval(function () {
        var d = window.location.hash;
        if (d != a) {
            b.apply(c, [JAM.URL.parseQueryFromHash(d)]);
            a = d
        }
    }, 200)
}, disposeLocationHashListener:function () {
    if (this._listenerIntId) {
        window.clearInterval(this._listenerIntId);
        this._listenerIntId = null
    }
}}, Window:{getWindowSize:function () {
    function b() {
        this.Width = 0;
        this.Height = 0
    }

    var a = new b;
    if (typeof window.innerWidth == "number") {
        a.Width = window.innerWidth;
        a.Height = window.innerHeight
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        a.Width = document.documentElement.clientWidth;
        a.Height = document.documentElement.clientHeight
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        a.Width = document.body.clientWidth;
        a.Height = document.body.clientHeight
    }
    return a
}}, Cookie:{read:function (a) {
    var c = document.cookie.indexOf(a + "="), d = c + a.length + 1;
    if (!c && a != document.cookie.substring(0, a.length))return null;
    if (c == -1)return null;
    var b = document.cookie.indexOf(";", d);
    if (b == -1)b = document.cookie.length;
    var e = unescape(document.cookie.substring(d, b));
    return unescape(document.cookie.substring(d, b))
}, write:function (e, d, a) {
    if (a === null || a === undefined || typeof a != "number")a = 99999;
    var b = new Date;
    b.setDate(b.getDate() + a);
    var c = e + "=" + escape(d) + "; expires=" + b.toGMTString() + "; path=/;";
    document.cookie = c;
    return true
}}, Json:{parse:function (a) {
    var b = null;
    if (a && typeof a == "string" && a.length > 0)if (window.JSON && window.JSON.parse)try {
        b = window.JSON.parse(a)
    } catch (c) {
    } else b = !/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(a.replace(/"(\\.|[^"\\])*"/g, "")) && eval("(" + a + ")");
    return b
}}, Ajax:{open:function (b, c, f, e, g, d) {
    var a = null;
    if (!a)if (window.XMLHttpRequest)a = new XMLHttpRequest; else if (window.ActiveXObject)try {
        a = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (i) {
        a = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (!a)return;
    var h = null;
    if (b == "get")c = c + "?" + f;
    a.open(b, c, true);
    a.onreadystatechange = function () {
        if (a.readyState == 4)if (e && a.status == 200)e(a.responseText, a, d); else if (g)g(a.status, a, d)
    };
    if (b == "post") {
        a.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        h = f
    }
    a.send(h)
}}, Effects:{Drag:{enable:function (a, b, c) {
    if (a === null || a === undefined || !a.tagName)return;
    if (b == null || b.tagName == null) {
        c = b;
        b = a
    }
    if (a._state)return;
    a._state = {elStart:{left:null, top:null}, mouseStart:{x:null, y:null}, options:null, origCursorStyle:null, origPositionStyle:null, onDragCallBack:null, dragEnabled:true, dragEL:a, fireEL:b};
    if (!c)c = {};
    if (!c.direction || c.direction != "x" && c.direction != "y")c.direction = "xy";
    a._state.options = c;
    JAM.Events.addHandler(b, "mousedown", this, "_dragStart", false, a);
    a._state.origPositionStyle = a.style.position;
    a.style.position = "absolute";
    a._state.origCursorStyle = a.style.cursor;
    if (a._state.options.cursor)b.style.cursor = a._state.options.cursor; else switch (c.direction) {
        case "x":
            b.style.cursor = "w-resize";
            break;
        case "y":
            b.style.cursor = "n-resize";
            break;
        case "xy":
            b.style.cursor = "move";
            break;
        default:
            b.style.cursor = "default"
    }
    this._dragStart = function (c, f, b) {
        if (!this.isEnabled(b))return;
        var e = window.Event && window.Event.button ? window.Event.button : c.button;
        if (e === 2)return;
        var d = JAM.Mouse.getMouseLocFromEvent(c);
        b._state.mouseStart.x = d.X;
        b._state.mouseStart.y = d.Y;
        b._state.elStart.top = JAM.UI.getElTop(b);
        b._state.elStart.left = JAM.UI.getElLeft(b);
        JAM.Events.addHandler(document, "mousemove", this, "_dragGo", false, b);
        JAM.Events.addHandler(document, "mouseup", this, "_dragStop", false, b);
        JAM.Events.cancelEventBubble(c);
        if (a._state.options.cursorDrag)a.style.cursor = a._state.options.cursorDrag;
        if (b._state.options.onDragStartCallBack)b._state.options.onDragStartCallBack.apply(b._state.options.callBackThis, [b, JAM.Mouse.getMouseLocFromEvent(c), b._state.options.callBackParam])
    };
    this._dragGo = function (k, m, a) {
        if (!this.isEnabled(a))return;
        var h = JAM.Mouse.getMouseLocFromEvent(k);
        if (a._state.options.onDragCallBack)a._state.options.onDragCallBack.apply(a._state.options.callBackThis, [a, JAM.Mouse.getMouseLocFromEvent(k), a._state.options.callBackParam]);
        a = a._state.dragEL;
        var i = 0, j = 0;
        if (a.parentNode.offsetParent) {
            i = JAM.UI.getElLeft(a.parentNode);
            j = JAM.UI.getElTop(a.parentNode)
        }
        var l = a._state.options.invert, f, d, g, e;
        if (a._state.options.boundBox) {
            f = a._state.options.boundBox.left;
            d = a._state.options.boundBox.right;
            g = a._state.options.boundBox.top;
            e = a._state.options.boundBox.bottom
        }
        if (a._state.options.direction === "x" || a._state.options.direction === "xy") {
            var b;
            if (!l)b = a._state.elStart.left + h.X - a._state.mouseStart.x - i; else b = a._state.elStart.left - h.X + a._state.mouseStart.x - i;
            if (JAM.Obj.isNum(f) && b < f)b = f;
            if (JAM.Obj.isNum(d) && b > d)b = d;
            a.style.left = b + "px"
        }
        if (a._state.options.direction === "y" || a._state.options.direction === "xy") {
            var c;
            if (!l)c = a._state.elStart.top + h.Y - a._state.mouseStart.y - j; else c = a._state.elStart.top - h.Y + a._state.mouseStart.y - j;
            if (JAM.Obj.isNum(g) && c < g)c = g;
            if (JAM.Obj.isNum(e) && c > e)c = e;
            a.style.top = c + "px"
        }
        JAM.Events.cancelEventBubble(k)
    };
    this._dragStop = function (c, d, b) {
        if (!this.isEnabled(b))return;
        JAM.Events.removeHandler(document, "mousemove", "_dragGo");
        JAM.Events.removeHandler(document, "mouseup", "_dragStop");
        if (b._state.options.onDragStopCallBack)b._state.options.onDragStopCallBack.apply(b._state.options.callBackThis, [b, JAM.Mouse.getMouseLocFromEvent(c), b._state.options.callBackParam]);
        JAM.Events.cancelEventBubble(c);
        if (a._state.options.cursor)a.style.cursor = a._state.options.cursor
    }
}, isEnabled:function (a) {
    return !!a._state && a._state.dragEnabled
}, isDisabled:function (a) {
    return !!a._state && !a._state.dragEnabled
}, applyOptions:function (a, b) {
    if (a === null || a === undefined || b === null || b === undefined)return;
    if (!this.isEnabled(a))return;
    a._state.options = b
}, reEnable:function (a) {
    if (a === null || a === undefined)return;
    if (!!!a._state)return;
    if (a._state.dragEnabled)return;
    a._state.dragEnabled = true
}, disable:function (a) {
    if (a === null || a === undefined)return;
    if (!!!a._state)return;
    if (!a._state.dragEnabled)return;
    a._state.dragEnabled = false
}, dispose:function (a) {
    if (a === null || a === undefined)return;
    if (!!!a._state)return;
    a.style.position = a._state.origPositionStyle;
    a.style.cursor = a._state.origCursorStyle;
    JAM.Events.removeHandler(a, "mousedown", "_dragStart");
    JAM.Memory.clearObj(a._state);
    a._state = null
}}}, Events:{generateEventHashKey:function (b, a) {
    return "e_" + b + "_" + a
}, addHandler:function (a, d, f, e, g, h) {
    if (!a)return false;
    var c = this.generateEventHashKey(d, e);
    if (a[c])return false;
    var b = function (b) {
        f[e](b, a, h)
    };
    if (a.addEventListener) {
        a[c] = b;
        a.addEventListener(d, b, g);
        return true
    } else if (a.attachEvent) {
        a[c] = b;
        a.attachEvent("on" + d, b);
        return true
    } else return false
}, removeHandler:function (a, c, d) {
    if (!a)return false;
    var b = this.generateEventHashKey(c, d);
    if (!a[b])return false;
    if (a.removeEventListener) {
        a.removeEventListener(c, a[b], false);
        a[b] = null;
        return true
    } else if (a.attachEvent) {
        a.detachEvent("on" + c, a[b]);
        a[b] = null;
        return true
    } else return false
}, hasHandler:function (a, d, c) {
    if (!a)return false;
    var b = this.generateEventHashKey(d, c);
    return a[b]
}, cancelEventBubble:function (a) {
    if (!a)a = window.event;
    if (!a)return;
    if (a.preventDefault)a.preventDefault();
    if (a.stopPropagation)a.stopPropagation();
    a.cancelBubble = true;
    a.cancel = true;
    a.returnValue = false
}, setInterval:function (b, c, a, d) {
    return setInterval(function () {
        b[c](a, d)
    }, a)
}, runOnDomReady:function (e, c, d) {
    var b = null;

    function a() {
        if (arguments.callee.done)return;
        arguments.callee.done = true;
        if (b)clearInterval(b);
        e.apply(c, [d])
    }

    if (document.addEventListener)document.addEventListener("DOMContentLoaded", a, false);
    if (/WebKit/i.test(navigator.userAgent))var b = setInterval(function () {
        if (/loaded|complete/.test(document.readyState))a()
    }, 10);
    window.onload = a
}}};

function $Id(b, a) {
    return JAM.Dom.elById(b, a)
}
function $Class(c, b, e, d, a) {
    return JAM.Dom.elByClass(c, b, e, d, a)
}

var g_fIE = /msie/i.test(navigator.userAgent) && !window.opera, g_fIE6orLess = g_fIE && !window.XMLHttpRequest, g_fIE8StdOrMore = g_fIE && document.documentMode && document.documentMode >= 8, g_fIE7orLess = g_fIE && !g_fIE8StdOrMore, Lingo = {Lang:{ulang:"ZH-CN", tlang:"EN-US"}, init:function (c) {
    this.ADsCtrl.init();
    for (var f in c)Lingo._settings[f] = c[f];
    var e = JAM.URL.parseQueryFromHash(), a = JAM.URL.parseQueryFromSearch();
    if (a)a = JAM.String.replace(a, "+", " ");
    if (g_fIE)window.onbeforeunload = function () {
        if (location.hash != "#")location.hash = "#"
    };
    JAM.Events.addHandler(window, "resize", Lingo, "onResizeWin");
    var b = $Id("acdPanelCntr", true);
    if (b)this.AcdCtrl.Init(b); else this.AcdCtrl = null;
    var d = $Id("mainInputCntr", true);
    if (d)this.MainInputCtrl.init($Id("mainInputField"), d, $Id("suggCntr"), $Id("suggFrame"), $Id("vertCntr", true), $Id("wtrMark", true)); else this.MainInputCtrl = null;
    this.AudioCtrl.init($Id("playerCntr"));
    this.DymCtrl.init($Id("dym_content"));
    this.FdbckCtrl.init($Id("fdbckwin"));
    this.TopHatCtrl.init($Id("navlinks", true));
    this.TabCtrl.init($Id("tabsCntr"), $Id("tabsContextMenu"), $Id("selectedTab"), $Id("tabList"), $Id("tabTip", true), {maxTabChars:12, onRenderSingleTab:this.onRenderSingleTab, onRenderNoTabs:this.onRenderNoTabs, onTabDropTarget:this.onTabDropTarget, callBackThis:this}, $Id("tabsContextMenuFrame"), $Id("tabListFrame"));
    this.HomePageCtrl.init($Id("homeMainContent"), Lingo._settings.centerHomepageWhenTabless, $Id("logo", true), this.MainInputCtrl);
    $Id("initLoadUi").style.display = "none";
    this.recalcLayout(true);
    if (this.MainInputCtrl && $Id("mainInputBtn").dirty)this.processQuery(this.MainInputCtrl.getTextSanitized()); else if (e)this.processQuery(e); else if (a)this.processQuery(a); else this.navToHome();
    this.ThCtrl.init($Id("thCtrl", true), $Id("thplayerframe", true))
}, mediaServer:"http://media.engkoo.com:8129/", _staticUiInfo:{}, _uiCacheHashTable:{}, _settings:{inlineTabCompare:true, enableBrowserBackBtn:true, enableAV:true, centerHomepageWhenTabless:true, senOps:{alignQuery:true, alignOnHover:true, maxPerPage:10, maxPages:9}}, _strTable:{maxBtnCls:"sprite_v2maxbtn", rstrBtnCls:"sprite_v2rstrbtn", dictMainBaseName:"dictmain", hrefQueryTempl:'<a title="点击获取释义" style="{STYLE}" href="#{ESC_TERM}" onClick="Lingo.processQuery(\'{ESC_TERM}\'); return false;">{TERM}</a>', navHome:":home", defaultErrMsg:"我们目前无法处理您的请求。请您刷新页面或稍后再试。", reportMsg:"报告问题或瑕疵", reportThxMsg:"谢谢您的帮助！", pageTitle:"必应词典(Beta)，在线词典，在线翻译，英语学习引擎"}, EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"}, EDictAreas:{def:"def", sen:"sen"}, ELogCategory:{err:"err:", sqm:"sqm:", flag:"flag:", entryFdbk:"entryFdbk:"}, getInternalQueryHtml:function (b, c, d) {
    var e = b;
    if (d)e = d;
    var a = this._strTable.hrefQueryTempl.replace(/{ESC_TERM}/g, escape(b)).replace(/{TERM}/, e);
    if (c)a = a.replace(/{STYLE}/g, c);
    return a
}, getInternalQueryHtmlForEmbeddedEngWords:function (a) {
    var d = "#*#", b = "<br/>", c = a.indexOf(b) != -1;
    if (c)a = JAM.String.replace(a, b, d);
    a = a.replace(/[A-Z\-a-zÀ-ÖØ-öø-ÿ\&]{3,}/g, '<a title="点击获取释义" href="#$&" onClick="Lingo.processQuery(\'$&\'); return false;">$&</a>');
    if (c)a = JAM.String.replace(a, d, b);
    return a
}, recalcLayout:function (j) {
    if (!this._staticUiInfo.nonVpageAreaHeight) {
        var c = $Id("header", true), a = $Id("footer", true), e = 0, h = 0;
        if (c)e = c.offsetHeight + JAM.UI.getElStyle(c, "marginBottom", true, "margin-bottom");
        if (a)h = JAM.UI.getElStyle(a, "height", true) + JAM.UI.getElStyle(a, "marginTop", true, "margin-top") + JAM.UI.getElStyle(a, "marginBottom", true, "margin-bottom");
        this._staticUiInfo.nonVpageAreaHeight = e + h + $Id("tabsCntr").offsetHeight
    }
    var g = $Id("container"), i = g.offsetHeight - this._staticUiInfo.nonVpageAreaHeight;
    $Id("vpagesCntr").style.height = i + "px";
    if (!j) {
        var b = this.currentVPage;
        switch (b.type) {
            case this.EVPageTypes.dict:
                this.recalcDictMainArea(b, this.getDictMainEl());
                if (this.AcdCtrl)this.AcdCtrl.RefreshHeights(g.offsetHeight - this._staticUiInfo.nonVpageAreaHeight);
                break;
            case this.EVPageTypes.dictComp:
                this.recalcDictMainArea(b, this.getDictMainEl(1));
                this.recalcDictMainArea(b, this.getDictMainEl(2));
                Lingo.TabCtrl.hideTabTip(true);
                break;
            case this.EVPageTypes.home:
                var f = $Id("homeTips", true), d = $Id("homeFriends", true);
                if (f && d)f.style.height = d.style.height = $Id("homeCenterCol").offsetHeight - 30 + "px";
                break;
            case this.EVPageTypes.didYouMean:
                this.recalcDidYouMean()
        }
    }
}, recalcDictMainArea:function (n, a) {
    var j = Lingo.uiCache("dictarea", a, "div"), l = Lingo.uiCache("dictbar", a, "div"), g = Lingo.uiCache("dictsubbar", a, "div"), h = Lingo.uiCache("defCntr", a, "div"), k = Lingo.uiCache("sentarea", a, "div"), m = Lingo.uiCache("sentbar", a, "div"), i = Lingo.uiCache("sentcontent", a, "div"), e = Lingo.uiCache("mainsentcontent", a, "div"), c = n.getUiState(this.getDictMainNum(a)).maximizedDictArea;
    if (!this._staticUiInfo.nonDefCntrHeight)this._staticUiInfo.nonDefCntrHeight = l.offsetHeight + g.offsetHeight + JAM.UI.getElStyle(h, "marginBottom", true, "margin-bottom") + JAM.UI.getElStyle(g, "marginBottom", true, "margin-bottom");
    var f = j.offsetHeight - this._staticUiInfo.nonDefCntrHeight;
    if (f < 0)f = 0;
    h.style.height = f + "px";
    if (c)this._staticUiInfo.nonDefCntrHeight = null;
    if (!this._staticUiInfo.nonSentContentHeight)this._staticUiInfo.nonSentContentHeight = m.offsetHeight;
    var b = k.offsetHeight - this._staticUiInfo.nonSentContentHeight;
    if (b < 0)b = 0;
    i.style.height = b + "px";
    if (c)this._staticUiInfo.nonSentContentHeight = null;
    if (!this._staticUiInfo.nonMainSentContentHeight)this._staticUiInfo.nonMainSentContentHeight = JAM.UI.getElStyle(e, "marginTop", true, "margin-top");
    var d = b - this._staticUiInfo.nonMainSentContentHeight;
    if (d < 0)d = 0;
    e.style.height = d + "px";
    if (c)this._staticUiInfo.nonMainSentContentHeight = null;
    e.scrollTop = 0
}, recalcDidYouMean:function () {
    var d = $Id("vpage_dym"), c = $Id("dym_content"), b = $Id("container"), a = b.offsetHeight - this._staticUiInfo.nonVpageAreaHeight;
    if (a > 35) {
        d.style.height = a + "px";
        c.style.height = a - 35 + "px"
    }
}, processQuery:function (a) {
    var d = null, m = null;
    a = JAM.String.toDBC(a);
    a = JAM.URL.decode(a);
    a = JAM.String.sanitize(a);
    a = a.replace(/\b\+\b/g, " ");
    if (!JAM.String.isNonEmpty(a))a = this._strTable.navHome;
    var b, e;
    if (a.length <= 200) {
        var c = a.match(/(.+)(?: vs[.]? | pk )(.+)|(.+)同(.+)对比/im);
        if (c && c.length > 2)if (Lingo._settings.inlineTabCompare) {
            if (c[1] && c[2]) {
                b = JAM.String.trim(c[1]);
                e = JAM.String.trim(c[2])
            } else if (c[3] && c[4]) {
                b = JAM.String.trim(c[3]);
                e = JAM.String.trim(c[4])
            }
        } else {
            this.TabCtrl.renderTabs();
            window.open("./?q=" + encodeURIComponent(a), "ekwin");
            return
        }
        if (b == e)b = null
    }
    var l = this.TabCtrl.findTabByTitle(a, null, true);
    if (!l && b && e) {
        var i = this.TabCtrl.findTabByTitle(b, null, true), h = this.TabCtrl.findTabByTitle(e, null, true);
        if (i == h)h = null;
        if (i && i.isInCompareMode())this.TabCtrl.uncombineTabs(i);
        if (h && h.isInCompareMode())this.TabCtrl.uncombineTabs(h)
    }
    if (l) {
        this.TabCtrl.selectTab(l);
        this.TabCtrl.renderTabs();
        return
    }
    if (a.indexOf(this._strTable.navHome) != -1)d = new this.VPage(this.EVPageTypes.home, this._strTable.navHome, true); else if (Lingo._settings.inlineTabCompare && b && e) {
        var f = this.TabCtrl.findTabByTitle(b, b), g = this.TabCtrl.findTabByTitle(e, e);
        d = new this.VPage(this.EVPageTypes.dictComp, a);
        if (!f) {
            var j = new this.VPage(this.EVPageTypes.dict, b);
            f = this.TabCtrl.newTab(j.queryStr, j, true);
            j.tabRef = f
        }
        if (!g) {
            var k = new this.VPage(this.EVPageTypes.dict, e);
            g = this.TabCtrl.newTab(k.queryStr, k, true);
            k.tabRef = g
        }
        if (f && g) {
            d.ancestorTab1 = f;
            d.ancestorTab2 = g;
            this.TabCtrl.cutTab(f);
            m = this.TabCtrl.cutTab(g)
        }
    } else d = new this.VPage(this.EVPageTypes.dict, a);
    if (!JAM.Obj.hasValue(d))d = new this.VPage(this.EVPageTypes.err, a, true);
    var n = this.TabCtrl.newTab(d.queryStr, d, false, m);
    d.tabRef = n;
    this.TabCtrl.renderTabs()
}, onRenderNoTabs:function () {
    this.TabCtrl.hide();
    this.navToHome()
}, onRenderSingleTab:function (b) {
    var a = b.vPage;
    this.renderVPage(a)
}, onBackFwdBtnClick:function (a) {
    document.title = Lingo._strTable.pageTitle;
    if (a && JAM.String.isNonEmpty(a)) {
        a = JAM.String.sanitize(JAM.URL.decode(this.inflateQuery(a)));
        if (this.currentVPage && this.currentVPage.queryStr != a)this.processQuery(a)
    }
}, onSearchBtnClick:function (a) {
    if (a)JAM.Events.cancelEventBubble(a);
    Lingo.processQuery(Lingo.MainInputCtrl.getTextSanitized())
}, onBodyBgClick:function () {
    this.TabCtrl.hideContextMenu();
    this.TabCtrl.hideTabTip(true);
    this.TabCtrl.hideTabList()
}, onSenPg:function (f, d) {
    var a = this.getDictMainNumFromChildEl(d), b = this.currentVPage, e = b.getData(a);
    sentsObj = e.ROOT.SENTS;
    sentsObj.$OFFSET = f * Lingo._settings.senOps.maxPerPage;
    var c = Lingo.currentVPage.getUiState(a).selectedInfl;
    this.renderPartialVPageSents(b, a, c)
}, onSenFilterCat:function (b) {
    var a = this.getDictMainNumFromChildEl(b), c = this.currentVPage, e = c.getData(a);
    sentsObj = e.ROOT.SENTS;
    sentsObj.$CAT = b.value;
    sentsObj.$OFFSET = 0;
    var d = Lingo.currentVPage.getUiState(a).selectedInfl;
    this.renderPartialVPageSents(c, a, d)
}, onSenFilterSrc:function (b) {
    var a = this.getDictMainNumFromChildEl(b), c = this.currentVPage, e = c.getData(a);
    sentsObj = e.ROOT.SENTS;
    sentsObj.$SRC = b.value;
    sentsObj.$OFFSET = 0;
    var d = Lingo.currentVPage.getUiState(a).selectedInfl;
    this.renderPartialVPageSents(c, a, d)
}, onSenFilterDiff:function (b) {
    var a = this.getDictMainNumFromChildEl(b), c = this.currentVPage, e = c.getData(a);
    sentsObj = e.ROOT.SENTS;
    sentsObj.$DIFF = b.value;
    sentsObj.$OFFSET = 0;
    var d = Lingo.currentVPage.getUiState(a).selectedInfl;
    this.renderPartialVPageSents(c, a, d)
}, onSenAlignChkClick:function (a) {
    var b = this.getDictMainNumFromChildEl(a), c = this.currentVPage, f = c.getData(b), e = this.getDictMainEl(b), d = Lingo.uiCache("sentInnerCntr", e, "div");
    Lingo._settings.senOps.alignQuery = Lingo._settings.senOps.alignOnHover = a.checked;
    this.SenCtrl.init(d, f.ROOT.SENTS, Lingo._settings.senOps);
    this.upLog(c, "alignChk: " + a.checked, this.ELogCategory.sqm)
}, onReportBadEntry:function (a) {
    if (!this.currentVPage.flagged) {
        this.upLog(this.currentVPage, "", this.ELogCategory.flag);
        this.currentVPage.flagged = true;
        a.innerHTML = this._strTable.reportThxMsg
    }
    Lingo.FdbckCtrl.show()
}, onToggleMoreDef:function (a) {
    var d = this.currentVPage, c = this.getDictMainNumFromChildEl(a), b = false;
    if (a.className == this._strTable.maxBtnCls) {
        b = true;
        a.className = this._strTable.rstrBtnCls
    } else if (a.className == this._strTable.rstrBtnCls) {
        b = false;
        a.className = this._strTable.maxBtnCls
    }
    this.renderPartialVPageDefMoreLess(d, c, !b)
}, onToggleMoreSen:function (a) {
    var b = false, d = this.getDictMainNumFromChildEl(a), c = this.getDictMainEl(d);
    if (a.className == this._strTable.maxBtnCls) {
        b = true;
        a.className = this._strTable.rstrBtnCls
    } else if (a.className == this._strTable.rstrBtnCls) {
        b = false;
        a.className = this._strTable.maxBtnCls
    }
    if (b)this.maximizeSenArea(c); else this.restoreDictAreas(c)
}, showDefLangView:function (b, a) {
    var c = Lingo.uiCache("dl_cross", a, null, true), d = Lingo.uiCache("dl_homo", a, null, true), e = Lingo.uiCache("defInnerCntr", a);
    if (b == "homo" && d)d.checked = true; else if (c)c.checked = true;
    this.DefCtrl.renderLang(e, b)
}, onSetDefLangView:function (b, c) {
    var e = this.currentVPage, a = this.getDictMainEl(c);
    try {
        JAM.Cookie.write("dfl", b)
    } catch (d) {
    }
    this.showDefLangView(b, a);
    this.applyDictAreasSplit(a, null, true);
    this.recalcLayout()
}, onResizeWin:function () {
    if (this.currentVPage) {
        var a = JAM.Window.getWindowSize();
        if (this._lastWinSize == null || a && this._lastWinSize.Height != a.Height) {
            this.applyDictAreasSplit(this.getDictMainEl(), null, true);
            this.recalcLayout();
            Lingo.ThCtrl.getThctrBoundBox()
        }
        this._lastWinSize = a
    }
}, serverAsyncReq:function (a, b, c) {
    var e = "post", d = "io.aspx", f = this;
    a += "&ulang=ZH-CN&tlang=EN-US";
    JAM.Ajax.open(e, d, a, function (d, c, a) {
        b.apply(a, [d, c, a])
    }, function () {
        setTimeout(function () {
            JAM.Ajax.open(e, d, a, function (d, c, a) {
                b.apply(a, [d, c, a])
            }, function (d, b, a) {
                if (c)c.apply(a, [d, b, a])
            }, f)
        }, 1e3)
    }, f)
}, navToHome:function () {
    this.processQuery(this._strTable.navHome)
}, currentVPage:null, renderCurrVPage:function () {
    this.renderVPage(this.currentVPage)
}, renderSentLoading:function (h, e, b) {
    var a = this.getDictMainEl(e), f = Lingo.uiCache("sentLoad", a, "img"), d = Lingo.uiCache("dynsentdata", a, "div"), g = Lingo.uiCache("sentInnerCntr", a, "div"), c = Lingo.uiCache("mainsentcontent", a, "div");
    c.scrollTop = 0;
    f.style.display = b ? "none" : "block";
    d.style.display = b ? "block" : "none"
}, renderDefLoading:function (f, d, b) {
    var a = this.getDictMainEl(d), e = Lingo.uiCache("defLoad", a), c = Lingo.uiCache("dyndefdata", a);
    e.style.display = b ? "none" : "block";
    c.style.display = b ? "block" : "none"
}, renderPartialVPageSents:function (b, a, e) {
    var d = b.getData(a), c = d.ROOT.SENTS, g = c.$OFFSET, j = c.$CAT, k = c.$SRC, i = c.$DIFF;
    this.renderSentLoading(b, a);
    var f = null;
    if (e && JAM.String.isNonEmpty(e))f = e; else f = d.ROOT.$INPUT;
    var h = "q=" + encodeURIComponent(f) + "&t=" + b.type + "&ut=sent" + "&sc=" + j + "&ss=" + k + "&sd=" + i + "&ofst=" + g;
    this.serverAsyncReq(h, function (i) {
        if (b.parseJsonToObj(i, a, "SENTS", "SENTS")) {
            var c = this.getDictMainEl(a), e = Lingo.uiCache("dynsentdata", c, "div"), h = Lingo.uiCache("sentLoad", c), f = Lingo.uiCache("sentInnerCntr", c, "div"), g = Lingo.uiCache("dictInfl", c, "span");
            h.style.display = "none";
            e.style.display = "block";
            this.InfCtrl.init(g, d.ROOT.INFS, b.getUiState(a).selectedInfl);
            this.SenCtrl.init(f, d.ROOT.SENTS, Lingo._settings.senOps)
        } else this.renderSentLoading(b, a, true)
    }, function () {
        this.renderSentLoading(b, a, true)
    })
}, upLog:function (b, a, e) {
    var c = null;
    if (b && b.getQuery())c = encodeURIComponent(b.getQuery());
    if (a)a = encodeURIComponent(a);
    var d = "q=" + c + "&t=log" + "&lm=" + e + a;
    this.serverAsyncReq(d, function () {
    })
}, renderPartialVPageDefMoreLess:function (a, b, d) {
    if (d)a.getUiState(b).maximizedDictArea = null; else a.getUiState(b).maximizedDictArea = Lingo.EDictAreas.def;
    if (a.getData(b).ROOT.DEF) {
        this.renderDefLoading(a, b);
        var c = a.getData(b).ROOT.DEFMORE;
        if (c) {
            if (d)c.$ON = false; else c.$ON = true;
            this.renderVPage(a)
        } else {
            var e = "q=" + encodeURIComponent(a.getQuery(b)) + "&t=" + a.type + "&ut=def";
            this.serverAsyncReq(e, function (c) {
                if (a.parseJsonToObj(c, b, "DEF", null, "DEFMORE")) {
                    a.getData(b).ROOT.DEFMORE.$ON = true;
                    this.renderVPage(a)
                } else this.renderDefLoading(a, b, true)
            }, function () {
                this.renderDefLoading(a, b, true)
            })
        }
    } else this.renderVPage(a)
}, deflateQuery:function (a) {
    if (a && a.length && a.length > 200) {
        if (!this._queryTable)this._queryTable = [];
        var b = JAM.Array.indexOf(this._queryTable, a);
        if (b == -1) {
            this._queryTable.push(a);
            b = this._queryTable.length - 1
        }
        return "_" + b
    }
    return a
}, inflateQuery:function (a) {
    var c = a;
    if (a && a.charAt && a.charAt(0) == "_")if (this._queryTable) {
        var b = parseInt(a.substr(1), 10);
        if (!isNaN(b)) {
            var d = this._queryTable[b];
            if (d)c = d
        }
    }
    return c
}, renderVPage:function (a) {
    try {
        if (a != this.TabCtrl.selectedTab.vPage)return;
        this.currentVPage = a;
        this.renderVPageStaticHtml(a);
        JAM.History.push(this.deflateQuery(a.queryStr), this.onBackFwdBtnClick, this, !this._settings.enableBrowserBackBtn);
        if (!a.fHasStaticContentOnly)if (a.hasFullData())this.renderVPageDynamics(a); else if (a.type === Lingo.EVPageTypes.dictComp) {
            if (!a.getData(1)) {
                var b = "q=" + encodeURIComponent(a.getQuery(1)) + "&t=" + a.type + "&ut=default";
                this.serverAsyncReq(b, function (b) {
                    if (a.getAncestorVP(1).parseJsonToObj(b) && !this.vpDataHasErrMsg(a.getData(1)))this.renderVPageDynamics(a, 1); else this.morphAndRenderErrPage(a.getQuery(), 9901)
                }, function (b) {
                    this.morphAndRenderErrPage(a.getQuery(), b)
                })
            } else if (!this.vpDataHasErrMsg(a))this.renderVPageDynamics(a, 1); else this.morphAndRenderErrPage(a.getQuery(), 8801);
            if (!a.getData(2)) {
                var b = "q=" + encodeURIComponent(a.getQuery(2)) + "&t=" + a.type + "&ut=default";
                this.serverAsyncReq(b, function (b) {
                    if (a.getAncestorVP(2).parseJsonToObj(b) && !this.vpDataHasErrMsg(a.getData(2)))this.renderVPageDynamics(a, 2); else this.morphAndRenderErrPage(a.getQuery(), 9902)
                }, function (b) {
                    this.morphAndRenderErrPage(a.getQuery(), b)
                })
            } else if (!this.vpDataHasErrMsg(a))this.renderVPageDynamics(a, 2); else this.morphAndRenderErrPage(a.getQuery(), 8802)
        } else {
            var b = "q=" + encodeURIComponent(a.queryStr) + "&t=" + a.type + "&ut=default";
            this.serverAsyncReq(b, function (b) {
                a.parseJsonToObj(b);
                this.renderVPageDynamics(a)
            }, function (b) {
                this.morphAndRenderErrPage(a.getQuery(), b)
            })
        }
    } catch (c) {
        var d = c.Message
    }
}, morphAndRenderErrPage:function (c, b) {
    var a = new this.VPage(this.EVPageTypes.err, c);
    a.errCode = b;
    this.currentVPage = a;
    this.renderVPageStaticHtml(a);
    this.renderVPageDynamics(a)
}, renderVPageStaticHtml:function (a) {
    this.displayMutexVpage(a);
    this.TabCtrl.show();
    this.ThesCtrl.clear();
    this.CollCtrl.clear();
    this.DymSideCtrl.clear();
    this.SenCtrl.clear();
    this.FdbckCtrl.clear();
    this.AlignMan.stopAnimation();
    document.title = Lingo._strTable.pageTitle;
    this.TabCtrl.hideTabList();
    this.TabCtrl.hideContextMenu();
    if (this.MainInputCtrl)this.MainInputCtrl.restore();
    this.HomePageCtrl.prepareTabbedView();
    switch (a.type) {
        case this.EVPageTypes.dict:
            this.renderDictMainAreaStatics(a, this.getDictMainEl(), a.getUiState());
            if (this.MainInputCtrl)this.MainInputCtrl.setText(a.getQuery(null, true), true);
            if (this.AcdCtrl)this.AcdCtrl.HideAll();
            break;
        case this.EVPageTypes.dictComp:
            this.renderDictMainAreaStatics(a, this.getDictMainEl(1), a.getUiState(1));
            this.renderDictMainAreaStatics(a, this.getDictMainEl(2), a.getUiState(2));
            if (this.MainInputCtrl)this.MainInputCtrl.setText(a.getQuery(null, true), true);
            break;
        case this.EVPageTypes.home:
            if (this.TabCtrl.tabCount() === 1) {
                this.TabCtrl.hide();
                this.HomePageCtrl.prepareFullView()
            }
            this.HomePageCtrl.render();
            if (this.MainInputCtrl)if (!(!this.MainInputCtrl.hasEverWaterMarked && this.MainInputCtrl.hasText())) {
                this.MainInputCtrl.tryWaterMark();
                this.MainInputCtrl.focus()
            }
            this.recalcLayout();
            break;
        case this.EVPageTypes.didYouMean:
            if (this.MainInputCtrl)this.MainInputCtrl.setText(a.getQuery(null, true), true);
            break;
        case this.EVPageTypes.err:
            if (this.MainInputCtrl)this.MainInputCtrl.setText(a.getQuery(null, true), true);
            break;
        default:
            this.currentVPage = null
    }
}, renderDictMainAreaStatics:function (x, a, v) {
    var b = Lingo.uiCache("dictarea", a, "div"), c = Lingo.uiCache("sentarea", a, "div"), r = Lingo.uiCache("sentLoad", a, "img"), n = Lingo.uiCache("dynsentdata", a, "div"), u = Lingo.uiCache("defLoad", a, "img"), o = Lingo.uiCache("dyndefdata", a, "div"), e = Lingo.uiCache("sentBarMaxBtn", a), f = Lingo.uiCache("defBarMaxBtn", a), p = Lingo.uiCache("defBarMic", a), m = Lingo.uiCache("defBarTitle", a, "span"), s = Lingo.uiCache("selCat", a, "select"), q = Lingo.uiCache("selDiff", a, "select"), t = Lingo.uiCache("selSrc", a, "select"), l = Lingo.uiCache("defBarProns", a, "span"), h = Lingo.uiCache("dictsubbar", a, "div"), d = Lingo.uiCache("defBarStemFyi", a, "span", true), g = Lingo.uiCache("chkAlign", a, "input", true), k = Lingo.uiCache("dl_cross", a, "input", true), w = Lingo.uiCache("dl_homo", a, "input", true), i = Lingo.uiCache("reportBad", a, "a", true), j = v.maximizedDictArea == Lingo.EDictAreas.sen;
    r.style.display = "none";
    n.style.display = "none";
    o.style.display = "none";
    u.style.display = j ? "none" : "block";
    h.style.visibility = "";
    h.style.marginBottom = "9px";
    m.innerHTML = "";
    if (d)d.innerHTML = "";
    c.style.display = "block";
    if (j) {
        c.style.height = "100%";
        b.style.display = "none";
        b.style.visibility = "hidden"
    } else {
        b.style.display = "block";
        b.style.visibility = "";
        b.style.height = "100%";
        c.style.display = "none"
    }
    if (i)i.style.display = "none";
    if (k)k.disabled = w.disabled = s.disabled = q.disabled = t.disabled = true;
    if (g)g.disabled = true;
    this.InfCtrl.clear();
    l.innerHTML = "";
    p.style.display = "none";
    e.style.display = "none";
    f.style.display = "none";
    e.className = this._strTable.maxBtnCls;
    f.className = this._strTable.maxBtnCls
}, renderDictSidePanelDynamics:function (b) {
    var c = null, d = null, e = null;
    if (b.ROOT) {
        c = b.ROOT.THES;
        d = b.ROOT.COLLS;
        e = b.ROOT.SUGGS
    }
    var a = this.AcdCtrl;
    if (a) {
        a.SetDefault();
        this.ThesCtrl.init(a.AcdPanel1, c);
        this.CollCtrl.init(a.AcdPanel2, d);
        this.DymSideCtrl.init(a.AcdPanel3, e)
    }
}, renderDictMainAreaDynamics:function (H, a, b, d, e, u) {
    var K = Lingo.uiCache("dynsentdata", a, "div"), L = Lingo.uiCache("sentInnerCntr", a, "div"), M = Lingo.uiCache("dictInfl", a, "span"), w = Lingo.uiCache("defInnerCntr", a, "div"), i = Lingo.uiCache("sentarea", a), C = Lingo.uiCache("sentLoad", a), B = Lingo.uiCache("dictarea", a), F = Lingo.uiCache("defLoad", a), y = Lingo.uiCache("dyndefdata", a), g = Lingo.uiCache("sentBarMaxBtn", a), l = Lingo.uiCache("defBarMaxBtn", a), J = Lingo.uiCache("defBarProns", a), p = Lingo.uiCache("defBarMic", a), o = Lingo.uiCache("defBarTitle", a), D = Lingo.uiCache("selCat", a), A = Lingo.uiCache("selDiff", a), E = Lingo.uiCache("selSrc", a), v = Lingo.uiCache("defBarStemFyi", a, "span", true), n = Lingo.uiCache("chkAlign", a, "input", true), q = Lingo.uiCache("reportBad", a, null, true), f = Lingo.uiCache("defLangViewBtns", a, "span", true), G = Lingo.uiCache("dl_cross", a, null, true), s = Lingo.uiCache("dl_homo", a, null, true);
    i.style.display = "block";
    g.style.display = "";
    l.style.display = "";
    var t = {};
    if (!b.ROOT)return;
    var c = "";
    if (b.ROOT.$INPUT)c = b.ROOT.$INPUT; else c = e;
    if (c) {
        c = c.split("<br/>").join(" ");
        c = JAM.String.shorten(unescape(c), 42);
        JAM.UI.setElText(o, c);
        o.alt = o.title = e;
        if (v && !b.ROOT.SMT && e.toLowerCase() != c.toLowerCase()) {
            if ("ZH-CN" != "EN-US")v.innerHTML = "[跳转自 " + e + "]";
            if (d.selectedInfl == null)d.selectedInfl = e
        }
    }
    if (G)G.disabled = s.disabled = D.disabled = A.disabled = E.disabled = false;
    if (q) {
        q.innerHTML = H.flagged ? Lingo._strTable.reportThxMsg : Lingo._strTable.reportMsg;
        q.style.display = "block"
    }
    if (n) {
        n.disabled = false;
        n.checked = Lingo._settings.senOps.alignQuery
    }
    var k = b.ROOT.DEF || b.ROOT.SMT, m = b.ROOT.SENTS && b.ROOT.SENTS.$TOTAL != "0";
    if (m && !k) {
        d.maximizedDictArea = Lingo.EDictAreas.sen;
        g.style.display = "none"
    }
    if (!m && !k) {
        C.style.display = "none";
        d.maximizedDictArea = Lingo.EDictAreas.sen;
        g.style.display = "none"
    }
    if (!m && k)i.style.display = "none";
    if (d.maximizedDictArea == Lingo.EDictAreas.def) {
        l.className = this._strTable.rstrBtnCls;
        i.style.display = "none";
        B.style.height = "100%"
    } else if (d.maximizedDictArea == Lingo.EDictAreas.sen) {
        g.className = this._strTable.rstrBtnCls;
        B.style.display = "none";
        i.style.height = "100%"
    }
    if (b.ROOT.SMT) {
        F.style.display = "none";
        y.style.display = "block";
        if (f)f.style.display = "none";
        var I = 160;
        this.SmtCtrl.init(w, b.ROOT.SMT, e);
        if (e.length >= I) {
            d.maximizedDictArea = Lingo.EDictAreas.def;
            l.style.display = "none"
        }
        var z = this.applyDictAreasSplit(a, u);
        t.dictPercent = z
    }
    C.style.display = "none";
    K.style.display = "block";
    this.SenCtrl.init(L, b.ROOT.SENTS, Lingo._settings.senOps);
    if (b.ROOT.SENTS) {
        JAM.Dom.optionByValue(D, b.ROOT.SENTS.$CAT).selected = true;
        JAM.Dom.optionByValue(A, b.ROOT.SENTS.$DIFF).selected = true;
        JAM.Dom.optionByValue(E, b.ROOT.SENTS.$SRC).selected = true
    }
    if (b.ROOT.DEF) {
        F.style.display = "none";
        y.style.display = "block";
        var r = null;
        if (b.ROOT.DEFMORE && b.ROOT.DEFMORE.$ON)r = b.ROOT.DEFMORE; else r = b.ROOT.DEF;
        this.DefCtrl.init(w, r, H.queryStr);
        var h = false;
        if (this.DefCtrl.onlyHasHomoDefs()) {
            this.showDefLangView("homo", a);
            h = true
        } else if (this.DefCtrl.onlyHasCrossDefs()) {
            this.showDefLangView("cross", a);
            h = true
        } else {
            var x = "cross";
            try {
                var j = JAM.Cookie.read("dfl");
                if (j == "cross" || j == "homo")x = j
            } catch (N) {
            }
            this.showDefLangView(x, a)
        }
        if (f)f.style.display = h ? "none" : "block";
        if (s)s.parentNode.lastChild.nodeValue = !h && b.ROOT.$LANG == "en" ? "英英" : "汉汉";
        var z = this.applyDictAreasSplit(a, u);
        t.dictPercent = z;
        this.InfCtrl.init(M, b.ROOT.INFS, d.selectedInfl)
    }
    if (b.ROOT.PROS)this.PronCtrl.init(J, b.ROOT.PROS);
    if (b.ROOT.AH)if (b.ROOT.$LANG == "en") {
        p.style.display = "block";
        p.title = "点击朗读";
        p.onmousedown = function () {
            Lingo.AudioCtrl.play(Lingo.AudioCtrl.getURL(b.ROOT.AH.$, 0))
        }
    }
    return t
}, applyDictAreasSplit:function (b, d, i) {
    var a = null;
    if (i && this.currentVPage.getUiState(this.getDictMainNum(b)).maximizedDictArea)return;
    if (d)a = d; else {
        var f = Lingo.uiCache("defInnerCntr", b), g;
        g = f.offsetHeight + JAM.UI.getElTop(f, b) + 18;
        var k = b.offsetHeight;
        a = this.calcDictAreaSplitPerc(g, k);
        if (a > 50)a = 50
    }
    var c = Lingo.uiCache("sentarea", b, "div"), h = Lingo.uiCache("dictarea", b, "div");
    if (c.style.display == "none")a = 100;
    var j = a + "%", e = 100 - a + "%";
    if (j != h.style.height)h.style.height = a + "%";
    if (e != c.style.height)c.style.height = e;
    return a
}, getDictMainNum:function (a) {
    if (a.className.indexOf(Lingo._strTable.dictMainBaseName) != -1) {
        if (a.className.lastIndexOf("1") != -1)return 1;
        if (a.className.lastIndexOf("2") != -1)return 2;
        return -1
    }
    return null
}, getDictMainClassName:function (a, b) {
    if (a.type == this.EVPageTypes.dict)return Lingo._strTable.dictMainBaseName;
    if (a.type == this.EVPageTypes.dictComp)return Lingo._strTable.dictMainBaseName + b
}, getDictMainEl:function (b) {
    var a = this._strTable.dictMainBaseName;
    if (b) {
        if (b == 1)a = a + "1";
        if (b == 2)a = a + "2"
    }
    return $Id(a)
}, getDictMainNumFromChildEl:function (c) {
    var a = c.parentNode;
    while (a != null && a != document) {
        var b = this.getDictMainNum(a);
        if (!b)a = a.parentNode; else return b !== -1 ? b : null
    }
    return null
}, vpDataIsDYM:function (e) {
    var a = e.ROOT, b = !a.DEF, c = !a.SENTS || a.SENTS && a.SENTS.$RET == "0", d = a.SUGGS;
    return b && c && d
}, vpDataIsSMT:function (a) {
    return a.ROOT && a.ROOT.SMT
}, vpDataHasErrMsg:function (a) {
    return a && a.ERR
}, renderVPageDynamics:function (a, b) {
    if (a !== this.currentVPage)return;
    try {
        if (a.type != this.EVPageTypes.err && this.vpDataHasErrMsg(a.getData())) {
            a.setVpType(this.EVPageTypes.err);
            this.renderVPage(a);
            return
        }
        switch (a.type) {
            case this.EVPageTypes.dict:
                if (this.vpDataIsDYM(a.getData())) {
                    a.setVpType(this.EVPageTypes.didYouMean);
                    this.renderVPage(a)
                } else {
                    this.renderDictMainAreaDynamics(a, this.getDictMainEl(), a.getData(), a.getUiState(), a.getQuery());
                    this.renderDictSidePanelDynamics(a.getData())
                }
                break;
            case this.EVPageTypes.dictComp:
                if (b)this.renderDictMainAreaDynamics(a, this.getDictMainEl(b), a.getData(b), a.getUiState(b), a.getQuery(b), 30); else {
                    var e = this.renderDictMainAreaDynamics(a, this.getDictMainEl(2), a.getData(2), a.getUiState(2), a.getQuery(2));
                    this.renderDictMainAreaDynamics(a, this.getDictMainEl(1), a.getData(1), a.getUiState(1), a.getQuery(1), e.dictPercent)
                }
                break;
            case this.EVPageTypes.didYouMean:
                this.DymCtrl.populate(a.getData().ROOT.SUGGS, a.queryStr);
                break;
            case this.EVPageTypes.err:
                var c = Lingo._strTable.defaultErrMsg;
                if (a.getData() && a.getData().ERR)c = a.getData().ERR.$;
                if (a.errCode)c += " (#" + a.errCode + ")";
                c += '<p><a href="http://www.msra.cn/Survey/Engkoo_ZH-CN.aspx?eid=' + a.errCode + '" target="_blank">反馈</a></p>';
                $Id("errMsg").innerHTML = c;
                $Id("errIcon").innerHTML = "<img src='img/info.gif'>";
                break;
            default:
                this.currentVPage = null
        }
        this.recalcLayout()
    } catch (d) {
        debugger;
        var f = d.Message
    }
}, restoreDictAreas:function (a) {
    var d = this.currentVPage, c = Lingo.uiCache("sentarea", a, "div"), b = Lingo.uiCache("dictarea", a, "div");
    b.style.display = "block";
    b.style.visibility = "";
    c.style.display = "block";
    c.style.visibility = "";
    d.getUiState(this.getDictMainNum(a)).maximizedDictArea = null;
    this.applyDictAreasSplit(a);
    this.recalcLayout()
}, maximizeSenArea:function (a) {
    var d = this.currentVPage, c = Lingo.uiCache("sentarea", a, "div"), b = Lingo.uiCache("dictarea", a, "div");
    b.style.display = "none";
    b.style.visibility = "hidden";
    c.style.height = "100%";
    d.getUiState(this.getDictMainNum(a)).maximizedDictArea = Lingo.EDictAreas.sen;
    this.recalcLayout()
}, calcDictAreaSplitPerc:function (b, a) {
    return Math.round(b / a * 100)
}, displayMutexVpage:function (f) {
    var c = $Id("vpagesCntr"), d = false, e = f.containerEl.id;
    for (var b = 0; b < c.childNodes.length; b++) {
        var a = c.childNodes[b];
        if (a.id)if (a.id == e) {
            a.style.display = "block";
            d = true
        } else a.style.display = "none"
    }
}, uiCache:function (d, a, h, g) {
    var b = null;
    if (a)b = a.className; else b = this.containerEl.id;
    var e = b + "." + d, c = this._uiCacheHashTable[e];
    if (!c) {
        var f = this.containerEl;
        if (a)f = a;
        c = this._uiCacheHashTable[e] = $Class(d, f, h, g)
    }
    return c
}, VPage:function (a, d, b, c, e) {
    this.queryStr = d;
    this.uiQueryStr = e;
    this.type = a;
    this.tabRef = null;
    this.ancestorTab1 = null;
    this.ancestorTab2 = null;
    this.mainData = null;
    this.containerEl = null;
    this.flagged = false;
    this.errCode = null;
    this.fHasStaticContentOnly = b;
    this.setVpType = function (c, a) {
        this.type = c;
        var b = this.type;
        if (a)b = a;
        this.containerEl = $Id("vpage_" + b)
    };
    this.uiState = {maximizedDictArea:null, selectedInfl:null, curSenPg:null};
    this.getUiState = function (a) {
        return this.getAncestorVP(a).uiState
    };
    this.getAncestorVP = function (a) {
        if (a == 1)return this.ancestorTab1.vPage; else if (a == 2)return this.ancestorTab2.vPage; else if (!a || a == -1)return this
    };
    this.getQuery = function (a, b) {
        if (b && this.getAncestorVP(a).uiQueryStr)return this.getAncestorVP(a).uiQueryStr;
        return this.getAncestorVP(a).queryStr
    };
    this.setQuery = function (b, a) {
        this.getAncestorVP(a).queryStr = b;
        this.getAncestorVP(a).uiQueryStr = b
    };
    this.getData = function (a) {
        return this.getAncestorVP(a).mainData
    };
    this.setData = function (b, a) {
        this.getAncestorVP(a).mainData = b
    };
    this.hasFullData = function () {
        if (this.type === Lingo.EVPageTypes.dictComp)return this.getData(1) && this.getData(2); else return !!this.getData()
    };
    this.parseJsonToObj = function (f, c, b, d, e) {
        var a = JAM.Json.parse(f);
        if (!a)return false;
        if (e)if (a.ROOT && a.ROOT[b])this.getData(c).ROOT[e] = a.ROOT[b]; else return false; else if (d)if (a.ROOT && a.ROOT[b])this.getData(c).ROOT[d] = a.ROOT[b]; else return false; else this.setData(a);
        return true
    };
    this.setVpType(a, c)
}, FdbckCtrl:{_fdbWinEl:null, _fdbField:null, init:function (a) {
    this._fdbWinEl = a;
    this._fdbField = $Class("fdbfield", a);
    var b = this;
    JAM.Effects.Drag.enable(this._fdbWinEl, {callBackThis:b, onDragStartCallBack:function () {
        JAM.UI.setElOpacity(this._fdbWinEl, 6)
    }, onDragStopCallBack:function () {
        JAM.UI.setElOpacity(this._fdbWinEl, 10)
    }})
}, mdownField:function () {
    if (JAM.Effects.Drag.isEnabled(this._fdbWinEl))JAM.Effects.Drag.disable(this._fdbWinEl)
}, mupField:function () {
    if (JAM.Effects.Drag.isDisabled(this._fdbWinEl))JAM.Effects.Drag.reEnable(this._fdbWinEl)
}, show:function () {
    this._fdbWinEl.style.display = "block";
    this._fdbField.focus()
}, clear:function () {
    this._fdbField.value = "";
    this._fdbWinEl.style.display = "none"
}, submit:function () {
    if (this._fdbField.value)Lingo.upLog(Lingo.currentVPage, JAM.String.sanitize(this._fdbField.value), Lingo.ELogCategory.entryFdbk);
    this.clear()
}}, MainInputCtrl:{hasEverWaterMarked:false, _mainInputCtrlEl:null, _suggCntrEl:null, _wtrMrkEl:null, _inputCntrEl:null, _regEx:new RegExp, _suggItems:[], _suggSelectedIndex:-1, _suggestionTimer:null, _lastReceivedSuggId:-1, _lastSentSuggId:-1, _multiLine:false, init:function (e, f, g, j, d, h) {
    e.className = "normalInputText";
    this._mainInputCtrlEl = e;
    this._suggCntrEl = g;
    this._wtrMrkEl = h;
    this._inputCntrEl = f;
    this._inputCntrEl.style.visibility = "";
    if (d) {
        var c = d.getElementsByTagName("A");
        for (var b = 0; b < c.length; b++) {
            var a = c[b];
            a.origHref = a.href;
            var i = this;
            a.onclick = function () {
                this.href = this.origHref + encodeURIComponent(i.getTextSanitized())
            }
        }
    }
}, setText:function (a, b) {
    this._fDontTrigPropChangeEvt = true;
    this.tryClearWaterMark(a);
    this._mainInputCtrlEl.value = a;
    if (b)this.select();
    this._mainInputCtrlEl.scrollTop = 0;
    this._fDontTrigPropChangeEvt = false
}, getTextSanitized:function () {
    return JAM.String.sanitize(unescape(this._mainInputCtrlEl.value), true)
}, hasText:function () {
    return this._mainInputCtrlEl.value.length > 0
}, select:function () {
    try {
        this._mainInputCtrlEl.select()
    } catch (a) {
    }
    return true
}, restore:function () {
    if (!this.isReady())return;
    this.hideSuggsUI();
    this.singleLine();
    this._mainInputCtrlEl.scrollTop = 0
}, onBlur:function () {
    if (!this.isReady())return;
    this.restore();
    this.tryWaterMark()
}, onFocus:function () {
    this.focus()
}, focus:function () {
    if (!this.isReady())return;
    if (this.isWaterMarked())try {
        this._mainInputCtrlEl.focus()
    } catch (a) {
    } else this.select()
}, isReady:function () {
    return !!(this._inputCntrEl && this._suggCntrEl && this._mainInputCtrlEl)
}, hideSuggsUI:function () {
    if (!this.isReady())return;
    this._suggCntrEl.style.display = "none";
    this._suggSelectedIndex = -1;
    if (this._suggestionTimer != null) {
        clearTimeout(this._suggestionTimer);
        this._suggestionTimer = null
    }
}, showSuggsUI:function () {
    if (!this.isReady() || this._multiLine)return;
    this._suggCntrEl.style.display = "block"
}, isSuggsUIVisible:function () {
    return !!(this.isReady() && this._suggCntrEl.style.display == "block")
}, onKeyDown:function (b) {
    Lingo.TabCtrl.hideTabTip(true);
    this.tryClearWaterMark();
    var a = window.event ? window.event.keyCode : b.which;
    if (!this._multiLine)if (a == 38) {
        this._selPrevSugg();
        return false
    } else if (a == 40) {
        if (!this.isSuggsUIVisible())this.runAutoComplete(); else this._selNextSugg();
        return false
    } else this._suggSelectedIndex = -1;
    if (a == 27) {
        this.setText("");
        this.restore();
        return false
    }
}, onKeyPress:function (a) {
    if (!this.isReady())return;
    var b = window.event ? window.event.keyCode : a.which;
    if (b == 13 && !a.shiftKey) {
        Lingo.onSearchBtnClick(a);
        return false
    }
}, fieldExpando:function () {
    var a = this;
    if (!a.isReady())return;
    if (a._triggerHeight == null)a._triggerHeight = JAM.UI.getElStyle(a._mainInputCtrlEl, "height", true) * 1.5;
    if (a._mainInputCtrlEl.scrollHeight >= a._triggerHeight)a.multiLine(); else a.singleLine()
}, multiLine:function () {
    if (!this._multiLine) {
        this._fDontTrigPropChangeEvt = true;
        this._multiLine = true;
        this._mainInputCtrlEl.scrollTop = 0;
        this.hideSuggsUI();
        var a = this._mainInputCtrlEl;
        a.className = "multiLineEx";
        a.parentNode.className = "shadow";
        this._fDontTrigPropChangeEvt = false
    }
}, singleLine:function () {
    if (this._multiLine) {
        this._fDontTrigPropChangeEvt = true;
        this._multiLine = false;
        var a = this._mainInputCtrlEl;
        a.className = "normalInputText";
        a.parentNode.className = "";
        this._fDontTrigPropChangeEvt = false
    }
}, onMouseDown:function () {
    this.tryClearWaterMark();
    this.fieldExpando()
}, tryClearWaterMark:function () {
    if (this.isWaterMarked())if (this._wtrMrkEl)this._wtrMrkEl.style.display = "none"
}, tryWaterMark:function () {
    if (!this.hasText()) {
        this.hasEverWaterMarked = true;
        if (this._wtrMrkEl)this._wtrMrkEl.style.display = ""
    }
}, isWaterMarked:function () {
    if (this._wtrMrkEl)return this._wtrMrkEl.style.display != "none";
    return false
}, onPropertyChange:function () {
    if (!this.isReady() || this._fDontTrigPropChangeEvt)return;
    this.fieldExpando();
    this.runAutoComplete()
}, runAutoComplete:function (b) {
    if (!this.isReady() || this._multiLine)return;
    if (!b)b = this.getTextSanitized();
    if (b.match(/\r\n/g))return;
    if (this._suggestionTimer != null) {
        clearTimeout(this._suggestionTimer);
        this._suggestionTimer = null
    }
    if (b.length == 0) {
        this.hideSuggsUI();
        return
    }
    var a = this;
    this._suggestionTimer = setTimeout(function () {
        if (b && b.length > 0) {
            var c = "q=" + encodeURIComponent(b) + "&t=sug&ut=" + ++a._lastSentSuggId;
            Lingo.serverAsyncReq(c, function (d) {
                if (!a._suggestionTimer)return;
                var b = JAM.Json.parse(d);
                a._suggItems = null;
                if (b && b.ACS && b.ACS.$ID) {
                    var c = parseInt(b.ACS.$ID, 10);
                    if (c > a._lastReceivedSuggId)if (b.ACS.AC) {
                        a._suggItems = b.ACS.AC;
                        a._renderSuggItems();
                        a._lastReceivedSuggId = c
                    } else a.hideSuggsUI()
                }
            })
        }
    }, 400)
}, _onSuggItemExec:function () {
    this._setSelSuggText();
    Lingo.onSearchBtnClick(null)
}, _selNextSugg:function () {
    if (!this._suggItems)return;
    this._renderSuggItems(this._suggSelectedIndex < this._suggItems.length ? this._suggSelectedIndex + 1 : 0);
    this._setSelSuggText()
}, _selPrevSugg:function () {
    if (!this._suggItems)return;
    this._renderSuggItems(this._suggSelectedIndex > 0 ? this._suggSelectedIndex - 1 : this._suggItems.length);
    this._setSelSuggText()
}, _setSelSuggText:function () {
    var a = null;
    if (this._suggSelectedIndex == 0 && this._suggItems && this._suggItems.length == undefined)a = this._suggItems.$; else if (this._suggItems.length > 0 && this._suggSelectedIndex >= 0 && this._suggSelectedIndex < this._suggItems.length)a = this._suggItems[this._suggSelectedIndex].$;
    if (a)this.setText(JAM.URL.decode(a.replace(/{#\*|\*\$}/g, "")))
}, _renderSuggItems:function (b) {
    if (!this._suggItems) {
        this._suggSelectedIndex = -1;
        this._suggCntrEl.innerHTML = "";
        this.hideSuggsUI();
        return
    }
    if (this.isSuggsUIVisible() && this._suggCntrEl.innerHTML && this._suggSelectedIndex == b)return;
    this.showSuggsUI();
    if (typeof b == "number")this._suggSelectedIndex = b;
    var c = [], d = JAM.Array.ensure(this._suggItems);
    for (var a = 0; a < d.length; a++) {
        var e = d[a];
        c[c.length] = this._getSuggItemHtml(e.$, a, a == b, e.$I)
    }
    this._suggCntrEl.innerHTML = c.join("")
}, _getSuggItemHtml:function (f, e, d, c) {
    var b = "suggItem";
    if (d)b = "suggItemSelected";
    var a = unescape(f).replace(/{#\*/g, "<span class='suggHlight " + b + "'>");
    a = a.replace(/\*\$}/g, "</span>");
    if (c)a = a + "<span class='suggDef " + b + "'>" + unescape(c) + "</span>";
    return "<div class='" + b + "' onmouseover=\"Lingo.MainInputCtrl._renderSuggItems(" + e + ")\" onmousedown='Lingo.MainInputCtrl._onSuggItemExec()'>&nbsp;" + a + "</div>"
}}, TopHatCtrl:{lang:{"ZH-CN":"简体中文", "EN-US":"English", "JA-JP":"日本語"}, init:function (d) {
    if (!d)return;
    var a = [];
    if (g_fIE)a[a.length] = "<a href=\"#\" onClick=\"try{var href=window.location.href; href = href.substr(0, href.lastIndexOf('/')); href+='/?ulang=ZH-CN&tlang=EN-US&FORM=EKFAV'; window.external.AddFavorite(href, document.title);}catch(err){};return false;\">书签</a> | ";
    var e = Lingo.Lang, j = "ZH-CN", i = e.ulang, h = e.tlang;
    a[a.length] = '<a href="./tools.aspx?ulang=ZH-CN&tlang=EN-US" target="_blank">工具</a> | ';
    a[a.length] = '<a href="./help.aspx?ulang=ZH-CN&tlang=EN-US" target="_blank">帮助</a> | ';
    var f = this.lang["EN-US"], b = "lngswtchr";
    a[a.length] = "<a id='" + b + "'>" + f + "</a>";
    d.innerHTML = a.join("");
    var c = $Id(b, true), g = this;
    if (c)c.onclick = function () {
        this.href = "./?ulang=EN-US&tlang=ZH-CN#" + encodeURIComponent(JAM.String.shorten(Lingo.currentVPage.getQuery(), 175, true))
    }
}}, AudioCtrl:{_audioPlayer:null, init:function (c) {
    var b = null, a = "__aplayer";
    try {
        if (window.navigator.platform != "Win64")b = "<object id='" + a + "' style='width: 0px; height: 0px' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='1' height='1' align='absmiddle'><param name='allowScriptAccess' value='sameDomain' /><param name='movie' value='player2.swf' /><param name='quality' value='high' /><embed src='player2.swf' quality='high' width='1' height='1' name='" + a + "' allowscriptaccess='sameDomain' type='application/x-shockwave-flash'/></object>"; else if (g_fIE)b = "<object id='" + a + "' width='0' height='0' style='position:absolute; left:0;top:0;'CLASSID='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6' type='application/x-oleobject'><PARAM NAME='AutoStart' VALUE='True'><PARAM name='uiMode' value='none'><PARAM name='PlayCount' value='1'></OBJECT>";
        c.innerHTML = b;
        this._audioPlayer = JAM.Dom.playerById(a)
    } catch (d) {
    }
}, getURL:function (a, b) {
    switch (b) {
        case 0:
            return Lingo.mediaServer + "en-us/" + a + ".mp3";
        case 1:
            return Lingo.mediaServer + "en-us/" + a + ".mp3";
            break;
        case 2:
            return Lingo.mediaServer + "zh-cn/" + a + ".mp3"
    }
    return ""
}, play:function (a) {
    var b = false;
    if (this._audioPlayer) {
        if (a == "")return;
        try {
            this._audioPlayer.SetVariable("hash", a);
            this._audioPlayer.GotoFrame(2);
            this._audioPlayer.GotoFrame(1);
            b = true
        } catch (d) {
            try {
                this._audioPlayer.Settings.PlayCount = 1;
                this._audioPlayer.URL = a;
                b = true
            } catch (c) {
            }
        }
    }
    if (!b)window.open(a)
}, getHtml:function (a, d, f) {
    if (!Lingo._settings.enableAV)return "";
    var c = "", b = "", e = this.getURL(a, d);
    if (d == 1) {
        b = "$Id('dl_" + a + "').style.display=''";
        c = "<span id='dl_" + a + "' style='display:none; font-size:10px'><a target='_blank' style='padding-left:5px' href='" + e + "'>下载MP3</a></span>"
    }
    var g = "<img class='aud' onmouseout=\"this.className='aud'\" onmouseover=\"this.className='aud_f'\" onclick=\"this.className='aud';Lingo.AudioCtrl.play('" + e + "');" + b + "\" style='" + f + "; cursor:pointer' title='点击朗读' src='img/clr.gif'/>" + c;
    return g
}}, ThesCtrl:{_acdPane:null, _THESObj:null, init:function (b, a) {
    this.clear();
    this._acdPane = b;
    this._THESObj = a;
    this.render()
}, clear:function () {
    if (this._acdPane)this._acdPane.RenderHtml("");
    this._THESObj = null
}, render:function () {
    var a = [];
    if (this._THESObj && this._THESObj.THE) {
        a[a.length] = "<ul>";
        var c = JAM.Array.ensure(this._THESObj.THE);
        for (var b = 0; b < c.length; b++) {
            a[a.length] = this._getInnerThesHtml(c[b]);
            if (b < c.length - 1)a[a.length] = "<br/>"
        }
        a[a.length] = "</ul>"
    } else this._acdPane.Hide();
    this._acdPane.RenderHtml(a.join(""))
}, _getInnerThesHtml:function (c) {
    var a = [], f = c.$POS;
    a[a.length] = "<span class='acdgrptitle'>" + f + ".</span><br/>";
    if (c.S) {
        var e = JAM.Array.ensure(c.S);
        for (var b = 0; b < e.length; b++)a[a.length] = "<li>" + Lingo.getInternalQueryHtml(unescape(e[b].$)) + "</li>"
    }
    if (c.A) {
        var d = JAM.Array.ensure(c.A);
        for (var b = 0; b < d.length; b++)a[a.length] = "<li>(反义词) " + Lingo.getInternalQueryHtml(unescape(d[b].$)) + "</li>"
    }
    return a.join("")
}}, CollCtrl:{_acdPane:null, _CollObj:null, init:function (b, a) {
    this.clear();
    this._acdPane = b;
    this._CollObj = a;
    this.render()
}, clear:function () {
    if (this._acdPane)this._acdPane.RenderHtml("");
    this._CollObj = null
}, render:function () {
    var a = [];
    if (this._CollObj && this._CollObj.CS) {
        a[a.length] = "<ul>";
        var c = JAM.Array.ensure(this._CollObj.CS);
        for (var b = 0; b < c.length; b++) {
            var d = c[b];
            a[a.length] = "<span class='acdgrptitle'>" + d.$REL + "</span><br/>";
            if (d.C) {
                var f = JAM.Array.ensure(d.C);
                for (var e = 0; e < f.length; e++) {
                    var g = f[e];
                    a[a.length] = "<li>" + Lingo.getInternalQueryHtml(unescape(g.$T1) + " " + unescape(g.$T2)) + "</li>"
                }
            }
            if (b < c.length - 1)a[a.length] = "<br/>"
        }
        a[a.length] = "</ul>"
    } else this._acdPane.Hide();
    this._acdPane.RenderHtml(a.join(""))
}}, DymSideCtrl:{_acdPane:null, _dymObj:null, init:function (b, a) {
    this.clear();
    this._acdPane = b;
    this._dymObj = a;
    this.render()
}, clear:function () {
    if (this._acdPane)this._acdPane.RenderHtml("");
    this._dymObj = null
}, render:function () {
    var a = [], b = this._dymObj;
    if (!b || !b.SP && !b.PY && !b.PH)this._acdPane.Hide(); else {
        a[a.length] = "<div style='width:auto;height:auto;margin-top:7px;padding-left:22px'>";
        if (b.PY) {
            if (b.PH || b.SP)a[a.length] = "<span class='acdgrptitle'>音转字</span><br/>";
            a[a.length] = this._getInnerDymSecHtml(b.PY) + "<br/>"
        }
        if (b.PH) {
            if (b.SP || b.PY)a[a.length] = "<span class='acdgrptitle'>音近词</span><br/>";
            a[a.length] = this._getInnerDymSecHtml(b.PH) + "<br/>"
        }
        if (b.SP) {
            if (b.PY || b.PH)a[a.length] = "<span class='acdgrptitle'>形近词</span><br/>";
            a[a.length] = this._getInnerDymSecHtml(b.SP)
        }
        a[a.length] = "</div>"
    }
    this._acdPane.RenderHtml(a.join(""))
}, _getInnerDymSecHtml:function (c) {
    var a = [];
    if (c) {
        var d = JAM.Array.ensure(c.I);
        for (var b = 0; b < d.length; b++)a[a.length] = this._getInnerDymItemHtml(d[b])
    }
    return a.join("")
}, _getInnerDymItemHtml:function (a) {
    var b = [], c = "";
    b[b.length] = "<p style='padding:2px 0px 2px 0px; margin:0'>" + (a.$AH ? Lingo.AudioCtrl.getHtml(a.$AH, 0, "margin-right:7px") : "") + Lingo.getInternalQueryHtml(unescape(a.$)) + "</p>";
    return b.join("")
}}, DymCtrl:{_liveLinkTempl:"<a href='http://cn.bing.com/search?FORM=ENKHL&q={Q}' target='_blank'>在线查找\"{Q}\"?</a>", _dymListEl:null, init:function (a) {
    this._dymListEl = a
}, populate:function (d, f) {
    this._dymListEl.innerHTML = "";
    var a = "<h1>您要找的是不是:</h1>", b = d.PH, c = d.SP, e = d.PY;
    if (e && e.I)a += "<h2 style='background-image:url(img/dympinyin.gif)'>音转字</h2>" + this.getSuggCompHtml(e.I);
    if (b && b.I)a += "<h2 style='background-image:url(img/dymph.png)'>音近词</h2>" + this.getSuggCompHtml(b.I);
    if (c && c.I)a += "<h2 style='background-image:url(img/dymspell.png)'>形近词</h2>" + this.getSuggCompHtml(c.I);
    a += "<h3 style='background-image:url(img/bing.png)'>" + this._liveLinkTempl.replace(/{Q}/g, f) + "</h3>";
    this._dymListEl.innerHTML = a
}, getSuggCompHtml:function (b) {
    var c = "";
    b = JAM.Array.ensure(b);
    for (var d = 0; d < b.length; d++) {
        var a = b[d];
        c = c + "<p>" + (a.$AH ? Lingo.AudioCtrl.getHtml(a.$AH, 0, "margin-right:5px") : "") + Lingo.getInternalQueryHtml(unescape(a.$)) + (a.$DEF ? "&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:gray'>" + unescape(a.$DEF) + "</span>" : "") + "</p>"
    }
    return c
}}, PronCtrl:{_prosCntrEl:null, _PROSObj:null, _proHashTable:null, init:function (a, b) {
    this._prosCntrEl = a;
    this._PROSObj = b;
    this._proHashTable = {};
    this.render()
}, render:function () {
    var a = "";
    if (this._PROSObj && this._PROSObj.PRO) {
        var c = JAM.Array.ensure(this._PROSObj.PRO);
        for (var b = 0; b < c.length; b++)a = a + this._getInnerProHtml(c[b])
    }
    this._prosCntrEl.innerHTML = a
}, _getInnerProHtml:function (b) {
    var d = unescape(b.$), a = b.$L;
    if (a == "PY")a = ""; else a += ": ";
    var c = "<span style='color:#4F6985; font-size:75%'>" + a + "</span>[" + d + "]&nbsp;&nbsp;";
    return c
}}, InfCtrl:{_inflCntrEl:null, _inflHashTable:null, _selInfl:null, _objInput:null, _noneMsg:"&nbsp;&nbsp;(无相关结果)", _inflPreHtml:"<span class='inflTxt'>词形变化</span>", init:function (b, a, c) {
    this._inflCntrEl = b;
    this._selInfl = c;
    this._objInput = a;
    this.clear();
    if (a)this.populateFromObj(a); else b.innerHTML = this._inflPreHtml + this._noneMsg
}, clear:function () {
    if (this._inflCntrEl)this._inflCntrEl.innerHTML = "";
    this._inflHashTable = {}
}, onInflClick:function (c, b) {
    var d = Lingo.currentVPage;
    b.style.backgroundColor = "#FEF0E2";
    b.style.border = "solid 1px #FBB777";
    var a = Lingo.getDictMainNumFromChildEl(b);
    d.getUiState(a).selectedInfl = c;
    d.getData(a).ROOT.SENTS.$OFFSET = 0;
    Lingo.renderPartialVPageSents(Lingo.currentVPage, a, unescape(c))
}, onInflXBtnClick:function (e, g) {
    var b = e.parentNode, a = Lingo.getDictMainNumFromChildEl(b);
    b.style.backgroundColor = "";
    b.style.border = "";
    e.style.display = "none";
    var c = Lingo.currentVPage;
    c.getUiState(a).selectedInfl = c.getData(a).ROOT.$INPUT;
    var d = c.getData(a);
    if (d.ROOT.SENTS) {
        var f = d.ROOT.SENTS;
        f.$OFFSET = 0
    }
    Lingo.renderPartialVPageSents(Lingo.currentVPage, a);
    JAM.Events.cancelEventBubble(g)
}, _inflLinkStrPrefix:'&nbsp;&nbsp;&nbsp;<a href="#', _inflLinkStrSelStyle:' style="text-decoration:none;color:#05569D;background-color:#FCCFA2;border:solid 1px #FF7C01;"', _inflLinkStrOnClickPre:" onclick=\"Lingo.InfCtrl.onInflClick('", _inflLinkStrOnClickPost:"', this); return false;\">", _inflXBtn:'&nbsp;<span style="background-color:#F0F5FA; border-left:solid 1px #FF7C01; color:black;" onclick="Lingo.InfCtrl.onInflXBtnClick(this, event);">&nbsp;x&nbsp;</span>', _inflLinkStrPostFix:"</a>", _strmap:{adj:"形容词", cp:"比较级", pp:"过去分词", pt:"过去时", pat:"过去式", pl:"复数", prp:"现在分词", "3pps":"第三人称单数现在时", prt:"第三人称单数现在时", s:"单数", sp:"最高级"}, populateFromObj:function (e) {
    var a = "", i = 6, g = 0, f = Lingo.getDictMainNumFromChildEl(this._inflCntrEl), h = Lingo.currentVPage.getData(f).ROOT.$INPUT.toLowerCase();
    if (e && e.INF) {
        var d = JAM.Array.ensure(e.INF);
        for (var c = 0; c < d.length; c++) {
            var b = d[c]["I-E"].$;
            if (!this._inflHashTable[b]) {
                if (b == h)continue;
                if (g++ >= i)break;
                this._inflHashTable[b] = true;
                a = a + this.htmlizeInfl(b, f, this._strmap[d[c].$T])
            }
        }
    }
    if (a == "")a = this._noneMsg;
    this._inflCntrEl.innerHTML = this._inflPreHtml + a
}, htmlizeInfl:function (b, e, f) {
    var d = "", c = "", a = "";
    if (b == Lingo.currentVPage.getUiState(e).selectedInfl) {
        d = this._inflLinkStrSelStyle;
        c = this._inflXBtn;
        a = f;
        if (a && a.length > 0)a += ": "; else a = ""
    }
    return this._inflLinkStrPrefix + b + '"' + d + this._inflLinkStrOnClickPre + b.replace(/\'/ig, "\\'") + this._inflLinkStrOnClickPost + a + unescape(b) + c + this._inflLinkStrPostFix
}}, SmtCtrl:{init:function (i, b, g) {
    var j = b.Q.$, f = b.R.$, c = 160, a = true;
    if (a)a = g.length <= c;
    var k = Lingo.AlignMan.getBiPairHtml(f, j, null, null, null, null, null, b.$WA, 1, {alignQuery:a, alignOnHover:a, fShowAsPlainList:true}), l = '<img src="img/gears.png" width="38px" height="39px" />', h = "<span style='font-size:10pt; font-weight:normal; color:#DD7207'>计算机翻译:</span><br/><div style='border-top:dotted 1px silver; height:auto'>" + k + "</div>", d = "<div class='defGroup'><div class='defPos'>{POS}</div><div class='defCnt' style='padding-left:16px'>{DEF}</div></div>", e = d.replace("{POS}", l).replace("{DEF}", h);
    i.innerHTML = e
}}, DefCtrl:{_defGroupHtmlTempl:"<div class='defGroup'><div class='defPos'>{POS}</div><div class='defCnt'>{DEF}</div></div>", _defIndivHtmlTempl:"<span style='font-size:10pt; color:#898AAF'>{NUM}.&nbsp;</span>&nbsp;{TXT}<br/>", _state:null, init:function (a, c, b) {
    this._state = a._DefCtrlState = {};
    this._state._defCntrEl = a;
    this._state._objDefs = c;
    this._state._userQueryStr = unescape(b)
}, onlyHasHomoDefs:function () {
    var a = this._state._objDefs[0], b = this._state._objDefs[1];
    return a && !a.SENS && !!(b && b.SENS)
}, onlyHasCrossDefs:function () {
    var a = this._state._objDefs[0], b = this._state._objDefs[1];
    return a && a.SENS && (b && !b.SENS)
}, populateFromObj:function (e) {
    var b = [], a = null;
    if (e === "cross")a = this._state._objDefs[0]; else if (e === "homo")a = this._state._objDefs[1];
    if (!a)a = this._state._objDefs;
    if (a && a.SENS) {
        var d = JAM.Array.ensure(a.SENS);
        for (var c = 0; c < d.length; c++)b[b.length] = this._htmlizeSenseGroupObj(d[c])
    } else b[b.length] = "&nbsp;&nbsp;<span style='color:gray; font-size:10pt'>无相关结果</span>";
    this._state._defCntrEl.innerHTML = b.join("")
}, _htmlizeWebMinedDefUrl:function (a) {
    var b = JAM.String.shorten(a, 70);
    return "<br/><a class='sent_src' style='padding-left:22px;' target='_blank' href='" + a + "'>" + b + "</a>"
}, _htmlizeDefSents:function (c, b) {
    var a = "<span class='sent_en'>" + Lingo.getInternalQueryHtmlForEmbeddedEngWords(unescape(c)) + "</span><br/><span class='sent_cn'>" + unescape(b) + "</span>";
    return " <span><img src='img/v2plus.png' onclick='Lingo.DefCtrl.onToggleDefSen(this)' width='9px;' height='9px;' style='margin-bottom:2px; cursor:pointer' /><ul style='display:none;'><li>" + a + "</li></ul></span>"
}, _htmlizeSenseGroupObj:function (e) {
    var d = "", g = false, c = "", b = JAM.Array.ensure(e.SEN);
    for (var a = 0; a < b.length; a++) {
        c = unescape(b[a].D.$);
        c = Lingo.getInternalQueryHtmlForEmbeddedEngWords(c);
        if (b[a].$URL) {
            g = true;
            c = c + this._htmlizeWebMinedDefUrl(b[a].$URL)
        }
        if (b[a].STS && b[a].STS.ST && b[a].STS.ST.E && b[a].STS.ST.C)c = c + this._htmlizeDefSents(b[a].STS.ST.E.$, b[a].STS.ST.C.$);
        d = d + this._defIndivHtmlTempl.replace("{NUM}", a + 1).replace("{TXT}", c)
    }
    var f = "<span style='cursor:help' title='未知'>na.</span>";
    if (e.$POS !== "un")f = e.$POS + ".";
    if (g) {
        f = '<img src="img/v2globe.png" width="15px" height="15px" />';
        d = "<span style='font-size:10pt; font-weight:normal; color:#DD7207'>网络释义:</span><br/><div style='border-top:dotted 1px silver; height:auto'>" + d + "</div>"
    }
    return senseGroupHtml = this._defGroupHtmlTempl.replace("{POS}", f).replace("{DEF}", d)
}, renderLang:function (b, a) {
    this._state = b._DefCtrlState;
    this.populateFromObj(a)
}, onToggleDefSen:function (a) {
    var c = "img/v2plus.png", e = "img/v2minus.png", b = a.parentNode.getElementsByTagName("ul")[0];
    if (a.src.indexOf(c) != -1) {
        a.src = e;
        if (b)b.style.display = "block"
    } else {
        a.src = c;
        if (b)b.style.display = "none"
    }
    var d = Lingo.getDictMainEl(Lingo.getDictMainNumFromChildEl(a));
    Lingo.applyDictAreasSplit(d, null, true);
    Lingo.recalcLayout()
}}, SenCtrl:{_state:null, init:function (b, c, a) {
    this._state = b._SenCtrlState = {};
    this._state._renderEl = b;
    this.populateFromObj(c, a);
    if (a && a.fAnimate)Lingo.AlignMan.animate()
}, clear:function () {
    if (this._state && this._state._renderEl)this._state._renderEl.innerHTML = ""
}, populateFromObj:function (d, f) {
    var a = [], i = f && f.fShowAsPlainList;
    if (d && d.SEN) {
        var k = parseInt(d.$OFFSET, 10) + 1, g = f.maxPerPage;
        a[a.length] = !i ? "<ol start='" + k + "'>" : "";
        var j = JAM.Array.ensure(d.SEN);
        for (var c = 0; c < j.length; c++) {
            var b = j[c], m = b.PY && b.PY.D ? b.PY.D.$ : null;
            a[a.length] = Lingo.AlignMan.getBiPairHtml(b.EN.D.$, b.CN.D.$, m, b.EN.S.$, b.CN.S.$, b.CN.P ? b.CN.P.$ : null, b.EN.P.$, parseInt(b.$WA, 10), c + 1, f, b.EN.KTV)
        }
        a[a.length] = !i ? "</ol>" : "";
        var e = Math.floor(k / g), l = parseInt(d.$TOTAL, g), h = Math.min(Math.ceil(l / g), f.maxPages);
        if (h > 1) {
            a[a.length] = "<div class='senPgrCntr'><ul>";
            if (e > 0)a[a.length] = "<li><a href='#' onclick='Lingo.onSenPg(" + (e - 1) + ",this);return false'>上一页</a></li>";
            for (var c = 0; c < h; c++)a[a.length] = "<li><a href='#' class='" + (e == c ? "senSelPg" : "") + "' onclick='Lingo.onSenPg(" + c + ",this);return false'>" + (c + 1) + "</a></li>";
            if (e < h - 1)a[a.length] = "<li><a href='#' onclick='Lingo.onSenPg(" + (e + 1) + ",this);return false'>下一页</a></li>";
            a[a.length] = "</ul></div>"
        }
    } else a[a.length] = "<span class='sentNone'>无相关结果</span>";
    this._state._renderEl.innerHTML = a.join("")
}}, AlignMan:{_animeIntervalID:null, _alignTagsToAnimateList:null, _lastAnimeAlignTag:null, _animeSpeedMs:350, _qHlStartTag:"{#*", _qHlEndTag:"*$}", _xQHlStartTag:"{##*", _xQHlEndTag:"*$$}", _hlStartRplcHtml:"<span class='hlight'>", _hlEndReplcHtml:"</span>", getBiPairHtml:function (d, e, b, n, B, u, s, x, A, m, y) {
    var g = null, k = null, q = null, l = null;
    if (m) {
        g = m.alignQuery;
        k = m.alignOnHover;
        q = m.fShowAsPlainList;
        l = m.fAnimate
    }
    var a = JAM.String.replace, r = this._qHlStartTag, t = this._qHlEndTag, o = this._xQHlStartTag, p = this._xQHlEndTag, h = this._hlStartRplcHtml, i = this._hlEndReplcHtml;
    if (!g && !k)d = Lingo.getInternalQueryHtmlForEmbeddedEngWords(d);
    d = a(d, r, h);
    d = a(d, t, i);
    e = a(e, r, h);
    e = a(e, t, i);
    if (b) {
        b = a(b, r, h);
        b = a(b, t, i)
    }
    d = a(d, o, g ? h : "");
    d = a(d, p, g ? i : "");
    e = a(e, o, g ? h : "");
    e = a(e, p, g ? i : "");
    if (b) {
        b = a(b, o, g ? h : "");
        b = a(b, p, g ? i : "")
    }
    if (l)this._alignTagsToAnimateList = [];
    var z = d.length, j;
    for (var f = 1; f <= x; f++) {
        j = z + "-" + f + "-" + A;
        d = a(d, "{" + f + "#", this._getWdAlignStartTag(j, k));
        d = a(d, "$" + f + "}", "</span>");
        e = a(e, "{" + f + "#", this._getWdAlignStartTag(j, k, l));
        e = a(e, "$" + f + "}", "</span>");
        if (b) {
            b = a(b, "{" + f + "#", this._getWdAlignStartTag(j, k, l, true));
            b = a(b, "$" + f + "}", "</span>")
        }
        if (l)this._alignTagsToAnimateList[this._alignTagsToAnimateList.length] = j
    }
    var w = Lingo.AudioCtrl, c = [];
    c[c.length] = !q ? "<li class='sentPair'>" : "";
    c[c.length] = "<span class='sent_en'>" + unescape(d) + "</span>";
    if (s)c[c.length] = w.getHtml(s, 1, "margin-left:3px");
    if (y)if (window.navigator.platform != "Win64")c[c.length] = Lingo.ThCtrl.getHtml(s, "margin-left:3px");
    var v = "";
    if (u)v = w.getHtml(u, 2, "margin-left:3px");
    c[c.length] = "<br/><span class='sent_cn'>" + unescape(e) + "</span>" + v + "<br/>";
    if (b)c[c.length] = "<span class='sent_py'>" + unescape(b) + "<br/></span>";
    if (n) {
        n = unescape(n);
        c[c.length] = "<a class='sent_src' target='_blank' href='" + n + "'>" + JAM.String.shorten(n, 74) + "</a>"
    }
    c[c.length] = !q ? "</li>" : "";
    return c.join("")
}, animate:function () {
    if (!this._alignTagsToAnimateList)return;
    if (this._animeIntervalID)this.stopAnimation();
    var b = 0, a = this;
    this._animeIntervalID = setInterval(function () {
        var c = null;
        try {
            if (b < a._alignTagsToAnimateList.length) {
                c = a._alignTagsToAnimateList[b++];
                if (!a.alignWords(c, true, true)) {
                    a.stopAnimation();
                    return
                }
                if (a._lastAnimeAlignTag)a.alignWords(a._lastAnimeAlignTag, false);
                a._lastAnimeAlignTag = c
            } else if (b == a._alignTagsToAnimateList.length)a.stopAnimation()
        } catch (d) {
            a.stopAnimation()
        }
    }, this._animeSpeedMs)
}, stopAnimation:function () {
    if (this._lastAnimeAlignTag) {
        this.alignWords(this._lastAnimeAlignTag, false, true);
        this._lastAnimeAlignTag = null
    }
    if (this._animeIntervalID) {
        clearInterval(this._animeIntervalID);
        this._animeIntervalID = this._alignTagsToAnimateList = this._lastAnimeAlignTag = null
    }
}, _getWdAlignStartTag:function (d, e, f, g) {
    if (!e)return "<span style='cursor:text'>";
    var c = "", a = "";
    if (f) {
        c = "<i class='sprite_pointer' style='position:absolute;left:3px;top:15px;visibility:hidden'></i>";
        a = "position:relative"
    }
    var b = "";
    if (g)b = "data-nclk=1";
    var h = '<span class="' + d + "\" style='" + a + '\' onmouseover="Lingo.AlignMan.alignWords(this, 1, 1, 1);"' + b + ">" + c;
    return h
}, alignWords:function (c, k, h, j) {
    if (j)this.stopAnimation();
    var i = c.className ? c.className : c, b = Lingo.currentVPage.containerEl;
    if (c.className) {
        b = c;
        while (b.tagName != "LI" && b.tagName != "DIV" && b != document)b = b.parentNode
    }
    var e = JAM.Dom.elArrayByClass(i, b, "span", h);
    if (!e || e.length < 1)return false;
    for (var g = 0; g < e.length; g++) {
        var a = e[g];
        if (!a.onmouseout)a.onmouseout = function () {
            Lingo.AlignMan.alignWords(this, 0, 1);
            return false
        };
        if (!a.getAttribute("data-nclk")) {
            if (!a.onclick)a.onclick = function () {
                Lingo.processQuery(JAM.UI.getElText(this));
                return false
            };
            if (!a.title)a.title = "点击获取释义"
        }
        var f = a.getElementsByTagName("i"), d = null;
        if (f && f[0])d = f[0];
        if (k) {
            a.style.color = "white";
            a.style.backgroundColor = "#00b5f0";
            if (d && this._animeIntervalID)d.style.visibility = ""
        } else {
            a.style.backgroundColor = "";
            a.style.color = "";
            if (d)d.style.visibility = "hidden"
        }
    }
    return true
}}, HomePageCtrl:{_logoEl:null, _mainInputCntrEl:null, _suggFrameEl:null, _suggCntrEl:null, _homeMainCntrEl:null, _fSmallView:null, init:function (d, c, b, a) {
    this._homeMainCntrEl = d;
    this._fCenterHomepageWhenTabless = c;
    if (b) {
        b.style.visibility = "";
        this._logoEl = b
    }
    if (a) {
        this._mainInputCntrEl = a._inputCntrEl;
        this._suggFrameEl = a._suggFrame;
        this._suggCntrEl = a._suggCntrEl
    }
}, prepareTabbedView:function () {
    if (this._fCenterHomepageWhenTabless) {
        this._homeMainCntrEl.style.paddingTop = "20px";
        if (this._logoEl) {
            this._logoEl.style.top = "12px";
            this._logoEl.style.left = "18px";
            this._logoEl.className = "sprite_logoserp"
        }
        if (this._mainInputCntrEl) {
            this._mainInputCntrEl.className = "mainInputCntrTabView";
            this._suggCntrEl.className = "shadow suggInTabView";
            if (this._suggFrameEl)this._suggFrameEl.className = "suggInTabView"
        }
    }
}, prepareFullView:function () {
    if (this._fCenterHomepageWhenTabless) {
        this._homeMainCntrEl.style.paddingTop = "124px";
        if (this._logoEl) {
            this._logoEl.style.top = "77px";
            this._logoEl.style.left = "366px";
            this._logoEl.className = "sprite_logohp"
        }
        if (this._mainInputCntrEl) {
            this._mainInputCntrEl.className = "mainInputCntrHpView";
            this._suggCntrEl.className = "shadow suggInHpView";
            if (this._suggFrameEl)this._suggFrameEl.className = "suggInHpView"
        }
    }
}, nextPic:function () {
    var a = g_hpData.hp;
    if (a.album.selectedIndex < a.album.pic.length - 1)a.album.selectedIndex++; else a.album.selectedIndex = 0;
    this.renderAlbum()
}, prevPic:function () {
    var a = g_hpData.hp;
    if (a.album.selectedIndex > 0) {
        a.album.selectedIndex--;
        this.renderAlbum()
    }
}, renderAlbum:function () {
    var b = g_hpData.hp, a = $Id("homeAlbumPicArea");
    a.onclick = null;
    a.style.cursor = "";
    a.title = "";
    if (!b.album.selectedIndex)b.album.selectedIndex = 0;
    var f = b.album.pic, e = "";
    if (b.album.selectedIndex > 0)e = "<a title='上一张' href='#' onmousedown='Lingo.HomePageCtrl.prevPic(); return false'>«</a>";
    var h = "<a title='下一张' href='#' onmousedown='Lingo.HomePageCtrl.nextPic(); return false'>»</a>", i = this;
    a.onclick = function () {
        i.nextPic()
    };
    a.style.cursor = "pointer";
    a.title = "下一张";
    $Id("homeAlbumChooser").innerHTML = "<span style='line-height:20px'>" + e + "&nbsp;" + "<span style='font-size:12px'>" + (b.album.selectedIndex + 1) + "/" + f.length + "</span>" + "&nbsp;" + h + "</span>";
    var d = f[b.album.selectedIndex];
    $Id("homeAlbumInfoArea").innerHTML = Lingo.getInternalQueryHtml(d.lg1.$) + "&nbsp;" + Lingo.AudioCtrl.getHtml(d.lg1audioc.$, 0) + "<br/>" + "<span style='color:gray'>" + d.lg2.$ + "</span>";
    a.style.backgroundImage = "url(img/load.gif)";
    var g = new Image, c = d.picUrl.$;
    if (c.substr(0, 1) == "/")c = c.substring(1);
    g.onload = function () {
        a.style.backgroundImage = "url(" + c + ")"
    };
    g.src = c
}, render:function () {
    if (!g_hpData)return;
    var a = g_hpData.hp;
    if (a.added) {
        var j = a.added.w, g = "";
        for (var c = 0; c < j.length; c++)g += "<p>" + Lingo.getInternalQueryHtml(j[c].$) + "</p>";
        $Id("homeAddedWds").innerHTML = g
    }
    if (a.album)this.renderAlbum();
    var i = $Id("homeTips", true);
    if (i && a.tips) {
        var m = "", p = a.tips.tip;
        for (var c = 0; c < p.length; c++) {
            var d = p[c], o = "";
            if (d.more.url.$.indexOf(".htm") != -1 || d.more.url.$.indexOf(".aspx") != -1 || d.more.url.$.indexOf(".mspx") != -1)o = "target='_blank'";
            m += "<h2><a style='font-size:14px; font-weight:bolder' target='_blank' href='" + d.title.url.$ + "'>" + d.title.value.$ + "</a></h2>" + "<p>" + d.description.$ + " <a " + o + " href='" + d.more.url.$ + "'>" + d.more.value.$ + "</a></p>"
        }
        i.innerHTML = m
    }
    if (a.wd) {
        var l = a.wd.word.$, e = "<span style='padding-left:5px'>" + Lingo.getInternalQueryHtml(l) + "</span>";
        if (a.wd.audioc)e += Lingo.AudioCtrl.getHtml(a.wd.audioc.$, 0, "margin-left:4px");
        $Id("homeWordTitle").innerHTML = e;
        $Id("tinyInputField").value = a.wd.compareTo.$ + " vs " + l
    }
    var f = $Id("homeFriends", true);
    if (f && a.pals) {
        var h = "", n = a.pals.link;
        for (var c = 0; c < n.length; c++) {
            var k = n[c];
            h += "<p><a target='_blank' href='http://" + k.url.$ + "'>" + k.value.$ + "</a></p>"
        }
        f.innerHTML = h
    }
    if (a.sen) {
        var b = JAM.Json.parse(a.sen.json.$), r = b.PY && b.PY.D ? b.PY.D.$ : null, q = Lingo.AlignMan.getBiPairHtml(b.EN.D.$, b.CN.D.$, r, b.EN.S.$, b.CN.S.$, b.CN.P ? b.CN.P.$ : null, b.EN.P.$, parseInt(b.$WA, 10), 1, {alignQuery:true, alignOnHover:true, fShowAsPlainList:true, fAnimate:true}, true);
        $Id("homeSent").innerHTML = q;
        Lingo.AlignMan.animate()
    }
}}, TabCtrl:{_uiTabsDivEl:null, _uiTabsCntrDiv:null, _uiContextMenuEl:null, _uiSelectedDivEl:null, _uiTabTipDivEl:null, _uiTabListDivEl:null, _uiTabXBtnSrc:"img/clr.gif", _uiTabCombBreakBtnSrc:"img/break.gif", _uiOTabInnerHtml:"<i class='oTabImgTl sprite_v2otabtl'></i><i class='oTabImgTr sprite_v2otabtr'></i><span class='oTabContTxt'></span>", _uiHTabInnerHtml:"<i class='hTabImgTl sprite_v2mtabtl'></i><i class='hTabImgTr sprite_v2mtabtr'></i><span class='hTabContTxt'></span><img src='img/clr.gif' class='hTabXbtn sprite_v2mtabx' />", _tabs:[], selectedTab:null, _options:null, init:function (b, c, d, f, e, a) {
    this._uiTabsDivEl = $Class("tabs", b, "div");
    this._uiTabsCntrDiv = b;
    this._uiContextMenuEl = c;
    this._uiSelectedDivEl = d;
    this._uiTabListDivEl = f;
    this._uiTabTipDivEl = e;
    if (!a)a = {};
    a.maxTabChars = 12;
    this._options = a
}, tabCount:function () {
    return this._tabs.length
}, hideContextMenu:function () {
    if (this._uiContextMenuEl)this._uiContextMenuEl.style.visibility = "hidden"
}, hideTabTip:function (a) {
    if (this._uiTabTipDivEl && this._uiTabTipDivEl.style.visibility != "hidden") {
        this._uiTabTipDivEl.style.visibility = "hidden";
        if (a)this._fAlreadyShowedTabTip = true
    }
}, hideTabList:function () {
    if (this._uiTabListDivEl)this._uiTabListDivEl.style.visibility = "hidden"
}, hide:function () {
    if (this._uiTabsCntrDiv && this._uiSelectedDivEl)this._uiTabsCntrDiv.style.visibility = this._uiSelectedDivEl.style.visibility = "hidden";
    if (this.selectedTab && this.selectedTab.uiTabDivEl)this.selectedTab.uiTabDivEl.style.display = "none";
    this.hideTabTip();
    this.hideContextMenu()
}, show:function () {
    this._uiTabsCntrDiv.style.visibility = this._uiSelectedDivEl.style.visibility = "visible";
    if (this.selectedTab && this.selectedTab.uiTabDivEl)this.selectedTab.uiTabDivEl.style.display = "block"
}, showTabList:function (d) {
    var a = "";
    a = "<div class='cxmenuitem'>" + Lingo.getInternalQueryHtml(Lingo._strTable.navHome, "font-weight:bold; color:#FF7200", "首页") + "</div>";
    for (var c = 0; c < this._tabs.length; c++) {
        var b = this._tabs[c];
        if (b.vPage.type === Lingo.EVPageTypes.home)continue;
        if (this.fTabVisible(b))continue;
        a = a + "<div class='cxmenuitem'>" + Lingo.getInternalQueryHtml(b.fullTitle) + "</div>"
    }
    a = a + "";
    this._uiTabListDivEl.innerHTML = a;
    this._uiTabListDivEl.style.visibility = "visible";
    JAM.Events.cancelEventBubble(d)
}, _fAlreadyShowedTabTip:false, _tabsToRenderArray:[], tabToDisplayCompareTipOn:null, renderTabs:function (e) {
    this._uiTabsDivEl.innerHTML = "";
    var f = 11, k = JAM.UI.getElTop(this._uiTabsDivEl) + "px", m = this._uiTabsCntrDiv.offsetWidth - f, c = 0, d = 0;
    this.tabToDisplayCompareTipOn = null;
    this._tabsToRenderArray = [];
    var i = 0;
    for (var g = this._tabs.length - 1; g >= 0; g--) {
        var a = this._tabs[g], b = null;
        if (this.selectedTab === a)b = this._uiSelectedDivEl; else {
            var o = document.createElement("div");
            b = this._uiTabsDivEl.appendChild(o)
        }
        b.style.visibility = "hidden";
        a.renderSelf(b);
        var j = a.uiTabDivEl.offsetWidth;
        i += j;
        var n = i;
        if (n > m)break;
        this._tabsToRenderArray.unshift(a)
    }
    if (!this.fTabVisible(this.selectedTab) && this._tabs.length > 0) {
        this.cutTab(this.selectedTab);
        this.pasteTab(this.selectedTab, this._tabs.length);
        this.renderTabs(e);
        return
    }
    c = 0;
    for (var h = 0; h < this._tabsToRenderArray.length; h++) {
        var a = this._tabsToRenderArray[h], b = a.uiTabDivEl;
        b.style.visibility = "visible";
        c++;
        if (a.vPage.type == Lingo.EVPageTypes.dict) {
            d++;
            if (d == 2)this.tabToDisplayCompareTipOn = a
        }
        var j = a.uiTabDivEl.offsetWidth;
        a.uiTabDivEl.style.left = f + "px";
        f += j;
        if (this.selectedTab === a)a.uiTabDivEl.style.top = k
    }
    if (this._uiTabTipDivEl)if (this.tabToDisplayCompareTipOn && d == 2 && !this._fAlreadyShowedTabTip && this.selectedTab === this.tabToDisplayCompareTipOn)this.uiRenderToolTip("拖拽到另一个标签上进行单词对比！", JAM.UI.getElStyle(this.tabToDisplayCompareTipOn.uiTabDivEl, "left", true) - 15, parseInt(k, 10) - this.tabToDisplayCompareTipOn.uiTabDivEl.offsetHeight + 2); else {
        this.hideTabTip();
        if (d > 2)this._fAlreadyShowedTabTip = true
    }
    var l = "hidden";
    if (this._tabs.length > this._tabsToRenderArray.length)l = "visible";
    $Id("tabMoreBtn").style.visibility = l;
    if (c > 0 && this.selectedTab) {
        if (this._options.onRenderSingleTab && !e)this._options.onRenderSingleTab.apply(this._options.callBackThis, [this.selectedTab])
    } else if (c === 0)if (this._options.onRenderNoTabs && !e)this._options.onRenderNoTabs.apply(this._options.callBackThis, [])
}, closeCurrTab:function () {
    this.selectedTab.uiClickXBtnHndlr()
}, closeOtherTabs:function () {
    tabsPendingRemoval = [];
    for (var a = 0; a < this._tabs.length; a++) {
        var c = this._tabs[a];
        if (c !== this.selectedTab)tabsPendingRemoval.push(c)
    }
    for (var b = 0; b < tabsPendingRemoval.length; b++)this.removeTab(tabsPendingRemoval[b]);
    this.renderTabs()
}, fTabVisible:function (a) {
    var c = false;
    for (var b = 0; b < this._tabsToRenderArray.length; b++)if (this._tabsToRenderArray[b] == a) {
        c = true;
        break
    }
    return a && a.uiTabDivEl && a.uiTabDivEl.parentNode && c
}, uiSetDropObjHighlight:function (a, d) {
    var c = "____tabCachedStyleInfo", b = null;
    if (a[c] !== null)b = a[c];
    if (d) {
        if (!JAM.Obj.hasValue(b))a[c] = {bWidth:JAM.UI.getElStyle(a, "borderWidth"), bStyle:JAM.UI.getElStyle(a, "borderStyle"), bColor:JAM.UI.getElStyle(a, "borderColor"), brder:a.style.border, zIndx:JAM.UI.getElStyle(a, "zIndex")};
        a.style.border = "dashed 3px red";
        a.style.zIndex = 999
    } else if (JAM.Obj.hasValue(b)) {
        if (b.bStyle && b.bStyle.length > 0)a.style.border = b.bStyle + " " + b.bWidth + " " + b.bColor; else a.style.border = b.brder;
        a.style.zIndex = b.zIndx
    }
}, _fVertIntersect:function (b, c, a) {
    return Math.abs(b - c) < a
}, _fHorizIntersect:function (a, d, b, f) {
    var c = a + d, e = b + f;
    return c > b && a < e
}, _unhighlightAllDropObjs:function (c) {
    for (var b = 0; b < this._tabs.length; b++) {
        var a = this._tabs[b];
        if (!this.fTabVisible(a))continue;
        if (a.uiTabDivEl !== c)this.uiSetDropObjHighlight(a.uiTabDivEl, false)
    }
}, uiRenderToolTip:function (b, c, d) {
    if (this._uiTabTipDivEl) {
        this._uiTabTipDivEl.style.visibility = "visible";
        this._uiTabTipDivEl.style.top = d + "px";
        this._uiTabTipDivEl.style.left = c + "px";
        var a = $Class("tabTipTxt", this._uiTabTipDivEl, "div");
        a.innerHTML = b
    }
}, _findNearestDropObjToTab:function (d) {
    var b = null, e = null, f = JAM.UI.getElStyle(d, "left", true), j = JAM.UI.getElTop(d), i = d.offsetWidth;
    for (var g = 0; g < this._tabs.length; g++) {
        var a = this._tabs[g];
        if (!this.fTabVisible(a))continue;
        if (a.uiTabDivEl !== d) {
            var l = JAM.UI.getElTop(a.uiTabDivEl);
            if (this._fVertIntersect(j, l, 75)) {
                var c = JAM.UI.getElStyle(a.uiTabDivEl, "left", true), k = a.uiTabDivEl.offsetWidth, h = this._fHorizIntersect(c, k, f, i);
                if (h) {
                    if (b === null) {
                        b = a;
                        e = c
                    }
                    if (Math.abs(c - f) < Math.abs(e - f)) {
                        b = a;
                        e = c
                    }
                }
            }
        }
    }
    return b
}, onDragHlTab:function (d) {
    this._unhighlightAllDropObjs(d);
    var a = this._findNearestDropObjToTab(d);
    if (a) {
        var c = true, b = a;
        if (a instanceof this.Tab) {
            c = this.fTabsOkToCompare(a, this.selectedTab);
            b = a.uiTabDivEl
        }
        if (c)this.uiSetDropObjHighlight(b, true)
    }
}, fTabsOkToCompare:function (a, b) {
    return a.isComparableTab(true) && b.isComparableTab(true)
}, _findTabFromDiv:function (c) {
    for (var a = 0; a < this._tabs.length; a++) {
        var b = this._tabs[a];
        if (b.uiTabDivEl === c)return b
    }
    return null
}, getTabIndex:function (c) {
    for (var a = 0; a < this._tabs.length; a++) {
        var b = this._tabs[a];
        if (c === b)return a
    }
    return -1
}, findTabByTitle:function (c, b, e) {
    if (c)c = c.toLowerCase();
    if (b)b = b.toLowerCase();
    for (var d = 0; d < this._tabs.length; d++) {
        var a = this._tabs[d];
        if (c && a.fullTitle.toLowerCase() == c)return a;
        if (b && a.shortTitle.toLowerCase() == b)return a;
        if (e && a.vPage.ancestorTab1 && a.vPage.ancestorTab2) {
            if (c)if (a.vPage.ancestorTab1.fullTitle.toLowerCase() == c || a.vPage.ancestorTab2.fullTitle.toLowerCase() == c)return a;
            if (b)if (a.vPage.ancestorTab1.shortTitle.toLowerCase() == b || a.vPage.ancestorTab2.shortTitle.toLowerCase() == b)return a
        }
    }
    return null
}, onDragHlTabStart:function (a) {
    a.__origZIndex = JAM.UI.getElStyle(a, "zIndex");
    a.style.zIndex = 999;
    JAM.UI.setElOpacity(a, 4);
    if (this.tabToDisplayCompareTipOn && a === this.tabToDisplayCompareTipOn.uiTabDivEl)this.hideTabTip(true)
}, onDragHlTabStop:function (b) {
    JAM.UI.setElOpacity(b, 10);
    b.style.zIndex = b.__origZIndex;
    this._unhighlightAllDropObjs(b);
    var a = this._findNearestDropObjToTab(b), c = true;
    if (a)if (a instanceof this.Tab) {
        if (this.fTabsOkToCompare(a, this.selectedTab)) {
            c = false;
            this.selectedTab.compareTo(a)
        }
    } else if (this._options.onTabDropTarget)this._options.onTabDropTarget.apply(this._options.callBackThis, [a, this.selectedTab]);
    if (c)this.renderTabs()
}, selectTab:function (a, b) {
    if (!b && !this.fTabVisible(a)) {
        this.cutTab(a);
        this.pasteTab(a, this._tabs.length)
    }
    this.selectedTab = a
}, isSelectedTab:function (a) {
    return this.selectedTab === a
}, cutTab:function (b) {
    var a = this.getTabIndex(b);
    this._tabs.splice(a, 1);
    return a
}, pasteTab:function (b, a) {
    this._tabs.splice(a, 0, b)
}, removeTab:function (b) {
    var c = this.selectedTab === b;
    for (var a = 0; a < this._tabs.length; a++) {
        var d = this._tabs[a];
        if (d === b) {
            if (this._options.onBeforeRemoveTab)this._options.onBeforeRemoveTab.apply(this._options.callBackThis, [this.selectedTab]);
            b.dispose();
            this._tabs.splice(a, 1);
            if (c)if (a >= this._tabs.length && a > 0)this.selectTab(this._tabs[a - 1], true); else if (this._tabs.length > 0)this.selectTab(this._tabs[a], true);
            return true
        }
    }
    return false
}, uncombineTabs:function (a) {
    var b = this.getTabIndex(a);
    this.pasteTab(a.vPage.ancestorTab1, b + 1);
    this.pasteTab(a.vPage.ancestorTab2, b + 2);
    this.removeTab(a)
}, newTab:function (c, f, d, b) {
    var e = JAM.String.shorten(c, this._options.maxTabChars), a = new this.Tab(this, e, c, f);
    if (JAM.Obj.hasValue(b))this._tabs.splice(b, 0, a); else this._tabs.push(a);
    if (!d)this.selectTab(a, true);
    return a
}, _showContextMenuOnTab:function (a) {
    this._uiContextMenuEl.style.visibility = "visible";
    this._uiContextMenuEl.style.left = JAM.UI.getElStyle(a.uiTabDivEl, "left")
}, Tab:function (c, b, d, a) {
    this.shortTitle = b;
    this.fullTitle = d;
    this.uiTabDivEl = null;
    this.vPage = a;
    this.fPinned = false;
    this._tabCtrlRef = c;
    this._uiClickTabHndlr = function () {
        this._tabCtrlRef.hideContextMenu();
        this._tabCtrlRef.selectTab(this);
        this._tabCtrlRef.renderTabs()
    };
    this.uiClickXBtnHndlr = function (a) {
        if (a && a.button == 2)return;
        if (this.isInCompareMode())this._tabCtrlRef.uncombineTabs(this); else this._tabCtrlRef.removeTab(this);
        this._tabCtrlRef.renderTabs()
    };
    this._uiHoverXBtnHndlr = function (b, a) {
        JAM.UI.setElOpacity(a, 10);
        if (JAM.Effects.Drag.isEnabled(this.uiTabDivEl))JAM.Effects.Drag.disable(this.uiTabDivEl)
    };
    this._uiHoverOutXBtnHndlr = function (b, a) {
        JAM.UI.setElOpacity(a, 6);
        if (JAM.Effects.Drag.isDisabled(this.uiTabDivEl))JAM.Effects.Drag.reEnable(this.uiTabDivEl)
    };
    this._uiRightClickTabHndr = function (a) {
        JAM.Events.cancelEventBubble(a);
        this._tabCtrlRef._showContextMenuOnTab(this);
        return false
    };
    this.dispose = function () {
        this.vPage = null
    };
    this.renderSelf = function (e) {
        if (JAM.Obj.hasValue(e))this.uiTabDivEl = e;
        var f = 2, b = null, d = this._tabCtrlRef.isSelectedTab(this);
        if (d) {
            if (this.uiTabDivEl.className !== "htab sprite_v2mtabbg") {
                this.uiTabDivEl.className = "htab sprite_v2mtabbg";
                this.uiTabDivEl.innerHTML = this._tabCtrlRef._uiHTabInnerHtml;
                JAM.Effects.Drag.enable(this.uiTabDivEl, {direction:"xy", onDragStartCallBack:this._tabCtrlRef.onDragHlTabStart, onDragStopCallBack:this._tabCtrlRef.onDragHlTabStop, onDragCallBack:this._tabCtrlRef.onDragHlTab, callBackThis:this._tabCtrlRef})
            }
            b = $Class("hTabXbtn", this.uiTabDivEl, "img");
            if (JAM.Events.hasHandler(b, "mouseup", "uiClickXBtnHndlr")) {
                JAM.Events.removeHandler(b, "mouseup", "uiClickXBtnHndlr");
                JAM.Events.removeHandler(b, "mouseover", "_uiHoverXBtnHndlr");
                JAM.Events.removeHandler(b, "mouseout", "_uiHoverOutXBtnHndlr");
                JAM.Events.removeHandler(this.uiTabDivEl, "contextmenu", "_uiRightClickTabHndr")
            }
            JAM.Events.addHandler(b, "mouseup", this, "uiClickXBtnHndlr");
            JAM.Events.addHandler(b, "mouseover", this, "_uiHoverXBtnHndlr");
            JAM.Events.addHandler(b, "mouseout", this, "_uiHoverOutXBtnHndlr");
            JAM.Events.addHandler(this.uiTabDivEl, "contextmenu", this, "_uiRightClickTabHndr");
            f = 18;
            JAM.UI.setElOpacity(b, 6)
        } else {
            this.uiTabDivEl.className = "otab sprite_v2otabbg";
            this.uiTabDivEl.innerHTML = this._tabCtrlRef._uiOTabInnerHtml;
            JAM.Events.addHandler(this.uiTabDivEl, "click", this, "_uiClickTabHndlr")
        }
        var c = this.findTabTextSpan();
        if (d && b.src.indexOf(this._tabCtrlRef._uiTabXBtnSrc) == -1) {
            b.src = this._tabCtrlRef._uiTabXBtnSrc;
            b.alt = b.title = "关闭标签页"
        }
        if (this.isInCompareMode()) {
            c.innerHTML = "&nbsp;&nbsp;<b>" + a.ancestorTab1.shortTitle + "</b>&nbsp;<span style='font-family:SimHei;'>同</span>&nbsp;<b>" + a.ancestorTab2.shortTitle + "</b>&nbsp;<span style='font-family:SimHei;'>对比</span>&nbsp;&nbsp;";
            this.uiTabDivEl.title = a.ancestorTab1.fullTitle + " & " + a.ancestorTab2.fullTitle;
            if (d) {
                b.src = this._tabCtrlRef._uiTabCombBreakBtnSrc;
                b.alt = b.title = "解除比较标签"
            }
        } else if (this.vPage.type === Lingo.EVPageTypes.home) {
            c.innerHTML = "&nbsp;&nbsp;<b>首页</b>&nbsp;&nbsp;";
            this.uiTabDivEl.title = this.fullTitle
        } else if (this.vPage.type === Lingo.EVPageTypes.didYouMean) {
            c.innerHTML = "&nbsp;&nbsp;<b><del>" + this.shortTitle + "</del></b>&nbsp;&nbsp;";
            this.uiTabDivEl.title = this.fullTitle
        } else {
            c.innerHTML = "&nbsp;&nbsp;<b>" + this.shortTitle + "</b>&nbsp;&nbsp;";
            this.uiTabDivEl.title = this.fullTitle
        }
        var g = JAM.UI.getNoWrapElWidth(c);
        this.uiTabDivEl.style.width = g + f + "px"
    };
    this.compareTo = function (a) {
        Lingo.processQuery(this.fullTitle + " vs. " + a.fullTitle)
    };
    this.isInCompareMode = function () {
        return this.vPage.type === Lingo.EVPageTypes.dictComp
    };
    this.isComparableTab = function (a) {
        if (this.vPage.type === Lingo.EVPageTypes.dict) {
            if (a)if (this.vPage.getData())return true; else return false;
            return true
        }
        return false
    };
    this.findTabTextSpan = function () {
        var b = this.uiTabDivEl.getElementsByTagName("span");
        for (var a = 0; a < b.length; a++)if (b[a].className.lastIndexOf("ContTxt") != -1)return b[a];
        return null
    }
}}, AcdCtrl:{MaxPanelHeightAdjust:0, AcdBtn:function (c, d, b, a) {
    this.BtnId = c;
    this.State = d;
    this.ExpandImgSrc = b;
    this.CollapseImgSrc = a;
    this.Expand = function () {
        this.State = "expand";
        $Id(this.BtnId).className = this.ExpandImgSrc
    };
    this.Collapse = function () {
        this.State = "collapse";
        $Id(this.BtnId).className = this.CollapseImgSrc
    }
}, AcdPanel:function (c, d, a, b) {
    this.Panel = $Id(c);
    this.State = "normal";
    this.Btn = d;
    this.fHidden = false;
    this.ContentPanel = $Id(a);
    this.ImgBar = $Id(b);
    this.SetDefault = function () {
        this.State = "normal";
        var a = JAM.UI.getNoWrapElHeight(this.ContentPanel);
        if (a > 0)a = Math.min(Lingo.AcdCtrl.DefaultPanelHeight, a); else a = Lingo.AcdCtrl.DefaultPanelHeight;
        if (this.ContentPanel.innerHTML)this.Show();
        this.ContentPanel.style.height = a + "px";
        this.Btn.Collapse()
    };
    this.Expand = function () {
        this.State = "expand";
        this.ContentPanel.style.height = Lingo.AcdCtrl.MaxContentHeight + "px";
        this.ContentPanel.style.display = "block";
        this.Btn.Expand()
    };
    this.Collapse = function () {
        this.State = "collapse";
        this.ContentPanel.style.display = "none";
        this.Btn.Collapse()
    };
    this.Hide = function () {
        this.fHidden = true;
        this.ContentPanel.style.display = this.ImgBar.style.display = "none"
    };
    this.Show = function () {
        this.fHidden = false;
        this.ContentPanel.style.display = this.ImgBar.style.display = "block"
    };
    this.ReRender = function () {
        switch (this.State) {
            case "normal":
                this.SetDefault();
                break;
            case "expand":
                this.Expand();
                break;
            case "collapse":
                this.Collapse()
        }
    };
    this.RenderHtml = function (a) {
        if (a)this.Show();
        this.ContentPanel.innerHTML = a
    }
}, Init:function (c) {
    if (!g_fIE6orLess)this.MaxPanelHeightAdjust = -3;
    this.AcdBtn1 = new this.AcdBtn("AcdBtn1", "normal", Lingo._strTable.rstrBtnCls, Lingo._strTable.maxBtnCls);
    this.AcdBtn2 = new this.AcdBtn("AcdBtn2", "normal", Lingo._strTable.rstrBtnCls, Lingo._strTable.maxBtnCls);
    this.AcdBtn3 = new this.AcdBtn("AcdBtn3", "normal", Lingo._strTable.rstrBtnCls, Lingo._strTable.maxBtnCls);
    this.PanelCount = 3;
    var b = JAM.UI.getElStyle(c, "height", true), a = JAM.UI.getElStyle($Id("AcdImgBar1"), "height", true) + JAM.UI.getElStyle($Id("AcdImgBar1"), "borderTopWidth", true, "border-top-width") + JAM.UI.getElStyle($Id("AcdImgBar1"), "borderBottomWidth", true, "border-bottom-width");
    this.DefaultPanelHeight = Math.round(b / this.PanelCount - a);
    this.MaxContentHeight = b - this.PanelCount * a + this.MaxPanelHeightAdjust;
    this.AcdPanel1 = new this.AcdPanel("AcdPanel1", this.AcdBtn1, "Pane1", "AcdImgBar1", this.DefaultPanelHeight);
    this.AcdPanel2 = new this.AcdPanel("AcdPanel2", this.AcdBtn2, "Pane2", "AcdImgBar2", this.DefaultPanelHeight);
    this.AcdPanel3 = new this.AcdPanel("AcdPanel3", this.AcdBtn3, "Pane3", "AcdImgBar3", this.DefaultPanelHeight);
    this.PanelArray = [this.AcdPanel1, this.AcdPanel2, this.AcdPanel3];
    this.AcdPanelMap = [];
    this.AcdPanelMap["AcdBtn1"] = this.AcdPanel1;
    this.AcdPanelMap["AcdBtn2"] = this.AcdPanel2;
    this.AcdPanelMap["AcdBtn3"] = this.AcdPanel3
}, GetPanelCount:function () {
    var b = 0;
    for (var a = 0; a < this.PanelArray.length; a++)if (!this.PanelArray[a].fHidden)b++;
    return b
}, HideAll:function () {
    for (var a = 0; a < this.PanelArray.length; a++)this.PanelArray[a].Hide()
}, SetDefault:function () {
    for (var a = 0; a < this.PanelArray.length; a++)this.PanelArray[a].SetDefault()
}, ClickAcd:function (d) {
    var c = this.AcdPanelMap[d];
    for (var b = 0; b < this.PanelArray.length; b++) {
        var a = this.PanelArray[b];
        if (a == c) {
            if (a.State == "normal" || a.State == "collapse")a.Expand(this.MaxContentHeight + a.MinHeight); else if (a.State == "expand") {
                this.SetDefault();
                break
            }
        } else a.Collapse()
    }
}, RefreshHeights:function (b) {
    if (b)$Id("acdPanelCntr").style.height = b + "px";
    var d = JAM.UI.getElStyle($Id("acdPanelCntr"), "height", true);
    this.PanelCount = this.GetPanelCount();
    var c = JAM.UI.getElStyle($Id("AcdImgBar1"), "height", true) + JAM.UI.getElStyle($Id("AcdImgBar1"), "borderTopWidth", true, "border-top-width") + JAM.UI.getElStyle($Id("AcdImgBar1"), "borderBottomWidth", true, "border-bottom-width");
    this.DefaultPanelHeight = Math.round(d / this.PanelCount - c - 5);
    this.MaxContentHeight = d - this.PanelCount * c - 5;
    for (var a = 0; a < this.PanelArray.length; a++) {
        var e = this.PanelArray[a];
        e.ReRender()
    }
}}, ThCtrl:{_thCtrlDiv:null, _thPlayerFrame:null, _thPlayer:null, _showed:false, _v_sou:null, _thPlayerLoc:{Top:null, Left:null}, init:function (b, c) {
    this._thCtrlDiv = b;
    this._thPlayerFrame = c;
    Lingo.ThCtrl.getThctrBoundBox();
    JAM.Effects.Drag.enable(b, $Id("thCtrlTitle"), {callBackThis:this, onDragStartCallBack:this.onDragStartCallBack, onDragStopCallBack:this.onDragStopCallBack, boundBox:Lingo._settings.thctrBoundBox});
    var a = null, d = "__thplayer";
    try {
        if (window.navigator.platform == "Win64") {
            a = "<div style='width: 100%; height: 100%; text-align: center; vertical-align: middle; background-color: Black; color: White;>你的浏览器不支持播放此视频。</div>";
            this._thPlayerFrame.innerHTML = a
        }
        this._thPlayer = JAM.Dom.playerById(d)
    } catch (e) {
    }
}, onDragStartCallBack:function () {
    $Id("dragMaskLayer").style.display = "block"
}, onDragStopCallBack:function () {
    $Id("dragMaskLayer").style.display = "none"
}, onPlayComplete:function () {
    this.play()
}, getThctrBoundBox:function () {
    if (!Lingo._settings.thctrBoundBox)Lingo._settings.thctrBoundBox = {};
    var a = Lingo._settings.thctrBoundBox;
    a.left = -450;
    a.right = document.body.offsetWidth - 60;
    a.top = 0;
    a.bottom = document.body.offsetHeight - 24;
    return a
}, centerPlayer:function () {
    if (!this._showed) {
        var b = (JAM.Window.getWindowSize().Height - JAM.UI.getElStyle(this._thCtrlDiv, "height", true)) / 2, a = (JAM.Window.getWindowSize().Width - JAM.UI.getElStyle(this._thCtrlDiv, "width", true)) / 2;
        if (b < 0)b = 0;
        if (a < 0)a = 0;
        this._thCtrlDiv.style.top = b.toString() + "px";
        this._thCtrlDiv.style.left = a.toString() + "px";
        this._showed = true
    } else if (this._thCtrlDiv.style.left == "-1000px") {
        if (this._thPlayerLoc.Top)this._thCtrlDiv.style.top = this._thPlayerLoc.Top;
        if (this._thPlayerLoc.Left)this._thCtrlDiv.style.left = this._thPlayerLoc.Left
    }
}, hide:function () {
    try {
        this.pause()
    } catch (a) {
    }
    this._thPlayerLoc.Top = this._thCtrlDiv.style.top;
    this._thPlayerLoc.Left = this._thCtrlDiv.style.left;
    this._thCtrlDiv.style.left = "-1000px";
    this._thCtrlDiv.style.top = "-1000px"
}, getURL:function (a) {
    return Lingo.mediaServer + "en-us/" + a + ".mp4"
}, setVideoSource:function (b) {
    var a = this.getURL(b);
    try {
        this._thPlayer.setSource(a)
    } catch (c) {
        this._v_sou = a
    }
}, pause:function () {
    try {
        this._thPlayer.pauseVideo()
    } catch (a) {
    }
}, play:function () {
    try {
        this._thPlayer.goPlay()
    } catch (a) {
    }
}, changeVideoAndShow:function (a) {
    this.centerPlayer();
    this.setVideoSource(a)
}, getHtml:function (d, b) {
    if (!Lingo._settings.enableAV)return "";
    var a = "this.className='ktv';", c = '<img class="ktv" onmouseout="' + a + '" onmouseover="this.className=\'ktv_f\'" onclick="' + a + "Lingo.ThCtrl.changeVideoAndShow('" + d + "')\"" + " style='" + b + "' title='点击观看视频' src='img/clr.gif'/>";
    return c
}}, ADsCtrl:{testURL:"http://dict.bing.msn.cn/AdTest/images/sprite3_bgs.png", isTimeOut:false, ping:function () {
    var b = this, c, a = new Image;
    a.onload = function () {
        clearTimeout(c);
        if (!b.isTimeOut && a.width)b.showADS();
        delete a
    };
    c = setTimeout(function () {
        b.isTimeOut == true;
        delete a
    }, 3e3);
    a.src = this.testURL
}, init:function () {
    if (Lingo.Lang.ulang.toLowerCase() == "ja-jp" || Lingo.Lang.tlang.toLowerCase() == "ja-jp")return;
    this.ping()
}, showADS:function () {
    try {
        var b, a;
        b = document.getElementById("TopADS");
        a = document.getElementById("HomeADsBar");
        if (b != null)b.innerHTML = '<iframe src="http://dict.bing.msn.cn/AdTest/WebsiteLink_ZH-CN.htm" frameborder="0" scrolling="no" style="width:220px; height:20px;" allowTransparency="true"></iframe>';
        if (a != null)a.innerHTML = '<iframe frameborder="0" width="100%" height="26" scrolling="no" style="overflow:hidden" src="http://dict.bing.msn.cn/AdTest/BingDictEveryday_ZH-CN_EN-US.htm"></iframe>'
    } catch (c) {
    }
}}};

function getCurrentVideo() {
    Lingo.ThCtrl._thPlayer = JAM.Dom.playerById("__thplayer");
    return Lingo.ThCtrl._v_sou
}