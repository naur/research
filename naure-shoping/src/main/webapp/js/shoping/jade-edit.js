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
        uploader: '/upload/file.json',
        swf: '/js/core/uploadify/uploadify.swf',
        folder: '/jade',
        buttonText: '选择文件'
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
        formData: {
            folder: global.uploadOpt.folder,
            rename: false
        },
        fileObjName: 'fileData', //设置一个名字，在服务器处理程序中根据该名字来取上传文件的数据。默认为Filedata
        folder: global.uploadOpt.folder,
        buttonText: global.uploadOpt.buttonText,
        removeCompleted: true,
        multi: true,
        auto: true, //选定文件后是否自动上传，默认false
        fileTypeExt: '*.xls;*.xlsx;*.csv',
        fileTypeDesc: 'Excel Files (.xls, .xlsx, .csv)', //fileTypeExt，用来设置选择文件对话框中的提示文本，如设置fileDesc为“请选择rar doc pdf文件”
        onSelect: function (file) {
            global.message.empty();
            global.message.promptLine({content: "选择文件【" + file.name + "】"});
        },
        onUploadStart: function (file) {
            $(global.dom.fileuploadButton).attr('disabled', true);
            global.message.promptLine({content: "正在准备上传，请稍候... "});
        },
        onUploadError: function (file, errorCode, errorMsg, errorString) {
            global.message.promptLine({content: '错误：' + file.name + ", " + errorString, color: 'red'});
            $(global.dom.fileuploadButton).attr('disabled', false);
        },
        onUploadSuccess: function (file, data, response) {
            global.message.promptLine({content: "上传文件【" + file.name + "】完成！"});
            $(global.dom.fileuploadButton).attr('disabled', false);
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {
    $(global.dom.fileuploadButton).on('click', function () {
        $(global.dom.fileupload).uploadify('upload', '*');
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'jquery.uploadify', 'naure.http.ajax', 'naure.message'], function (mod) {
    global.http = mod.naure.HTTP;
    global.message = mod.naure.Message;

    $(function () {
        $(global.dom.fileuploadButton).message({title: '上传文件', placement: 'after'});
        initEvent();
        initUpload();
    });
});

/*-------------------- 初始化 END --------------------*/