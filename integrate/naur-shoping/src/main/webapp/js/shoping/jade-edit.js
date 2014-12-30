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
    searchUri: '/jade/get.json',
    addUri: '/jade/add.json',
    editUri: '/jade/edit.json',
    uploadOpt: {
        uploader: '/upload/file.json',
        swf: '/js/core/uploadify/uploadify.swf',
        folder: '/jade/',
        buttonText: '上传文件'
    },
    dom: {
        search: '#search',
        edit: '#edit',
        add: '#add',
        fileupload: '#jade_fileupload',
        fileuploadButton: '#jade_fileupload_btn',
        id: '#jade_id',
        name: '#jade_name',
        classify: '#jade_classify',
        title: '#jade_title',
        uri: '#jade_uri',
        description: '#jade_description',
        imgPreview: "#jade_img_preview",
        message: '.row:eq(1) .col-md-10'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

/**
 * 如果有入参，把值赋值给页面元素
 * 如果没有入参，把页面元素的值组合成 json 对象返回
 */
function parseParams(jade) {
    if (jade) {
        $(global.dom.id).val(jade.id);
        $(global.dom.name).val(jade.name);
        $(global.dom.classify).val(jade.classify);
        $(global.dom.title).val(jade.title);
        $(global.dom.uri).val(jade.uri);
        $(global.dom.description).val(jade.description);
    } else {
        return {
            id: $(global.dom.id).val(),
            name: $(global.dom.name).val(),
            classify: $(global.dom.classify).val(),
            title: $(global.dom.title).val(),
            uri: $(global.dom.uri).val(),
            description: $(global.dom.description).val()
        }
    }
}

function initUpload() {
    $(global.dom.fileupload).uploadify({
        swf: global.uploadOpt.swf,
        uploader: global.uploadOpt.uploader,
        formData: {
            folder: global.uploadOpt.folder,
            rename: true
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
            global.message.show({content: "选择文件【" + file.name + "】"});
        },
        onUploadStart: function (file) {
            $(global.dom.fileuploadButton).attr('disabled', true);
            global.message.show({content: "正在准备上传，请稍候... "});
        },
        onUploadError: function (file, errorCode, errorMsg, errorString) {
            global.message.show({content: '错误：' + file.name + ", " + errorString, color: 'red'});
            $(global.dom.fileuploadButton).attr('disabled', false);
        },
        onUploadSuccess: function (file, data, response) {
            var result = JSON.parse(data);
            $(global.dom.uri).val("/upload" + global.uploadOpt.folder + result.information.data);
            $(global.dom.imgPreview + ' img').attr('src', $(global.dom.uri).val());
            global.message.show({content: "上传文件【" + file.name + "】完成！"});
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

    $(global.dom.search).on('click', function () {
        var params = parseParams();
        if (!params.name) {
            //TODO
            return;
        }

        global.http.acquire({
            uri: global.utility.format(global.searchUri, params.name),
            data: params,
            success: function (obj) {
                parseParams(obj.output.information.data[0])
            },
            error: function (err) {
                //TODO
            }
        });
    });

    $(global.dom.edit).on('click', function () {
        var params = parseParams();
        if (!params.name) {
            //TODO
            return;
        }

        global.http.acquire({
            uri: global.editUri,
            data: params,
            success: function (obj) {
                //TODO
            },
            error: function (err) {
                //TODO
            }
        });
    });

    $(global.dom.add).on('click', function () {
        var params = parseParams();
        if (!params.name) {
            //TODO
            return;
        }

        global.http.acquire({
            uri: global.addUri,
            data: params,
            success: function (obj) {
                //TODO
            },
            error: function (err) {
                //TODO
            }
        });
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'jquery.uploadify', 'naur.http.ajax', 'naur.message'], function (mod) {
    global.utility = mod.naur.Utility;
    global.http = mod.naur.HTTP;
    global.message = mod.naur.Message;

    $(function () {
        $(global.dom.message).message({title: '上传文件', placement: 'prepend'});
        initEvent();
        initUpload();
    });
});

/*-------------------- 初始化 END --------------------*/