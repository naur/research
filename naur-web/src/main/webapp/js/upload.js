//----- 　Script：贾睿之　--------------------------------------------
//----- 　Email：jiaruizhi@360buy.com　---------------------------
//----- 　提供通用上传处理逻辑　---------------------------

//----- 全局变量 START -----------------------------------------------

var action;
var uploadOpt = {
    'uploader': '/upload/file.json',
    'swf': '/js/core/uploadify/uploadify.swf',
    'cancelImg': '/js/core/uploadify/uploadify-cancel.png',
    'folder': '/upload/file',
    'uploadvalidXsl': '/xsl/uploadvalid.xsl',
    'makevalidXsl': '/xsl/makevalid.xsl',
    'handler': function () {
        return '/' + action + '.action'
    }
}

//----- 全局变量 END -----------------------------------------------

//----- 事件 START -----------------------------------------------


function init() {
    $(function () {
        $('.fileuploadbox').message({title: '上传文件', comment: '反馈信息'});

        $('#fileupload').uploadify({
            'uploader': uploadOpt.uploader,
            'swf': uploadOpt.swf,
            fileDataName: 'fileData', //设置一个名字，在服务器处理程序中根据该名字来取上传文件的数据。默认为Filedata
            'cancelImg': uploadOpt.cancelImg,
            'folder': uploadOpt.folder,
            'removeCompleted': true,
            'multi': true,
            'auto': false, //选定文件后是否自动上传，默认false
            'fileExt': '*.xls;*.xlsx;*.csv',
            'fileDesc': 'Excel Files (.xls, .xlsx, .csv)', //这个属性值必须设置fileExt属性后才有效，用来设置选择文件对话框中的提示文本，如设置fileDesc为“请选择rar doc pdf文件”
            'onSelect': function (event, queueID, fileObj) { //选择上传文件时解发以下动作,   fileObj : 选择的文件对象，有name、size、creationDate、modificationDate、type 5个属性
                NAUR.Message.empty();
                NAUR.Message.promptLine({content: "选择文件【" + fileObj.name + "】"});
                $('#makeorder').hide();
            },
            'onSelectOnce': function (event, data) {  //在单文件或多文件上传时，选择文件时触发。
//            NAUR.Message.promptLine({content:
//                "fileCount: " + data.fileCount + "\t" +
//                    "filesReplaced:" + data.filesReplaced + "\t" +
//                    "filesSelected:" + data.filesSelected
//            });
            },
            'onOpen': function (event, queueId, fileObj) {
                $('#uploadfile').attr('disabled', true);
                NAUR.Message.promptLine({content: "正在准备上传，请稍候... "});
            },
            'onProgress': function (event, queueId, fileObj, data) {
                NAUR.Message.promptLine({content: "上传结束！ "});
                $('#uploadfile').attr('disabled', false);
            },
            'onComment': function (event, queueID, fileObj, response, data) {  //上传成功后动作
                NAUR.Message.promptLine({content: 'onComment'});
            },
            'onCancel': function (event, queueId, fileObj, data) {
                NAUR.Message.promptLine({content: "取消上传【" + fileObj.name + "】", color: 'red'});
            },
            'onComplete': function (even, queueId, fileObj, response, data) {
                NAUR.Message.promptLine({content: "上传文件【" + fileObj.name + "】完成！"});
                NAUR.HTTP.acquire({ xml: response, xslUrl: uploadOpt.uploadvalidXsl,
                    error: function (ex) {
                        NAUR.Message.promptLine({content: JSON.stringify(ex.content), color: 'red'});
                    },
                    success: function (obj) {
                        var notificationIndex = 1;
                        $('#makeorder').hide();
                        var jsonArray = $.parseJSON(obj.output.replace('},]', '}]'));
                        if (jsonArray.length <= 0) {
                            NAUR.Message.promptLine({
                                content: '上传文件的过程中发生异常了，请稍候重试！',
                                color: 'red'
                            });
                            return false;
                        }
                        if (jsonArray[0].fileName != undefined) {
                            $('#makeorder').attr('tag', jsonArray[0].fileName);
                        } else {
                            notificationIndex = 0;
                        }

                        if ($('#makeorder').attr('tag') == null) {
                            NAUR.Message.promptLine({
                                content: '上传的文件有错误，请根据错误提示修改文件后再重新上传！',
                                color: 'red'
                            });
                        } else {
                            if (jsonArray.length > 1) {
//                            NAUR.Message.promptLine({
//                                content:  '上传的文件有错误，请 <a href="../upload/' + $('#makeorder').attr('tag') + '">下载文件</a> 修改后再重新上传！',
//                                color: 'red'
//                            });
                                NAUR.Message.promptLine({
                                    content: '上传的文件有错误，请修改文件后再重新上传！',
                                    color: 'red'
                                });
                            } else {
                                $('#makeorder').show();
                                $('#makeorder').attr('disabled', false);
                                $('#uploadfile').attr('disabled', false);
                            }
                        }

                        //显示错误信息
                        for (i = notificationIndex; i < jsonArray.length; i++) {
                            NAUR.Message.promptLine({
                                content: jsonArray[i].cell + '：' + jsonArray[i].error,
                                color: 'red'
                            });
                        }
                    } });
                $('#uploadfile').attr('disabled', false);
            },
            'onAllComplete': function (event, data) {
                NAUR.Message.promptLine({content: data.filesUploaded + " files uploaded, " + data.errors + " errors."});
                $('#uploadfile').attr('disabled', false);
            },
            'onError': function (event, queueId, fileObj, errorObj) {
                NAUR.Message.promptLine({content: '错误：' + errorObj.info, color: 'red'});
                $('#uploadfile').attr('disabled', false);
            }
        });

        $('#makeorder').on('click', function () {
            $('#makeorder').attr('disabled', true);
            NAUR.Message.showLine({content: '正在处理文档，请稍候...... '});

            NAUR.HTTP.acquire({
                xmlUrl: uploadOpt.handler(),
                //xslUrl: uploadOpt.makevalidXsl,
                optionData: {
                    'newFileName': $('#makeorder').attr('tag')
                },
                error: function (ex) {
//                alert("更新数据错误！错误信息如下：\r\n" + jqXHR.responseText);
                    NAUR.Message.showLine({content: '处理文档的过程中有异常发生了！ ', color: 'red'});
                    NAUR.Message.showLine({content: $.stringify(ex), color: 'red'});
                    $('#makeorder').attr('disabled', false);
                },
                success: function (obj) {
                    NAUR.Message.showLine({content: '处理文档结束！ '});
                    $('#makeorder').hide();
                    $('#makeorder').removeAttr('tag');
                    $('#makeorder').attr('disabled', false);

                    if (obj.output == null || obj.output.length <= 0) {
                        return true;
                    }

                    var searchKey = 'result item';

                    if ($(obj.output).find(searchKey).length > 0) {
                        NAUR.Message.showLine({content: '-------------处理文档结束，详细信息如下：---------------'});
                    }

                    $(obj.output).find(searchKey + ' level:not(:contains("error"))').each(function (index, data) {
                        NAUR.Message.showLine({content: $(this).parent().find("body message").text()});
                    });

                    $(obj.output).find(searchKey + ' level:contains("error")').each(function (index, data) {
                        NAUR.Message.showLine({
                            content: '【' + $(this).parent().find('body column').text() + $(this).parent().find('body row').text() + '】：' + $(this).parent().find("body message").text(),
                            color: 'red'
                        });
                    });

//                $(obj.output).find(searchKey + ' level:contains("error")').each(function(index, data) {
//                    if ('error' != $(this).find("level").text()) {
//                        NAUR.Message.showLine({content:  $(this).find("body message").text()});
//                    } else {
//                        NAUR.Message.showLine({
//                            content:  '【' + $(this).find('body column').text() + $(this).find('body row').text() + '】：' + $(this).find("body message").text(),
//                            color: 'red'
//                        });
//                    }
//                });

//                //NAUR.Message.promptLine({content: JSON.stringify(obj.output), color: 'orange'});
//                //var jsonArray = $.parseJSON(obj.output);
//                if (jsonArray.length > 0) {
//                    //NAUR.Message.showLine({content: '处理文档的过程中有异常发生了！ ', color: 'red'});
//                    NAUR.Message.showLine({content: '-------------处理文档结束，详细信息如下：---------------'});
//                }
//                //显示信息, 包含已经成功生成的采购单号 和 错误信息
//                for (i = 0; i < jsonArray.length; i++) {
//                    if (jsonArray[i].level == 'success') {
//                        //if (jsonArray[i].error == null || jsonArray[i].error == 'null') {
//                        NAUR.Message.showLine({content:  jsonArray[i].message});
//                    } else {
//                        NAUR.Message.showLine({
//                            content:  jsonArray[i].cell + '：' + jsonArray[i].message,
//                            color: 'red'
//                        });
//                    }
//                }
                }
            });
            return false;
        });

    });
}

//----- 事件 END -----------------------------------------------


//----- 初始化 START -----------------------------------------------

require(['jquery', 'naur.message', 'jquery.uploadify'], function ($, NAUR) {

    this.NAUR = NAUR;
    $(function () {
        $('#makeorder').removeAttr('tag');
        $('#makeorder').hide();
        //action = location.search.replace('?', '');
        //action = $.query.get('action');
        //if ($.query.get('template')) {
        $('#template').attr('href', '/' + 'aaa');
        $('#template').show();
        //}
    });

    init();
});


//----- 初始化 END -----------------------------------------------