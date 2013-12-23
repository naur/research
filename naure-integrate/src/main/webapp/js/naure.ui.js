/*
 * Script：
 *              贾睿之
 * Email：
 *              jiaruizhi@360buy.com
 * Description：
 *            提供 UI 布局的模板处理方法
 * Usage:
 */

define(['jquery', 'naure'], function($, NAURE) {

    /**
     * 下拉框提示
     * Usage:
     * new dropdownPrompt({
     *      container: dom元素
     *      data: ["jvm", "class-load-info", "thread", "tomcat-processors-info", "tomcat-runtime-info", "data-sources", "operating-system", "system-properties"],
     *      onSelect: function (item) {
     *          alert($(item).text());
     *      }
     * });
     */
    NAURE.UI.DropdownPrompt = (function () {
        var dropdownPrompt = function (options) {
            var self = this;

            var opt = $.extend({
                container: null,
                data: null,
                height: null, //最大高度
                onSelect: function (item) {
                    $(opt.container).val($(item).text());
                },
                dom: {
                    prompt: '.dropdown-prompt',
                    promptNode: '.dropdown-prompt li',
                    selectClass: 'select',
                    template: function (data) {
                        var elem = '';
                        for (var index in data) {
                            if (!data.hasOwnProperty(index)) continue;
                            elem += '<li>' + data[index] + '</li>';
                        }
                        return elem;
                    }
                }
            }, options);

            this.promptContainer = function () {
                return $(opt.dom.prompt);
            }

            this.show = function () {
                $(opt.dom.prompt).show();
            };

            this.hide = function () {
                $(opt.dom.prompt).hide();
            };

            this.init = function () {
                $(opt.container).after('<ul class="' + opt.dom.prompt.replace('.', '') + '"></ul>');
                $(opt.dom.prompt).css("top", $(opt.container).position().top + $(opt.container).outerHeight() + 1);
                $(opt.dom.prompt).css("left", $(opt.container).position().left);
                if (opt.height) $(opt.dom.prompt).css("max-height", opt.height);

                $(opt.container).off().on('focus', function () {
                    //if (opt.data && opt.data.length > 0)
                    if ($(opt.dom.prompt).children().is('li'))
                        self.show();
                });

                $(opt.container).on('blur', function () {
                    if (!opt.isActive)
                        self.hide();
                });

                $(opt.container).on('keydown', function () {
                    self.hide();
                });

                this.refresh({data: opt.data});

                return self;
            };

            this.refresh = function (options) {
                if (options && options.data && options.data.length > 0) {
                    opt.data = options.data;
                    $(opt.dom.prompt).html(opt.dom.template(options.data));
                }

                //事件
                $(opt.dom.promptNode).off().on('mouseover', function () {
                    opt.isActive = true;
                    $(opt.dom.promptNode).removeClass(opt.dom.selectClass);
                    $(this).addClass(opt.dom.selectClass);
                });
                $(opt.dom.promptNode).on('mouseout', function () {
                    opt.isActive = false;
                });
                $(opt.dom.promptNode).on('click', function () {
                    self.hide();
                    if (opt.onSelect)
                        opt.onSelect($(this));
                });
            };

            return this.init();
        };

        return dropdownPrompt;
    })();

    /**
     * Tag 面板
     */
    NAURE.UI.TagPanel = (function () {
        var tagPanel = function (options) {
            var opt = $.extend({
                container: null,
                data: null,
                width: 520,
                height: 62,
                multiSelect: true,
                click: null,
                handler: null,
                dom: {
                    tagPanel: '.tag_panel',
                    tagPanelHover: 'tag_panel_hover',
                    tagPanelContent: '.tag_panel ul', //.tag_panel_content',
                    tagPanelItem: '.tag_panel ul li', //.tag_panel_item',
                    tagPanelItemSelect: '.tag_panel ul li.tag_panel_item_select', //.tag_panel_item_select',
                    tagPanelItemSelectStyle: 'tag_panel_item_select'
                },
                domElement: '<div class="tag_panel"><ul></ul></div>',
                domTemplate: '<li tag={0}>{1}</li>'
            }, options);

            //格式化字符串： {0} -- {1}
            opt.format = function (str, args) {
                var args = (!args || typeof arguments[1] != 'object') ? opt.argumentsToArray(arguments, 2) : args || [];
                for (var index in args) {
                    str = str.replace(new RegExp('\{[' + index + ']{1}\}'), args[index]);
                }
                return str;
            };
            opt.argumentsToArray = function (args, shift) {
                var o = [];
                for (l = args.length, x = (shift || 0) - 1; x < l; x++) {
                    o.push(args[x]);
                }
                return o;
            };

            this.refresh = function (options) {
                opt = $.extend(opt, options);
                this.render();
            };

            //清空数据
            this.empty = function () {
                opt = $.extend(opt, {data: [], empty: true});
                this.render();
            };

            this.render = function () {
                if (opt.empty)
                    $(opt.dom.tagPanelContent, opt.container).empty();
                if (opt.data) {
                    for (var index in opt.data) {
                        $(opt.dom.tagPanelContent, opt.container).append(opt.format(opt.domTemplate, opt.data[index].id, opt.data[index].name));
                    }
                }
                if (opt.handler) opt.handler(this);
            };

            //获取选中项
            this.selectedItems = function () {
                var result = [];
                $(opt.dom.tagPanelItemSelect, opt.container).each(function () {
                    result.push({
                        id: $(this).attr('tag'),
                        name: $(this).text()
                    })
                });
                return result;
            };

            //获取选中项数
            this.selectedItemCount = function () {
                return $(opt.dom.tagPanelItemSelect, opt.container).length;
            };

            //获取所有项
            this.allItems = function () {
                var result = [];
                $(opt.dom.tagPanelItem, opt.container).each(function () {
                    result.push({
                        id: $(this).attr('tag'),
                        name: $(this).text()
                    })
                });
                return result;
            };

            //获取所有项数
            this.allItemCount = function () {
                return $(opt.dom.tagPanelItem, opt.container).length;
            };

            //删除选项
            this.deleteSelected = function () {
                $(opt.dom.tagPanelItemSelect, opt.container).each(function () {
                    $(this).remove();
                });
                if (opt.handler) opt.handler(this);
            };

            //初始化容器
            this.init = function () {
                $(opt.container).html(opt.domElement);
                //初始化 tagPanelItem 事件
                $(opt.dom.tagPanelItem, opt.container).die().live('click', function () {
                    if (opt.multiSelect)
                        if ($(this).attr('class'))
                            $(this).removeClass(opt.dom.tagPanelItemSelectStyle);
                        else
                            $(this).addClass(opt.dom.tagPanelItemSelectStyle);
                    else {
                        $(opt.dom.tagPanelItem, opt.container).removeClass(opt.dom.tagPanelItemSelectStyle);
                        $(this).addClass(opt.dom.tagPanelItemSelectStyle);
                    }
                    if (opt.click) {
                        opt.click(this);
                    }
                });
                $(opt.dom.tagPanelContent, opt.container).die().live('mouseout', function () {
                    $(opt.dom.tagPanel, opt.container).addClass(opt.dom.tagPanelHover);
                });
                $(opt.dom.tagPanel, opt.container).die().live('mouseleave', function () {
                    $(this).removeClass(opt.dom.tagPanelHover);
                });
            };

            this.init();
            this.render();
        };

        return tagPanel;
    })();

    NAURE.UI.ActionPanel = (function () {
        var actionPanel = function (options) {
            var opt = $.extend({
                container: null,
                width: 520,
                height: 62,
                panelInfo: {
                    stySrc: null,
                    styAction: {
                        width: '600px',
                        height: '100px',
                        position: 'absolute'
                    }}
            }, options);

            this.save = function () {
                opt.panelInfo.stySrc = {
                    width: $(opt.container).css("width"),
                    height: $(opt.container).css("height"),
                    offset: $(opt.container).offset(),
                    position: $(opt.container).css("position"),
                    outerHeight: $(opt.container).outerHeight()
                };
            };

            this.restore = function () {
                $(opt.container).css("width", opt.panelInfo.stySrc.width);
                $(opt.container).css("height", opt.panelInfo.stySrc.height);
                $(opt.container).css("position", opt.panelInfo.stySrc.position);
                $(opt.container).attr('active', null);
            }

            this.render = function () {
                if (!opt.panelInfo.stySrc) {
                    this.save();
                }
                if ("true" == $(opt.container).attr('active')) {
                    this.restore();
                } else {
                    $(opt.container).css("width", opt.panelInfo.styAction.width);
                    $(opt.container).css("height", opt.panelInfo.styAction.height);
                    $(opt.container).css("position", opt.panelInfo.styAction.position);
                    $(opt.container).attr('active', true);
                }
            };
        };

        return actionPanel;
    })();

    /**
     * 翻页控件
     */
    NAURE.UI.pagination = (function () {
        var pagination = function (options) {
            var opt = $.extend({
                index: 1,
                size: 20,
                total: 0,
                region: 5,
                prev: '上一页',
                next: '下一页',
                startPrefix: [1, '...'],
                endPrefix: ['...'],
                container: null,
                onchange: null
            }, options);

            //数据校验
            opt.index = parseInt(opt.index);
            opt.size = parseInt(opt.size);
            opt.total = parseInt(opt.total);
            opt.region = parseInt(opt.region);
            opt.pages = Math.ceil(opt.total / opt.size);
            if (opt.index > opt.pages) opt.index = opt.pages;
            if (opt.index < 1) opt.index = 1;
            opt.endPrefix[1] = opt.pages;

            //计算 按钮数量
            var currRegion = Math.ceil(opt.region / -2) + opt.index;
            var buffer = [];
            for (var i = 0; i < opt.region; i++, currRegion++) {
                if (currRegion >= 1 && currRegion <= opt.pages)
                    buffer.push(currRegion);
            }
            if (buffer.length > 0) {
                buffer = opt.startPrefix.slice(0, buffer[0] - 1).concat(buffer);
                if (buffer[buffer.length - 1] != opt.pages)
                    buffer = buffer.concat(opt.endPrefix.slice(buffer[buffer.length - 1] - opt.pages));
                if (buffer.length >= 3) {
                    if (buffer[2] - buffer[0] == 2) buffer[1] = buffer[0] + 1;
                    if (buffer[buffer.length - 1] - buffer[buffer.length - 3] == 2) buffer[buffer.length - 2] = buffer[buffer.length - 1] - 1;
                }
                if (1 != opt.index) buffer.unshift(opt.prev);
                if (opt.pages != opt.index) buffer.push(opt.next);
            }

            //生成 html
            var str = '共' + opt.total + '条记录. ';
            for (var i in buffer) {
                if (opt.index == buffer[i])
                    str += '<a class="PageSelected">' + buffer[i] + '</a>'
                else
                    str += '<a>' + buffer[i] + '</a>'
            }
            if (opt.container) $(opt.container).html(str);

            //按钮事件
            $(opt.container + ' a').die().on('click', function () {
                var currIndex = $(this).text();
                if (currIndex == opt.index || currIndex == '...') return false;
                if (currIndex == opt.prev) currIndex = opt.index - 1;
                if (currIndex == opt.next) currIndex = opt.index + 1;
                currIndex = parseInt(currIndex);
                if (!currIndex) return false;
                pagination($.extend({}, opt, {
                    index: currIndex
                }));
                if (opt.onchange) opt.onchange({index: currIndex, size: opt.size});
                return false;
            });
        };
        return pagination;
    })();

    NAURE.UI.templet = (function (options) {
        var opt = $.extend({
            name: "",
            container:null,

            context:null,

            error:null,
            success:null
        }, options);

        NAURE.HTTP.acquire({
            xmlUrl: '/xml/templet/' + opt.name + '.xml',
            xmlCache:true,
            //xslUrl: '/xsl/body.xsl',
            container: opt.container,
            context: opt.context,
            error:function (ex) {
                if (opt.success != null) {
                    opt.success(ex);
                }
            },
            success:function(obj) {
//                $(opt.container).html(obj.xml.toString());
//                obj.container = container;
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
        options.container = this;
        NAURE.UI.templet(options);
        return this;
    }
});
