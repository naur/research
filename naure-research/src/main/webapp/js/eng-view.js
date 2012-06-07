//EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"}, EDictAreas:{def:"def", sen:"sen"}, ELogCategory:{err:"err:", sqm:"sqm:", flag:"flag:", entryFdbk:"entryFdbk:"}

var overlayNodes = {
    'Add':{
        input:{type:'button', title:'Add Eng'},
        html:'<input type="text" id="uri" value=""/>',
        handler:function () {
            alert('Add');
        }},
    'Get':function () {
        alert('Get');
        NAURE.HTTP.Request({
            uri:'http://dict.bing.com.cn/io.aspx?q=final&t=dict&ut=default&ulang=ZH-CN&tlang=EN-US',
            success:function (obj) {
                //var temp = JAM.parse(obj.http.responseText);

                //PROS
                //DEF
            }
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