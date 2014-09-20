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
var global = {
    ONEDAY: 24 * 60 * 60 * 1000,
    startTime: null,
    endTime: null,
    uploadOpt: {
        'uploader': '/upload/file.xml',
        'scriptData': {
            'fileName': 'learning-schedule.txt'
        },
        'swf': '/js/core/uploadify/uploadify.swf',
        'cancelImg': '/js/core/uploadify/cancel.png',
        'folder': '/learn/',
        uploadDisplay: false
    },
    dom: {
        uploadFileBtn: '#uploadfile',
        handleBtn: '#handle',
        add: '#add',
        upload: '#upload',
        get: '#get',
        fileupload: '#fileupload'
    }
};
var overlay, overlayNodes, tableHead;


/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

//    Heading: {
//        html: '<input id="overlay-input-heading" type="text" />'
//    },
//    Number: {
//        html: '<input id="overlay-input-number" type="text" />'
//    },
//    Path: {
//        html: '<input id="overlay-input-path" type="text" />'
//    },
//    Time: {
//        html: '<input id="overlay-input-time" type="text" />'
//    }

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
    $(global.dom.fileupload).uploadify({
        height: 30, width: 120, debug: false,
        auto: false, removeCompleted: true, multi: false,
        fileTypeDesc: '学习计划书...', fileTypeExts: '*.txt',
        fileObjName: 'fileData', //设置一个名字，在服务器处理程序中根据该名字来取上传文件的数据。默认为 Filedata
        formData: {
            folder: global.uploadOpt.folder
        },
        buttonText: 'Schedule Test',
        swf: global.uploadOpt.swf,
        uploader: global.uploadOpt.uploader,
        onSelect: function (file) { //选择上传文件时解发以下动作,   file : 选择的文件对象，有name、size、creationDate、modificationDate、type 5个属性
            global.dataAreaElement.empty();
            global.message.empty();
            global.message.promptLine({content: "选择文件【" + file.name + "】"});
        },
        onCancel: function (file) {
            global.message.promptLine({content: "取消上传【" + file.name + "】", color: 'red'});
        },
        onUploadStart: function (file) {
            //$(global.dom.fileupload).uploadify("settings", "someOtherKey", 2);
            $(global.dom.uploadFileBtn).attr('disabled', true);
            global.message.promptLine({content: "正在准备上传，请稍候... "});
        },
        onUploadProgress: function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            $('#progress').html(totalBytesUploaded + ' bytes uploaded of ' + totalBytesTotal + ' bytes.');
        },
        onUploadSuccess: function (file, data, response) {
            global.message.promptLine({content: "上传结束！ "});
            $(global.dom.uploadFileBtn).attr('disabled', false);
            //TODO 返回数据处理
//            global.http.acquire({
//                xml: response,
//                //xslUrl:global.uploadOpt.uploadvalidXsl,
//                error: function (ex) {
//                    global.message.promptLine({content: JSON.stringify(ex.content), color: 'red'});
//                    $('#handle').css('display', 'none');
//                },
//                success: function (obj) {
//                    $('#handle').css('display', 'inline');
//                }});
//            $('#uploadfile').attr('disabled', false);
        },
        onUploadError: function (file, errorCode, errorMsg, errorString) {
            global.message.promptLine({content: '错误：' + errorString, color: 'red'});
            $(global.dom.uploadFileBtn).attr('disabled', false);
        },
        onQueueComplete: function (queueData) {
            global.message.promptLine({content: queueData.uploadsSuccessful + ' files were successfully uploaded, ' + queueData.uploadsErrored + " errors."});
            $(global.dom.uploadFileBtn).attr('disabled', false);
        },
        onUploadComplete: function (file) {
            global.message.promptLine({content: "上传文件【" + file.name + "】完成！"});
        }
    });
}

