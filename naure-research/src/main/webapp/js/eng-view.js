/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              6/26/12 6:08 PM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/
var overlayNodes = {
    Add:{
        input:{type:'button', title:'Add Eng', value:'Add'},
        html:'<input type="text" />',
        handler:function () {
            $(this).attr('disabled', true);
            $('article section:eq(1)').empty();
            NAURE.Message.empty();

            var word = $(this).parent().next().next().children(':first-child').children(':first-child').val();
            if (word.length > 0) {
                NAURE.Message.show({content:'Add Eng ' + word + '...'});
                $('article section:eq(1)').NAURE_HTTP_xmlAcquire({
                    xmlUrl:'/learn/eng/add/' + word + ".xml",
                    xslUrl:'/xsl/table.xsl',
                    context:this,
                    error:function (error) {
                        $(error.context).attr('disabled', false);
                        NAURE.Message.show({content:'Error: ' + JSON.stringify($.toJSON(error)), color:'red'});
                    },
                    success:function (obj) {
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
    Get:function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.empty();
        NAURE.Message.show({content:'正在获取数据...'});

        $('article section:eq(1)').NAURE_HTTP_xmlAcquire({
            xmlUrl:'/learn/eng/get.xml',
            xslUrl:'/xsl/table.xsl',
            context:this,
            error:function (ex) {
                NAURE.Message.show({content:'获取数据结束！'});
                NAURE.Message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                $(obj.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);
                NAURE.Message.empty();
            }
        });
    },
    EngKoo:function () {
        //EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"}, EDictAreas:{def:"def", sen:"sen"}, ELogCategory:{err:"err:", sqm:"sqm:", flag:"flag:", entryFdbk:"entryFdbk:"}
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.empty();
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
    'iCIBA':function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.empty();
        NAURE.Message.show({content:'iCIBA...'});

        //            http://dict-co.iciba.com/api/dictionary.php?w=lambda
//                Xml标签说明：
//返回xml以<dict>开始以</dict>结束
//        Key 用户查询内容
//        Ps  音标
//        Pron 发音
//        Pos 词性
//        Acceptation 解释
//        Sent 短句
//        Orig 短句内容
//        Trans 翻译

        $(this).attr('disabled', false);
    }
}

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

$(function () {
    NAURE.Message.defaults.global.transparent = true;
    $('body').message({overlay:'left-bottom'});
    $('body').overlay({
        nodes:overlayNodes
    });

//    BingCW.Init({
//        AppID:"localhost",
//        ContentArea:"eng",
//        MachineTranslation:true,
//        WebDefinition:true
//    })
});

/*-------------------- 初始化 END --------------------*/