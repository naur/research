/*
 * Script：
 *              贾睿之
 * Email：
 *             jiaruizhi@360buy.com
 *
 * Description：
 *            提供一些通用的 功能集 。
 */

define(['jquery', 'naure'], function ($, NAURE) {

    NAURE.Utility = (function () {

        var originalClass;

        var utility = {
            keyCode: {
                A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
                H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
                O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
                U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
                0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57,
                BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, CONTROL: 17, DELETE: 46, DOWN: 40,
                END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT:  45, LEFT: 37,
                NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33,
                PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38
            },

            isArray: function (obj) {
                if (obj) {
                    if (obj.constructor === Array)
                        return true;
                    else
                        return obj.length && obj.splice;
                }
                return false;
            },

            clone: function (obj) {
                var cloneObject = new Object();
                for (var key in obj) {
                    cloneObject[key] = obj[key];
                }
                return cloneObject;
            },

            encodeHTML: function (data) {
                return data.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, '&');
            },

            //TODO 有问题
            escapeHTML: function (text) {
                var replacements = {"<": "<", ">": ">", "&": "&", "\"": "'"};
                return text.replace(/[<>&"]/g, function (character) {
                    return replacements[character];
                });
            },

            parseNull: function (str1, str2) {
                if (str1 == null || str1 == undefined) {
                    return (str2 == null) ? '-' : str2;
                } else {
                    return str1;
                }
            },

            cookie: function (name, value, options) {
                if (typeof value != 'undefined') { // name and value given, set cookie
                    options = options || {};
                    if (value === null) {
                        value = '';
                        options.expires = -1;
                    }
                    var expires = '';
                    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                        var date;
                        if (typeof options.expires == 'number') {
                            date = new Date();
                            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                        } else {
                            date = options.expires;
                        }
                        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                    }
                    // CAUTION: Needed to parenthesize options.path and options.domain
                    // in the following expressions, otherwise they evaluate to undefined
                    // in the packed version for some reason...
                    var path = options.path ? '; path=' + (options.path) : '';
                    var domain = options.domain ? '; domain=' + (options.domain) : '';
                    var secure = options.secure ? '; secure' : '';
                    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
                } else { // only name given, get cookie
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
            },

            /**
             * 获取开始时间和结束时间之间间隔的天数或日期
             * @param startTime  开始时间或偏移量
             * @param endTime   结束时间或偏移量
             * @returns {*} 返回日期列表
             */
            getDays: function (startTime, endTime, format, add) {
                if (!startTime || !endTime)
                    return null;
                if (typeof(startTime) == 'string')
                    startTime = new Date(startTime);
                if (typeof(endTime) == 'string')
                    endTime = new Date(endTime);

                var time1 = new Date(startTime.getTime());
                var time2 = new Date(endTime.getTime());

                var days = [];
                do {
                    days.push(format ? format(time1) : new Date(time1.getTime()));
                    //默认 add 天数
                    if (!add || 'day' == add)
                        time1.setDate(time1.getDate() + 1);
                    else if ('month' == add) {
                        time1.setDate(1);
                        time1.setMonth(time1.getMonth() + 1);
                    }
                } while (time1.getTime() <= time2.getTime());
                return days;
            },

            //分割 {key: valye} 的数组为 key:[], value:[]
            arraySplit: function (array) {
                var buffer = {
                    keys: [],
                    values: []
                };

                for (var index in array) {
                    if (!array.hasOwnProperty(index)) continue;
                    buffer.keys.push(index);
                    buffer.values.push(array[index]);
                }
                return buffer;
            },

            toJSON: function (obj, deep) {
                var json = '{';
                for (var key in obj) {
                    if (typeof(obj[key]) == 'number' ||
                        typeof(obj[key]) == 'string' ||
                        typeof(obj[key]) == 'boolean' ||
                        typeof(obj[key]) == 'array' ||
                        typeof(obj[key]) == 'undefined' ||
                        typeof(obj[key]) == 'date' ||
                        null == obj[key]) {
                        json += '"' + key + '":"' + obj[key] + '",';
                    } else if (deep && typeof(obj[key]) == 'object') {
                        json += '"' + key + '":[' + JSON.stringify($.toJSON(obj[key])) + '],';
                    }
                }
                json = json.replace(/,?$/, '}');
                //return JSON.parse('{"key":7,"color":"black"}');
                return JSON.parse(json);
            },

            fieldTag: function (options) {
                var opt = $.extend({markedClass: "tagged", standardText: false}, options);
                $(this).focus(function () {
                    if (!this.changed) {
                        this.clear();
                    }
                }).blur(function () {
                    if (!this.changed) {
                        this.addTag();
                    }
                }).keyup(function () {
                    this.changed = ($(this).val() ? true : false);
                }).each(function () {
                    this.title = $(this).attr("title");
                    if ($(this).val() == $(this).attr("title")) {
                        this.changed = false;
                    }
                    this.clear = function () {
                        if (!this.changed) {
                            $(this).val("").removeClass(opt.markedClass);
                        }
                    }
                    this.addTag = function () {
                        $(this).val(opt.standardText === false ? this.title : opt.standardText).addClass(opt.markedClass);
                    }
                    if (this.form) {
                        this.form.tagFieldsToClear = this.form.tagFieldsToClear || [];
                        this.form.tagFieldsToClear.push(this);
                        if (this.form.tagFieldsAreCleared) {
                            return true;
                        }
                        this.form.tagFieldsAreCleared = true;
                        $(this.form).submit(function () {
                            $(this.tagFieldsToClear).each(function () {
                                this.clear();
                            });
                        });
                    }
                }).keyup().blur();
                return $(this);
            },

            /**
             * 全选
             * @param classAll
             * @param classItem
             */
            checkSelect: function (classAll, classItem) {
                $(classAll).on('click', function () {
                    $(classItem).attr('checked', $(this).attr('checked'));
                });
                return function (status) {
                    if (null == status) status = true;
                    if (status) return $(classItem + ':checked');
                    else return $(classItem + ':not(:checked)');
                };
            },

            /**
             * 字符串格式化
             * @param str
             * @param args
             * @returns {*}
             */
            format: function (str, args) {
                var args = (!args || typeof arguments[1] != 'object') ? this.argumentsToArray(arguments, 2) : args || [];
                for (var index in args) {
                    str = str.replace(new RegExp('\{[' + index + ']{1}\}'), args[index]);
                }
                return str;
            },

            argumentsToArray: function (args, shift) {
                var o = [];
                for (l = args.length, x = (shift || 0) - 1; x < l; x++) {
                    o.push(args[x]);
                }
                return o;
            },

            //todo 代码来源于 dict.bing.com.cn 未经过测试
            escapeXML: function (s) {
                return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
            },

            flatInformation: function (option) {
                //level
                var level = $(option.xml).find('result > level');
                if (level && level.length > 0 && level.text() == 0) {
                    option.flat({content: "完成！"});
                } else {
                    option.flat({content: "错误！", color: 'red'});
                }
                //keywords
                $(option.xml).find('result > keywords').each(function (index, data) {
                    if ($(this).text() && $(this).text().length > 0 && 'null' != $(this).text())
                        option.flat({content: $(this).text()});
                });

                //data
                $(option.xml).find('result > data > item').each(function (index, data) {
                    if ($(this).find('level').text().length <= 0) {
                        option.flat({content: $(this).text()});
                        return;
                    }

                    if ($(this).find('level').text() == 0) {
                        option.flat({content: $(this).find('keywords').text()});
                    } else {
                        option.flat({content: $(this).find('keywords').text(), color: 'red'});
                    }
                });
            },

            //----- TODO TR 状态改变事件 , 【过时】，通过CSS 来控制  -----------------------------------------------//
            trMouseOverEvent: function () {
                $(".raisefocus tr td").on("mouseover", function () {
                    $(this).parent().addClass('hover');
                });
                $(".raisefocus tr td").on("mouseout", function () {
                    $(this).parent().removeClass('hover');
                });
            }
        };

        return utility;
    })();

//    $.sleep = function (sec) {
//        var startTime = new Date().getTime();
//        while ((new Date().getTime() - startTime) < sec) {
//        }
//        return;
//    };

    NAURE.JSON.toHtml = function (obj) {
        var html = '';
        for (var key in obj) {
            if (typeof(obj[key]) == 'number' ||
                typeof(obj[key]) == 'string' ||
                typeof(obj[key]) == 'boolean' ||
                typeof(obj[key]) == 'array' ||
                typeof(obj[key]) == 'undefined' ||
                typeof(obj[key]) == 'date')
                html += ' ' + key + '="' + obj[key] + '" ';
        }
        //return JSON.parse('{"key":7,"color":"black"}');
        return html;
    };

    NAURE.JSON.toString = function (obj) {
        var str = '';
        for (var key in obj) {
            if (typeof(obj[key]) == 'number' ||
                typeof(obj[key]) == 'string' ||
                typeof(obj[key]) == 'boolean' ||
                typeof(obj[key]) == 'array' ||
                typeof(obj[key]) == 'undefined' ||
                typeof(obj[key]) == 'date')
                str += '"' + key + '":"' + obj[key] + '",';
        }
        str = str.replace(/,?$/, '');
        //return JSON.parse('{"key":7,"color":"black"}');
        return str;
    };

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


//----- 翻页控件  -------------------------------------------------------//
    (function ($) {
        $.fn.renderPaginator = function (options) {
            var parameters = $.extend({
                pageSize: 0,
                pageIndex: 0,
                count: 10,
                handler: null
            }, options);

            $(this).smartpaginator({
                totalrecords: parameters.count,
                recordsperpage: parameters.pageSize,
                initval: parameters.pageIndex,
                next: '下一页',
                prev: '上一页',
                first: '首页',
                last: '尾页',
                go: '转到',
                theme: 'light',
                onchange: function (newPageValue) {
                    if (parameters.handler != null) {
                        parameters.handler(newPageValue);
                    }
                }});
        };
    })(jQuery);

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
    Date.prototype.format = function (format, utc) {
        /*
         * eg:format="YYYY-MM-dd hh:mm:ss";
         *                  yyyy-MM-dd HH:mm:ss fff
         */
        var o;
        if (utc) {
            o = {
                "M": this.getUTCMonth() + 1, //month
                "d": this.getUTCDate(), //day
                "H": this.getUTCHours(), //hour
                "m": this.getUTCMinutes(), //minute
                "s": this.getUTCSeconds(), //second
                "q": Math.floor((this.getUTCMonth() + 3) / 3), //quarter
                "f": this.getUTCMilliseconds() //millisecond
            }

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
            }
        } else {
            o = {
                "M": this.getMonth() + 1, //month
                "d": this.getDate(), //day
                "H": this.getHours(), //hour
                "m": this.getMinutes(), //minute
                "s": this.getSeconds(), //second
                "q": Math.floor((this.getMonth() + 3) / 3), //quarter
                "f": this.getMilliseconds() //millisecond
            }

            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
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
                target: null,
                container: null
            }, options);

            //"span.sp-hg"
            $(opt.target).TTJ({
                title: "以回车分隔输入多个SKU",
                imgTitleSrc: FJ.getRootPath() + "/resources/themes/360buy/images/vc/tableIconRework.png",
                showHead: true, //是否显示头部
                hoverDirect: "left",
                shiftLeft: -280,
                shiftTop: 40,
                speed: 1,
                showSpeed: 200,
                loadDelay: 50,
                loadSpeed: 10,
                zIndex: 999999,
                radius: !FJ.isIE ? 2 : 0,
                //onlyFirstLoad: true,
                widthF: 280,
                heightF: 100,
                borderWidth: 2,
                borderWidthB: 1,
                hasShadow: true,
                colorParams: {
                    bgColor: "#ddd",
                    borderOut: "#ddd",
                    borderBody: "#b3b3b3",
                    bgColorHead: "#c7c7c7", //头部背景色
                    bgColorHeadJ: "#c7c7c7", //头部背景渐变色(下)
                    bgColorHeadJT: "#d5d5d5", //头部背景渐变色(上)
                    bgColorHeadU: "#d5d5d5", //头部上半边背景色(非IE浏览器下显示)
                    shadow: "#000",
                    fontColorHead: "#197ED4"
                },
                fnHtml: function () {
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
                        width: this.bodyIn.width() - 5,
                        height: this.bodyIn.height() - 5,
                        overflow: "auto",
                        fontSize: 16
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
                evts: {
//            afterClose: function(e, p) {
//                var spId = this.currentObj.attr("id");
//                var pid = spId.substr(spId.lastIndexOf("_") + 1);
//                //var oTxt = $("#txt_hg_" + pid);
//                var oTxt = $(opt.container);
//
//                oTxt.blur();
//            },
                    aftershow: function (e, p) {
                        if (!FJ.isFF && !FJ.isIE8) {
                            this.divOut.css("opacity", 0.95);
                        }
                    },
                    afterbodyload2: function () {

                    },
                    afterrender: function (e, p) {
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

    return NAURE;
});
