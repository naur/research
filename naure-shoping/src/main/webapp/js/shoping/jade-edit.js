/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yihaodian.com
 * Date:
 *              2014/6/27 15:13
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var global = {
    uploadOpt: {
        'uploader': '/upload/file.json',
        'swf': '/js/core/uploadify/uploadify.swf',
        'folder': '/upload/jade'
    },
    dom: {
        fileupload: '#jade_fileupload',
        fileuploadButton: '#jade_fileupload_btn'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function initUpload() {
    $(global.dom.fileupload).uploadify({
        swf: global.uploadOpt.swf,
        uploader: global.uploadOpt.uploader,
        formData: 'fileData', //设置一个名字，在服务器处理程序中根据该名字来取上传文件的数据。默认为Filedata
        folder: global.uploadOpt.folder,
        removeCompleted: true,
        multi: true,
        auto: false, //选定文件后是否自动上传，默认false
        fileTypeExt: '*.xls;*.xlsx;*.csv',
        fileTypeDesc: 'Excel Files (.xls, .xlsx, .csv)', //fileTypeExt，用来设置选择文件对话框中的提示文本，如设置fileDesc为“请选择rar doc pdf文件”
        onSelect: function (file) {
        },
        onOpen: function (event, queueId, fileObj) {
            $(global.dom.fileuploadButton).attr('disabled', true);
            //NAURE.Message.promptLine({content: "正在准备上传，请稍候... "});
        },
        onProgress: function (event, queueId, fileObj, data) {
            //NAURE.Message.promptLine({content: "上传结束！ "});
            $(global.dom.fileuploadButton).attr('disabled', false);
        },
        onComment: function (event, queueID, fileObj, response, data) {  //上传成功后动作
            //NAURE.Message.promptLine({content: 'onComment'});
        },
        onCancel: function (event, queueId, fileObj, data) {
            //NAURE.Message.promptLine({content: "取消上传【" + fileObj.name + "】", color: 'red'});
        },
        onComplete: function (even, queueId, fileObj, response, data) {
            //NAURE.Message.promptLine({content: "上传文件【" + fileObj.name + "】完成！"});
//            NAURE.HTTP.acquire({ xml: response, xslUrl: uploadOpt.uploadvalidXsl,
//                error: function (ex) {
//                    NAURE.Message.promptLine({content: JSON.stringify(ex.content), color: 'red'});
//                },
//                success: function (obj) {
//                    var notificationIndex = 1;
//                    $('#makeorder').hide();
//                    var jsonArray = $.parseJSON(obj.output.replace('},]', '}]'));
//                    if (jsonArray.length <= 0) {
//                        NAURE.Message.promptLine({
//                            content: '上传文件的过程中发生异常了，请稍候重试！',
//                            color: 'red'
//                        });
//                        return false;
//                    }
//                    if (jsonArray[0].fileName != undefined) {
//                        $('#makeorder').attr('tag', jsonArray[0].fileName);
//                    } else {
//                        notificationIndex = 0;
//                    }
//
//                    if ($('#makeorder').attr('tag') == null) {
//                        NAURE.Message.promptLine({
//                            content: '上传的文件有错误，请根据错误提示修改文件后再重新上传！',
//                            color: 'red'
//                        });
//                    } else {
//                        if (jsonArray.length > 1) {
////                            NAURE.Message.promptLine({
////                                content:  '上传的文件有错误，请 <a href="../upload/' + $('#makeorder').attr('tag') + '">下载文件</a> 修改后再重新上传！',
////                                color: 'red'
////                            });
//                            NAURE.Message.promptLine({
//                                content: '上传的文件有错误，请修改文件后再重新上传！',
//                                color: 'red'
//                            });
//                        } else {
//                            $('#makeorder').show();
//                            $('#makeorder').attr('disabled', false);
//                            $(global.dom.fileuploadButton).attr('disabled', false);
//                        }
//                    }
//
//                    //显示错误信息
//                    for (i = notificationIndex; i < jsonArray.length; i++) {
//                        NAURE.Message.promptLine({
//                            content: jsonArray[i].cell + '：' + jsonArray[i].error,
//                            color: 'red'
//                        });
//                    }
//                } });
            $(global.dom.fileuploadButton).attr('disabled', false);
        },
        onAllComplete: function (event, data) {
            //NAURE.Message.promptLine({content: data.filesUploaded + " files uploaded, " + data.errors + " errors."});
            $(global.dom.fileuploadButton).attr('disabled', false);
        },
        onError: function (event, queueId, fileObj, errorObj) {
            //NAURE.Message.promptLine({content: '错误：' + errorObj.info, color: 'red'});
            $(global.dom.fileuploadButton).attr('disabled', false);
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(global.dom.fileuploadButton).on('click', function () {
        $(global.dom.fileupload).uploadifyUpload()
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'jquery.uploadify', 'naure.http.ajax'], function (LOADING) {
    global.http = LOADING.naure.HTTP;
    $(function () {
        initEvent
        initUpload();
    });
});

/*-------------------- 初始化 END --------------------*/