//EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"}, EDictAreas:{def:"def", sen:"sen"}, ELogCategory:{err:"err:", sqm:"sqm:", flag:"flag:", entryFdbk:"entryFdbk:"}

var overlayNodes = {
    Add:{
        input:{type:'button', title:'Add Eng', value: 'Add', onclock: 'overlayNodes.Add.handler();'},
        html:'<input type="text"  value=""/>',
        handler:function () {
            $(this).attr('disabled', true);
            $('article section:eq(1)').empty();
            NAURE.Message.show({content: '正在获取数据...'});
            alert('Add');
        }},
    Get:function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.show({content: 'Get Data...'});

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
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        NAURE.Message.show({content: 'Analysis...'});

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