function renderChart() {
    var regex = /([\d]{4}-[\d]{2}-[\d]{2})[^\d]+([\d]{4}-[\d]{2}-[\d]{2})/;

    $('.chart').each(function () {
        var match = $(this).parent().parent().find('td:eq(4)').text().trim().match(regex);
        if (match) {
            if (!global.startTime || global.startTime.getTime() > new Date(match[1]).getTime())
                global.startTime = new Date(match[1]);
            if (!global.endTime || global.endTime.getTime() < new Date(match[2]).getTime())
                global.endTime = new Date(match[2]);
        }
    });

    global.startTime = new Date();
    global.startTime.setDate(1);
    global.endTime = new Date();
    global.endTime.setMonth(global.endTime.getMonth() + 1);
    global.endTime.setDate(1);
    global.endTime = new Date(global.endTime - global.ONEDAY);

    $('.chart').each(function () {
        var match = $(this).parent().parent().find('td:eq(4)').text().trim().match(regex);
        if (match &&
            new Date(match[1]) >= global.startTime &&
            new Date(match[1]) <= global.endTime &&
            new Date(match[2]) >= global.startTime &&
            new Date(match[2]) <= global.endTime) {
            global.gantt.block({
                container: this,
                coordinate: {X1: global.startTime, X2: global.endTime,
                    Y1: new Date(match[1]),
                    Y2: new Date(match[2])}
            });
        } else {
            global.gantt.block({
                container: this,
                coordinate: {X1: global.startTime, X2: global.endTime, Y1: null, Y2: null}
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
        if (context)  global.message.show({content: 'Input is empty.'});
        $(context).attr('disabled', false);
        return;
    }

    if (context) global.message.show({content: 'Add Schedule ' + JSON.stringify(schedule)});
    global.http.acquire({
        xmlUrl: xmlUrl,
        //xslUrl:'/xsl/table.xsl',
        context: context,
        error: function (error) {
            if (error.context) $(error.context).attr('disabled', false);
            global.message.show({content: JSON.stringify(schedule) + JSON.stringify($.toJSON(error)), color: 'red'});
        },
        success: function (obj) {
            if (context) global.message.show({content: 'Add Schedule success.'});
            if (obj.context) $(obj.context).attr('disabled', false);

            global.message.show({content: JSON.stringify(schedule)});
        }
    });

}

function renderLearningSchedule(elem) {
    $(elem).attr('disabled', true);
    global.dataAreaElement.empty();
    global.message.empty();
    global.message.show({content: '正在获取数据...'});

    //todo url:  /learn/schedule/1,2,3.xml
    global.dataAreaElement.NAURE_HTTP_Acquire({
        xmlUrl: '/learn/schedule/' + (location.search ? location.search.substr(1) : 1) + '.xml',
        xslUrl: '/xsl/learning-schedule.xsl',
        context: elem,
        error: function (ex) {
            global.message.show({content: '获取数据结束！'});
            global.message.show({content: '获取数据错误，请稍后重试！', color: 'red'});
            $(ex.context).attr('disabled', false);
        },
        success: function (obj) {
            tableHead = {};
            $('table thead tr th').each(function (index, element) {
                tableHead[index] = $(element).text();
            });

            $(obj.context).attr('disabled', false);
            global.message.empty();

            renderChart();
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(global.dom.uploadFileBtn).on('click', function () {
        $(global.dom.fileupload).uploadify("upload");
    });

    $(global.dom.handleBtn).on('click', function () {
        global.dataAreaElement.empty();
        global.message.empty();
        global.message.show({content: '正在获取数据...'});
        $(this).attr('disabled', true);

        global.http.acquire({
            xmlUrl: '/upload/learn/learning-schedule.txt',
            context: this,
            dataType: 'text',
            error: function (ex) {
                $(ex.context).attr('disabled', false);
            },
            success: function (obj) {
                $(obj.context).attr('disabled', false);

                var text = obj.output.split(/[\r\n]+/i);
                var schedule = null;
                var timeStart = null, timeEnd = null;
                for (var i = 0; i < text.length; i++) {
                    schedule = text[i].split('|');
                    if (schedule && schedule.length > 1) {
                        schedule = {
                            pages: schedule[0].trim(),
                            days: schedule[1].trim(),
                            time: schedule[2].trim(),
                            path: schedule[3].trim(),
                            heading: schedule[4].trim()
                        };

                        //todo
                        if (!isNaN(parseInt(schedule.time))) {
                            timeStart = new Date(schedule.time);
                        }
                        if (timeStart && !isNaN(parseInt(schedule.days))) {
                            timeEnd = new Date(timeStart.getTime() + (parseInt(schedule.days) - 1) * global.ONEDAY)
                            schedule.time = timeStart.format('yyyy-MM-dd') + " -> " + timeEnd.format('yyyy-MM-dd');
                            timeStart = new Date(timeEnd.getTime() + global.ONEDAY);
                        }

                        AddLearningSchedule(schedule)
                    } else {
                        global.message.show({content: JSON.stringify(schedule), color: 'yellow'});
                    }
                }
            }
        });
    });

    $(document).on('dblclick', 'table tbody tr td', function () {
        if ($(this).find('input').size() > 0) {
            $(this).html($(this).find('input').val().trim());

            if ($(this).attr('tag') == $(this).text())
                return;
            else
                $(this).attr('tag', $(this).text());

            var tempSchedule = {};
            tempSchedule[tableHead[$(this).index()]] = $(this).text().trim();
            tempSchedule.id = $(this).parent().find('td:eq(8)').text().trim()
            global.message.empty();
            AddLearningSchedule(tempSchedule);
        } else {
            $(this).html('<input value="' + $(this).text() + '" />');
        }
    });

    $(global.dom.upload).on('click', function () {
        if (global.uploadOpt.uploadDisplay) {
            $('article section:eq(0)').css('display', 'none');
            $('article section:eq(1)').css('display', 'none');
        } else {
            $('article section:eq(0)').css('display', 'block');
            $('article section:eq(1)').css('display', 'block');
        }
        global.uploadOpt.uploadDisplay = !global.uploadOpt.uploadDisplay;
    });
    $(global.dom.get).on('click', function () {
        renderLearningSchedule(this);
    });
    $(global.dom.add).on('click', function () {
        $(this).attr('disabled', true);
        $('article section').empty();
        global.message.empty();

        var schedule = {
            number: $('#overlay-input-number').val().trim(),
            heading: $('#overlay-input-heading').val().trim(),
            time: $('#overlay-input-time').val().trim(),
            path: $('#overlay-input-path').val().trim()
        };

        AddLearningSchedule(schedule, this);
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require([ 'loading', 'research-template', 'naure.chart.gantt', 'jquery.uploadify'], function (mod, $1) {
    global.message = mod.naure.Message;
    global.http = mod.naure.HTTP;
    global.utility = mod.naure.Utility;
    global.gantt = mod.naure.Chart.Gantt;

    global.messageElement = $('article section:eq(3)');
    global.dataAreaElement = $('article section:eq(2)');

    $(function () {
        global.messageElement.message();
    });

    initEvent();
    uploadify();
});

/*-------------------- 初始化 END --------------------*/