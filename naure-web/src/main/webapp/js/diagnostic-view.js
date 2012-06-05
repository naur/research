
var overlayNodes = {
    'Session': function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.show({content: '正在获取数据...'});

        $('article section:eq(1)').xmlAcquire({
            xmlUrl: '/diagnostic/session.xml',
            xslUrl: '/xsl/table.xsl',
            context: this,
            error:function (ex) {
                NAURE.Message.show({content:'获取数据结束！'});
                NAURE.Message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                $(obj.context).attr('disabled', false);
            },
            success:function(obj) {
                $(obj.context).attr('disabled', false);
                NAURE.Message.empty();
            }
        });
    },
    'Analysis': function () {
        $(this).attr('disabled', true);
        alert("A Analysis");
        $(this).attr('disabled', false);
    }
}

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('body').naure_ui_templet({name: 'templet1', success: function() {
        $('article section:eq(0)').message({placement:'append'});
        $('aside').overlay({
            nodes:overlayNodes
        });
    }});
});

/*-------------------- 初始化 END --------------------*/