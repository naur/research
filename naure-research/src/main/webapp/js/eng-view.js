JAM = {
    EVPageTypes:{dict:"dict", dictComp:"dcomp", home:"home", didYouMean:"dym", err:"err"},
    EDictAreas:{def:"def", sen:"sen"},
    parseJsonToObj:function (f, c, b, d, e) {
        var a = JAM.parse(f);
        if (!a)return false;
        if (e)if (a.ROOT && a.ROOT[b])this.getData(c).ROOT[e] = a.ROOT[b]; else return false; else if (d)if (a.ROOT && a.ROOT[b])this.getData(c).ROOT[d] = a.ROOT[b]; else return false; else this.setData(a);
        return true
    },
    parse:function (a) {
        var b = null;
        if (a && typeof a == "string" && a.length > 0)if (window.JSON && window.JSON.parse)try {
            b = window.JSON.parse(a)
        } catch (c) {
        } else b = !/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(a.replace(/"(\\.|[^"\\])*"/g, "")) && eval("(" + a + ")");
        return b
    }
};

var overlayNodes = {
    'get':function () {
        NAURE.HTTP.Request({
            uri:'http://dict.bing.com.cn/io.aspx?q=final&t=dict&ut=default&ulang=ZH-CN&tlang=EN-US',
            success:function (obj) {

            }
        });
    },
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
    $('body').naure_ui_templet({name:'templet1', success:function () {
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