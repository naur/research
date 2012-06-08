//EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"}, EDictAreas:{def:"def", sen:"sen"}, ELogCategory:{err:"err:", sqm:"sqm:", flag:"flag:", entryFdbk:"entryFdbk:"}

var overlayNodes = {
    Add:{
        input:{type:'button', title:'Add Eng', value:'Add'},
        html:'<input type="text"  value=""/>',
        handler:function () {
            $(this).attr('disabled', true);
            $('article section:eq(1)').empty();

            if ($(this).parent().next().next().children(':first-child').val().length > 0) {
                NAURE.Message.show({content:'Add Eng ' + $(this).next().next().children(':first-child').val() + '...'});
                $('article section:eq(1)').NAURE_HTTP_xmlAcquire({
                    xmlUrl: '/learn/eng/add/' + $(this).next().next().children(':first-child').val() + ".xml",
                    xslUrl: '/xsl/table.xsl',
                    context: this,
                    error: function(error) {
                        $(error.context).attr('disabled', false);
                        NAURE.Message.show({content:'Error: ' + JSON.stringify($.toJSON(error)), color: 'red'});
                    },
                    success: function(obj) {
                        NAURE.Message.show({content:'Add eng success.'});
                        $(obj.context).attr('disabled', false);
                    }
                });
            }
            else {
                NAURE.Message.show({content:'Input is empty.'});
                $(this).attr('disabled', false);
            }
        }},
    Get: function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.show({content: '正在获取数据...'});

        $('article section:eq(1)').NAURE_HTTP_xmlAcquire({
            xmlUrl: '/learn/eng/get.xml',
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
    EngKoo:function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.show({content:'Get Data...'});

        NAURE.HTTP.Request({
            uri:'http://dict.bing.com.cn/io.aspx?q=final&t=dict&ut=default&ulang=ZH-CN&tlang=EN-US',
            context:this,
            error:function (error) {
                $(error.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);
                //var temp = JAM.parse(obj.http.responseText);

                //PROS
                //DEF
            }
        });
    },
    'Analysis':function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.show({content:'Analysis...'});
        $(this).attr('disabled', false);
    }
}

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('body').naure_ui_templet({name:'overlay', success:function () {
        $('article section:eq(0)').message({placement:'append'});
        $('nav').overlay({
            nodes:overlayNodes
        });
    }});

//    BingCW.Init({
//        AppID:"localhost",
//        ContentArea:"eng",
//        MachineTranslation:true,
//        WebDefinition:true
//    })
});

/*-------------------- 初始化 END --------------------*/