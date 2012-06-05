/*
 * Script：
 *              贾睿之
 * Email：
 *             jiaruizhi@360buy.com
 *
 * Description：
 *            提供一些通用的 功能集 。
 */

(function ($) {
    $.toJSON = function (obj) {
        var json = '{';
        for (var key in obj) {
            if (typeof(obj[key]) == 'number' ||
                typeof(obj[key]) == 'string' ||
                typeof(obj[key]) == 'boolean' ||
                typeof(obj[key]) == 'array' ||
                typeof(obj[key]) == 'undefined' ||
                typeof(obj[key]) == 'date')
                json += '"' + key + '":"' + obj[key] + '",';
        }
        json = json.replace(/,?$/, '}');
        //return JSON.parse('{"key":7,"color":"black"}');
        return JSON.parse(json);
    };
//    $.sleep = function (sec) {
//        var startTime = new Date().getTime();
//        while ((new Date().getTime() - startTime) < sec) {
//        }
//        return;
//    };

    NAURE.JSON.toHtml = function (obj) {
        var json = '';
        for (var key in obj) {
            if (typeof(obj[key]) == 'number' ||
                typeof(obj[key]) == 'string' ||
                typeof(obj[key]) == 'boolean' ||
                typeof(obj[key]) == 'array' ||
                typeof(obj[key]) == 'undefined' ||
                typeof(obj[key]) == 'date')
                json += ' ' + key + '="' + obj[key] + '" ';
        }
        json = json.replace(/,?$/, '}');
        //return JSON.parse('{"key":7,"color":"black"}');
        return JSON.parse(json);
    };
})(jQuery);

