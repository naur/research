//----- 　Script：贾睿之　--------------------------------------------
//----- 　Email：jiaruizhi@360buy.com　---------------------------

//----- 全局变量 START -----------------------------------------------

var pageSize = function () {
    //return $('#pagesize').val();
    return 30;
};
var count = 0;
var id = '';
var exportName;

//----- 全局变量 END -----------------------------------------------

//----- 函数 START -----------------------------------------------

function renderOption(options) {
    var parameters = $.extend({
                context: null,
                container: null,
                successor: null
            }, options);
    var id = parameters.context == null ? '' : $(parameters.context).val();
    var level = parameters.container == null ? '' : $(parameters.container)[0].id
    $(parameters.container).html('');
    $(parameters.container).acquire({
                xmlUrl: '../regionalism/get.action',
                xslUrl: '../resources/xsl/score/regionalism.xsl',
                optionData: {
                    'where.level' : level,
                    'where.id' : id
                },
                success: function(obj) {
                    if (parameters.successor != null) {
                        parameters.successor();
                    }
                }
            });
}

//初始化机构
function initOrganization() {
    renderOption({
                container : '#organization',
                successor : initProvince
            });
}
//初始化省份
function initProvince() {
    renderOption({
                context: '#organization',
                container : '#province',
                successor : initCity
            });
}
//初始化城市
function initCity() {
    renderOption({
                context: '#province',
                container : '#city'
            });
}

function jsonData(pageIndex) {
    return {
        "where.pageSize": pageSize(),
        "where.pageIndex" : pageIndex,
        "where.startDate": $('#starttime').val(),
        "where.endDate": $('#endtime').val(),
        "where.organizationId": $('#organization').val(),
        "where.provinceId": $('#province').val(),
        "where.cityId": $('#city').val(),
        "where.machineType":  $('#machine-type').val()
    };
}

function HandlerElement(options) {
    var parameters = {
        url: null,
        xsl: null,
        pageSize: pageSize(),
        pageIndex: 1,
        finished: null
    };
    $.extend(parameters, options);
    $('#query').attr('disabled', true);
    $('#dataRender').html("");
    $('#smart-paginator').html("");
    $.message.empty();
    $.message.show({content:'正在获取数据，请稍候......'});
    $('#dataRender').acquire({
                xmlUrl: parameters.url,
                xslUrl: parameters.xsl,
                optionData: jsonData(parameters.pageIndex),
                pagingContainer: '#smart-paginator',
                pageSize: parameters.pageSize,
                pageIndex: parameters.pageIndex,
                error: function(ex) {
                    $.message.show({content:'获取数据结束！'});
                    $.message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                    $('#query').attr('disabled', false);
                },
                success: function(obj) {
                    if (obj.output === "") {
                        $.message.show({content:'获取数据结束！'});
                        $.message.show({content:'没有数据！'});
                    } else {
                        $.message.empty();
                    }
                    if (parameters.finished)
                        parameters.finished();
                    $('#query').attr('disabled', false);
                },
                pagingHandler:function(selectedIndex) {
                    HandlerElement({
                                url: parameters.url,
                                xsl: parameters.xsl,
                                pageIndex: selectedIndex,
                                finished: parameters.finished
                            });
                }
            });
}

//----- 函数 END -----------------------------------------------

//----- 事件 START -----------------------------------------------

$(function () {
    $("#query").on('click', function() {
        if (!monthLimit($('#starttime').val(), $('#endtime').val())) {
            alert('请按月查询数据！');
            return;
        }
        
        HandlerElement({
                    url: '../intel/search.action',
                    xsl: '../resources/xsl/score/intel.xsl',
                    finished: function() {
                    }
                });
    });

    $('#organization').on('change', function() {
        initProvince();
    })
    $('#province').on('change', function() {
        initCity();
    })
    $('.export').on('click', function () {
        $('.export').attr('disabled', true);
        $.message.fade({content:'正在添加【' + exportName + '】导出任务，请稍候......', fade:'IN'});
        $.acquire({xmlUrl:'/task/attach.action',
            optionData:$.extend({
                "where.taskName":'导出' + exportName + '',
                "where.taskCallback":'intelExportStrategy'
            }, jsonData(1)),
            error:function (ex) {
                $.message.fade({content:'添加导出任务结束！', fade:'IN'});
                $.message.fade({content:'添加【' + exportName + '】导出任务失败，请稍后重试！', color:'red', fade:'OUT'});
                $('#query').attr('disabled', false);
                $('.export').attr('disabled', false);
            },
            success:function (obj) {
                if ($(obj.output).find('result item level:contains("error")').length > 0) {
                    $.message.fade({content:'添加【' + exportName + '】导出任务失败，请稍后重试！', color:'red', fade:'OUT'});
                } else {
                    $.message.fade({content:'添加【' + exportName + '】导出任务成功！', fade:'OUT'});
                }
                $('.export').attr('disabled', false);
            }
        });
    });
});

//----- 事件 END -----------------------------------------------


//----- 初始化 START -----------------------------------------------

$(function() {
    $('#query').attr('disabled', false);
    $('.export').attr('disabled', false);
    $('.dataRenderArea').message({title:'查询信息', comment:'反馈信息'});
    $('.dataRenderArea').message({placement:'before', fade:true});
    trMouseOverEvent();
    $('#starttime').val($.getDateString(0));
    $('#endtime').val($.getDateString());
    initOrganization();
    exportName = 'Intel 报表统计信息';
});

//----- 初始化 END -----------------------------------------------

