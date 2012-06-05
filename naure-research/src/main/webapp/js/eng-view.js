//EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"}, EDictAreas:{def:"def", sen:"sen"}, ELogCategory:{err:"err:", sqm:"sqm:", flag:"flag:", entryFdbk:"entryFdbk:"}

var overlayNodes = {
    'get':{
        input:{type: 'button', title: 'Add Eng'},
        html:' <fieldset>' +
            '<legend>Method, Content-Type</legend>' +
            '<input type="text" id="uri" value=""/>' +
            '</fieldset>',
        'handler':function () {
            NAURE.HTTP.Request({
                uri:'http://dict.bing.com.cn/io.aspx?q=final&t=dict&ut=default&ulang=ZH-CN&tlang=EN-US',
                success:function (obj) {
                    //var temp = JAM.parse(obj.http.responseText);

                    //PROS
                    //DEF
                }
            });
        }},
    'List':function () {
        $('article section:eq(1)').xmlAcquire({
            xmlUrl:'/diagnostic/session.xml',
            xslUrl:'/xsl/table.xsl'
        });
    },
    'Analysis':function () {
        alert("A Analysis");
    }
}

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('body').naure_ui_templet({name:'overlay', success:function () {
        $('article section:eq(0)').message({placement:'append'});
        $('aside').overlay({
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