//----- html 字符串过滤  -----------------------------------------------//
(function ($) {
    $.fn.encHTML = function () {
        return this.each(function () {
            var me = jQuery(this);
            var html = me.html();
            me.html(html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        });
    };

    $.fn.decHTML = function () {
        return this.each(function () {
            var me = jQuery(this);
            var html = me.html();
            me.html(html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
        });
    };

    $.fn.isEncHTML = function (str) {
        if (str.search(/&amp;/g) != -1 || str.search(/&lt;/g) != -1 || str.search(/&gt;/g) != -1)
            return true;
        else
            return false;
    };

    $.fn.decHTMLifEnc = function () {
        return this.each(function () {
            var me = jQuery(this);
            var html = me.html();
            if (jQuery.fn.isEncHTML(html))
                me.html(html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
        });
    };

})(jQuery);

function encodeHTML(data) {
    return data.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, '&');
}

//todo 代码来源于 dict.bing.com.cn 未经过测试
function escapeXML(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function parseNull(str1, str2) {
    if (str1 == null || str1 == undefined) {
        return (str2 == null) ? '-' : str2;
    } else {
        return str1;
    }
}

//----- 翻页控件  -------------------------------------------------------//
(function ($) {
    $.fn.renderPaginator = function (options) {
        var parameters = $.extend({
            pageSize:0,
            pageIndex:0,
            count:10,
            handler:null
        }, options);

        $(this).smartpaginator({
            totalrecords:parameters.count,
            recordsperpage:parameters.pageSize,
            initval:parameters.pageIndex,
            next:'下一页',
            prev:'上一页',
            first:'首页',
            last:'尾页',
            go:'转到',
            theme:'light',
            onchange:function (newPageValue) {
                if (parameters.handler != null) {
                    parameters.handler(newPageValue);
                }
            }});
    };
})(jQuery);

//----- TR 状态改变事件  -----------------------------------------------//
var trOriginalClass;
function trMouseOverEvent() {
    $(".raisefocus tr td").live("mouseover", function () {
        trOriginalClass = this.parentNode.className;
        this.parentNode.className = 'tdon';
    });
    $(".raisefocus tr td").live("mouseout", function () {
        this.parentNode.className = trOriginalClass;
    });
}

//----- 数据、日期 格式化  -----------------------------------------------------//
function dateFormat(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}
(function ($) {
    $.getDateString = function (monthInterval, dateInterval) {
        var d, e;
        d = new Date();
        if (monthInterval == null && dateInterval == null) {
            e = d.getFullYear();
            e += '-' + dateFormat(d.getMonth() + 1);
            e += '-' + dateFormat(d.getDate());
        } else {
            if (monthInterval != null) {
                if (monthInterval == 0) {
                    //如果是0月，则设置日为1号
                    d.setDate(1);
                } else {
                    d.setMonth(d.getMonth() + monthInterval);
                }
            }
            if (dateInterval != null) {
                d.setDate(d.getDate() + dateInterval);
            }
            e = d.getFullYear();
            e += '-' + dateFormat((d.getMonth() + 1));
            e += '-' + dateFormat(d.getDate());
        }
        return e;
    };
    $.getDateSpan = function (date1, date2) {
        var d1 = Date.parse(date1);
        var d2 = Date.parse(date2);
        return Math.floor((d1 - d2) / 86400000 + 1);
    };
})(jQuery);
//日期验证（一个月、当月）
function monthLimit(data1, data2) {
    if (data1.substr(0, 4) == data2.substr(0, 4)) {
        if (data1.substr(5, 2) == data2.substr(5, 2)) {
            return true;
        }
    }
    return false;
}
//日期格式化
Date.prototype.format = function (format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     *                  yyyy-MM-dd HH:mm:ss fff
     */
    var o = {
        "M":this.getMonth() + 1, //month
        "d":this.getDate(), //day
        "H":this.getHours(), //hour
        "m":this.getMinutes(), //minute
        "s":this.getSeconds(), //second
        "q":Math.floor((this.getMonth() + 3) / 3), //quarter
        "f":this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + "+)").test(format)) {
            format = format.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - (k == 'f' ? 1 : 0), RegExp.$1.length));
            //format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};

//----- TABLE 列隐藏 | 显示 -----------------------------------------------------//
(function ($) {
    $.fn.hideCol = $.hideCol = function (col) {
        if (!col) {
            col = 1;
        }
        //$('tr td:nth-child(' + col + '), tr th:nth-child(' + col + ')', this).hide();
        $('tr td:nth-child(' + col + '), tr th:nth-child(' + col + ')').hide();
        return this;
    };
    $.fn.showCol = $.showCol = function (col) {
        if (!col) {
            col = 1;
        }
        //$('tr td:nth-child(' + col + '), tr th:nth-child(' + col + ')', this).show();
        //if ($.browser.msie) {
        //$('tr').find('td:eq(' + col + '), th:eq(' + col + ')').show();
        //} else {
        $('tr td:nth-child(' + (col + 1) + '), tr th:nth-child(' + (col + 1) + ')').show();
        //}

        return this;
    };
    $.fn.hideColumn = function (str) {
        if ($(this).val() == str) {
            $(this).hideCol($(this).parentNode.columns);
        }
        return this;
    };
    $.fn.showColumn = function (compareStr) {
        if ($(this).html() != compareStr) {
            $(this).showCol($(this).get(0).cellIndex + 1);
        }
        return this;
    };
    $.fn.showColumnIndex = function (compareStr, columnIndexes, currentIndex) {
        if ($(this).html() != compareStr) {
            if (!currentIndex) {
                currentIndex = $(this).get(0).cellIndex;
            }
            if ($.inArray(currentIndex, columnIndexes) < 0) {
                columnIndexes.push(currentIndex);
            }
        }
        return this;
    };
})(jQuery);


(function ($) {
    $.flyoutTTJ = function (options) {
        var opt = $.extend({
            target:null,
            container:null
        }, options);

        //"span.sp-hg"
        $(opt.target).TTJ({
            title:"以回车分隔输入多个SKU",
            imgTitleSrc:FJ.getRootPath() + "/resources/themes/360buy/images/vc/tableIconRework.png",
            showHead:true, //是否显示头部
            hoverDirect:"left",
            shiftLeft:-280,
            shiftTop:40,
            speed:1,
            showSpeed:200,
            loadDelay:50,
            loadSpeed:10,
            zIndex:999999,
            radius:!FJ.isIE ? 2 : 0,
            //onlyFirstLoad: true,
            widthF:280,
            heightF:100,
            borderWidth:2,
            borderWidthB:1,
            hasShadow:true,
            colorParams:{
                bgColor:"#ddd",
                borderOut:"#ddd",
                borderBody:"#b3b3b3",
                bgColorHead:"#c7c7c7", //头部背景色
                bgColorHeadJ:"#c7c7c7", //头部背景渐变色(下)
                bgColorHeadJT:"#d5d5d5", //头部背景渐变色(上)
                bgColorHeadU:"#d5d5d5", //头部上半边背景色(非IE浏览器下显示)
                shadow:"#000",
                fontColorHead:"#197ED4"
            },
            fnHtml:function () {
                var thiz = this;
                //var spId = this.currentObj.attr("id");
                //var pid = spId.substr(spId.lastIndexOf("_") + 1);
                //this.alterTitle("(" + pid + ")以回车分隔输入多个库存单号");
                //var oTxt = $("#txt_hg_" + pid);
                var oTxt = $(opt.container);

                var txt = oTxt.val();

                //过滤中文逗号
                if (txt.indexOf("，") != -1) {
                    txt = txt.replace(/，/g, ",");
                }

                //将间隔符改为回车
                if (txt.indexOf(",") != -1) {
                    var arr = txt.split(",");
                    txt = "";
                    for (var i = 0; i < arr.length; i++) {
                        txt += "\n" + arr[i];
                    }
                    txt = txt.substr(1);
                }

                var oTa = $("<textarea></textarea>");
                oTa.css({
                    width:this.bodyIn.width() - 5,
                    height:this.bodyIn.height() - 5,
                    overflow:"auto",
                    fontSize:16
                });
                oTa.val(txt);

                //同步文本框
                oTa.bind("keyup", function () {
                    var txt2 = $(this).val();
                    if (jQuery.trim(txt2) == "") {
                        oTxt.val(txt2).attr("title", txt2);
                        return;
                    }

//                            if(!/^\d+(\n\d+|\n)*$/.test(txt2)) {
//                                thiz.p.isHoverShow = false;
//                                MBJ.alert("提示", "格式不正确,必须输入数字,以逗号分隔", function() {
//                                    thiz.p.isHoverShow = true;
//                                });
//                            }

                    if (txt2.indexOf("\n") != -1) {
                        var arr = txt2.split("\n");
                        txt2 = "";
                        for (var i = 0; i < arr.length; i++) {
                            var v = jQuery.trim(arr[i]);
                            if (v != "") {
                                txt2 += "," + v;
                            }
                        }
                        txt2 = txt2.substr(1);
                    }

                    if (txt2.indexOf("，") != -1) {
                        txt2 = txt2.replace(/，/g, ",");
                    }

                    oTxt.val(txt2).attr("title", txt2);
                });

                return oTa;
            },
            evts:{
//            afterClose: function(e, p) {
//                var spId = this.currentObj.attr("id");
//                var pid = spId.substr(spId.lastIndexOf("_") + 1);
//                //var oTxt = $("#txt_hg_" + pid);
//                var oTxt = $(opt.container);
//
//                oTxt.blur();
//            },
                aftershow:function (e, p) {
                    if (!FJ.isFF && !FJ.isIE8) {
                        this.divOut.css("opacity", 0.95);
                    }
                },
                afterbodyload2:function () {

                },
                afterrender:function (e, p) {
                    this.bodyIn.css("overflow", "hidden");
                }
            }
        });
    };
    $.fn.flyoutTTJ = function (options) {
        if (options == null) {
            options = {};
        }
        options.target = this;
        $.flyoutTTJ(options);
        return this;
    }
})(jQuery);


