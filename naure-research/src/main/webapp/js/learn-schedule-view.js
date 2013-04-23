/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/9/12 7:03 PM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var naure, message, overlay, http, overlayNodes, messageElement, dataAreaElement, tableHead, gantt;
var startTime, endTime;
var uploadOpt = {
    'script':'/upload.xml',
    'scriptData':{
        'fileName':'learning-schedule.txt'
    },
    'uploader':'/js/uploadify/uploadify.swf',
    'cancelImg':'/js/uploadify/cancel.png',
    'folder':'/learn/',
    uploadDisplay: false
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

overlayNodes = {
    Heading:{
        html:'<input id="overlay-input-heading" type="text" />'
    },
    Number:{
        html:'<input id="overlay-input-number" type="text" />'
    },
    Path:{
        html:'<input id="overlay-input-path" type="text" />'
    },
    Time:{
        html:'<input id="overlay-input-time" type="text" />'
    },
    Add:function () {
        $(this).attr('disabled', true);
        $('article section').empty();
        message.empty();

        var schedule = {
            number:$('#overlay-input-number').val().trim(),
            heading:$('#overlay-input-heading').val().trim(),
            time:$('#overlay-input-time').val().trim(),
            path:$('#overlay-input-path').val().trim()
        };

        AddLearningSchedule(schedule, this);
    },
    Upload: function() {
        if (uploadOpt.uploadDisplay) {
            $('article section:eq(0)').css('display', 'none');
            $('article section:eq(1)').css('display', 'none');
        } else {
            $('article section:eq(0)').css('display', 'block');
            $('article section:eq(1)').css('display', 'block');
        }
        uploadOpt.uploadDisplay = !uploadOpt.uploadDisplay;
    },
    Get:function () {
        renderLearningSchedule(this);
    }
};

function formatURI(schedule) {
    var str = (schedule.id && schedule.id.length > 0 ? ',id=' + schedule.id : '') +
        ( !isNaN(parseInt(schedule.number)) ? ',number=' + schedule.number : '') +
        (!isNaN(parseInt(schedule.pages)) ? ',pages=' + schedule.pages : '') +
        (!isNaN(parseInt(schedule.days)) ? ',days=' + schedule.days : '') +
        (schedule.heading && schedule.heading.length > 0 ? ',heading=' + encodeURIComponent(schedule.heading) : '') +
        (schedule.time && schedule.time.length > 0 ? ',time=' + schedule.time : '');

    return str.substr(1);
}

function uploadify() {
    $('#fileupload').uploadify({
        'uploader':uploadOpt.uploader,
        'script':uploadOpt.script,
        'scriptData':uploadOpt.scriptData,
        fileDataName:'fileData', //设置一个名字，在服务器处理程序中根据该名字来取上传文件的数据。默认为Filedata
        'cancelImg':uploadOpt.cancelImg,
        'folder':uploadOpt.folder,
        'removeCompleted':true,
        'multi':true,
        'auto':false, //选定文件后是否自动上传，默认false
//        'fileExt':'*.xls;*.xlsx;*.csv',
//        'fileDesc':'Excel Files (.xls, .xlsx, .csv)', //这个属性值必须设置fileExt属性后才有效，用来设置选择文件对话框中的提示文本，如设置fileDesc为“请选择rar doc pdf文件”
        'onSelect':function (event, queueID, fileObj) { //选择上传文件时解发以下动作,   fileObj : 选择的文件对象，有name、size、creationDate、modificationDate、type 5个属性
            dataAreaElement.empty();
            message.empty();
            message.promptLine({content:"选择文件【" + fileObj.name + "】"});
        },
        'onSelectOnce':function (event, data) {  //在单文件或多文件上传时，选择文件时触发。
//            message.promptLine({content:
//                "fileCount: " + data.fileCount + "\t" +
//                    "filesReplaced:" + data.filesReplaced + "\t" +
//                    "filesSelected:" + data.filesSelected
//            });
        },
        'onOpen':function (event, queueId, fileObj) {
            $('#uploadfile').attr('disabled', true);
            message.promptLine({content:"正在准备上传，请稍候... "});
        },
        'onProgress':function (event, queueId, fileObj, data) {
            message.promptLine({content:"上传结束！ "});
            $('#uploadfile').attr('disabled', false);
        },
        'onComment':function (event, queueID, fileObj, response, data) {  //上传成功后动作
            message.promptLine({content:'onComment'});
        },
        'onCancel':function (event, queueId, fileObj, data) {
            message.promptLine({content:"取消上传【" + fileObj.name + "】", color:'red'});
        },
        'onComplete':function (even, queueId, fileObj, response, data) {
            message.promptLine({content:"上传文件【" + fileObj.name + "】完成！"});
            http.xmlAcquire({
                xml:response,
                //xslUrl:uploadOpt.uploadvalidXsl,
                error:function (ex) {
                    message.promptLine({content:JSON.stringify(ex.content), color:'red'});
                    $('#handle').css('display', 'none');
                },
                success:function (obj) {
                    $('#handle').css('display', 'inline');
                } });
            $('#uploadfile').attr('disabled', false);
        },
        'onAllComplete':function (event, data) {
            message.promptLine({content:data.filesUploaded + " files uploaded, " + data.errors + " errors."});
            $('#uploadfile').attr('disabled', false);
        },
        'onError':function (event, queueId, fileObj, errorObj) {
            message.promptLine({content:'错误：' + errorObj.info, color:'red'});
            $('#uploadfile').attr('disabled', false);
        }
    });
}

function renderChart() {
    var regex = /([\d]{4}-[\d]{2}-[\d]{2})[^\d]+([\d]{4}-[\d]{2}-[\d]{2})/;

    $('.chart').each(function () {
        var match = $(this).parent().parent().find('td:eq(4)').text().trim().match(regex);
        if (match) {
            if (!startTime || startTime.getTime() > new Date(match[1]).getTime())
                startTime = new Date(match[1]);
            if (!endTime || endTime.getTime() < new Date(match[2]).getTime())
                endTime = new Date(match[2]);
        }
    });

    $('.chart').each(function () {
        var match = $(this).parent().parent().find('td:eq(4)').text().trim().match(regex);
        if (match) {
            gantt.block({
                container:this,
                coordinate:{X1:startTime, X2:endTime,
                    Y1:new Date(match[1]),
                    Y2:new Date(match[2])}
            });
        } else {
            gantt.block({
                container:this,
                coordinate:{X1:startTime, X2:endTime, Y1:null, Y2:null}
            });
        }
    });
}

function AddLearningSchedule(schedule, context) {
    var xmlUrl;
    if (schedule.path && schedule.path.length > 0) {
        xmlUrl = '/learn/schedule/edit/' + schedule.path + '/' + formatURI(schedule) + ".xml";
    } else if (schedule.id && schedule.id.length > 0) {
        xmlUrl = '/learn/schedule/edit/' + formatURI(schedule) + ".xml";
    }

    if (!xmlUrl) {
        if (context)  message.show({content:'Input is empty.'});
        $(context).attr('disabled', false);
        return;
    }

    if (context) message.show({content:'Add Schedule ' + JSON.stringify(schedule)});
    http.xmlAcquire({
        xmlUrl:xmlUrl,
        //xslUrl:'/xsl/table.xsl',
        context:context,
        error:function (error) {
            if (error.context) $(error.context).attr('disabled', false);
            message.show({content:JSON.stringify(schedule) + JSON.stringify($.toJSON(error)), color:'red'});
        },
        success:function (obj) {
            if (context) message.show({content:'Add Schedule success.'});
            if (obj.context) $(obj.context).attr('disabled', false);

            message.show({content:JSON.stringify(schedule)});
        }
    });

}

function renderLearningSchedule(elem) {
    $(elem).attr('disabled', true);
    dataAreaElement.empty();
    message.empty();
    message.show({content:'正在获取数据...'});

    dataAreaElement.NAURE_HTTP_xmlAcquire({
        xmlUrl:'/learn/schedule/1.xml',
        xslUrl:'/xsl/learning-schedule.xsl',
        context:elem,
        error:function (ex) {
            message.show({content:'获取数据结束！'});
            message.show({content:'获取数据错误，请稍后重试！', color:'red'});
            $(ex.context).attr('disabled', false);
        },
        success:function (obj) {
            tableHead = {};
            $('table thead tr th').each(function (index, element) {
                tableHead[index] = $(element).text();
            });

            $(obj.context).attr('disabled', false);
            message.empty();

            renderChart();
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $('#uploadfile').on('click', function () {
        $('#fileupload').uploadifyUpload();
    });

    $('#handle').on('click', function () {
        dataAreaElement.empty();
        message.empty();
        message.show({content:'正在获取数据...'});
        $(this).attr('disabled', true);

        http.xmlAcquire({
            xmlUrl:'/upload/learn/learning-schedule.txt',
            context:this,
            dataType:'text',
            error:function (ex) {
                $(ex.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);

                var text = obj.output.split(/[\r\n]+/i);
                var schedule = null;
                for (var i = 0; i < text.length; i++) {
                    schedule = text[i].split('|');
                    if (schedule && schedule.length > 1) {
                        schedule = {
                            pages:schedule[0].trim(),
                            days:schedule[1].trim(),
                            time:schedule[2].trim(),
                            path:schedule[3].trim(),
                            heading:schedule[4].trim()
                        };
                        AddLearningSchedule(schedule)
                    } else {
                        message.show({content:JSON.stringify(schedule), color:'yellow'});
                    }
                }
            }
        });
    });

    $('table tbody tr td').live('dblclick', function () {
        if ($(this).find('input').size() > 0) {
            $(this).html($(this).find('input').val().trim());

            if ($(this).attr('tag') == $(this).text())
                return;
            else
                $(this).attr('tag', $(this).text());

            var tempSchedule = {};
            tempSchedule[tableHead[$(this).index()]] = $(this).text().trim();
            tempSchedule.id = $(this).parent().find('td:eq(8)').text().trim()
            message.empty();
            AddLearningSchedule(tempSchedule);
        } else {
            $(this).html('<input value="' + $(this).text() + '" />');
        }
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.analytics',
    'naure.xsl', 'naure.chart.gantt',
    'swfobject',
    'jquery.uploadify'], function ($, NAURE) {
    naure = NAURE;
    message = NAURE.Message;
    http = NAURE.HTTP;
    messageElement = $('article section:eq(3)');
    dataAreaElement = $('article section:eq(2)');
    gantt = NAURE.Chart.Gantt;

    $(function () {
        messageElement.message();
        $('body').overlay({
            nodes:overlayNodes
        });
    });

    initEvent();
    uploadify();
});

/*-------------------- 初始化 END --------------------*/