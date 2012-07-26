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
var NAURE;
var overlayNodes = {
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
    Add:function () {
        var question = confirm("添加?");
        if (question == false)
            return;

        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.empty();

        //var word = $(this).parent().next().next().children(':first-child').children(':first-child').val();
        var word = $('#overlay-input').val();
        if (word.length > 0) {
            NAURE.Message.show({content:'Add Eng ' + word + '...'});
            $('article section:eq(1)').NAURE_HTTP_xmlAcquire({
                xmlUrl:'/learn/eng/' + word + "/add.xml",
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
    },
    Input:{
        html:'<input id="overlay-input" type="text" />'
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
            },
            success:function (obj) {
            }
        });
    },
    'iCIBA':function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.empty();
        NAURE.Message.show({content:'iCIBA...'});
        var word = $('#overlay-input').val();
        if (word.length <= 0) {
            NAURE.Message.show({content:'Error: Empty', color:'red'});
            $(this).attr('disabled', false);
            return;
        }
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
        NAURE.Message.show({content:'http://dict-co.iciba.com/api/dictionary.php?w=' + word.toLowerCase(), color:'red'});
        NAURE.Message.position('relative');
        NAURE.HTTP.Request({
            uri:'http://dict-co.iciba.com/api/dictionary.php?w=' + word.toLowerCase(),
            context:this,
            changed:function (obj) {
                NAURE.Message.show({content:'State: ' + obj.state + ', ' + obj.http.status + ' ' + obj.http.statusText});
            },
            error:function (error) {
                NAURE.Message.show({content:'Error', color:'red'});
            },
            success:function (obj) {
            },
            htmlParser:{delegate:function (option) {
                option.content = option.content.replace(/null/gi, '<span style="color:red">null</span>');
                NAURE.Message.show(option);
            }}
        });
    }
}

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/
/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.http', 'naure.analytics'], function ($, NAURE) {
    this.NAURE = NAURE;
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
});

/*-------------------- 初始化 END --------------------*/

