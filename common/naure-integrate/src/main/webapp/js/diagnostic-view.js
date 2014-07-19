/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/6/12 9:49 AM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/
var naure, message;

var overlayNodes = {
    'Session':function () {
        $(this).attr('disabled', true);
        $('article section:eq(1)').empty();
        message.show({content:'正在获取数据...'});

        $('article section:eq(1)').NAURE_HTTP_Acquire({
            xmlUrl:'/diagnostic/session.xml',
            xslUrl:'/xsl/table.xsl',
            context:this,
            error:function (ex) {
                message.show({content:'获取数据结束！'});
                message.show({content:'获取数据错误，请稍后重试！', color:'red'});
                $(obj.context).attr('disabled', false);
            },
            success:function (obj) {
                $(obj.context).attr('disabled', false);
                message.empty();
            }
        });
    },
    'Analysis':function () {
        $(this).attr('disabled', true);
        alert("A Analysis");
        $(this).attr('disabled', false);
    }
}

/*-------------------- 初始化 START --------------------*/

require(['jquery', 'naure.message', 'naure.ui.overlay', 'naure.http.xsl', 'naure.analytics'], function ($, NAURE) {
    naure = NAURE;
    message = NAURE.Message;

    $(function () {
        $('article section:eq(0)').message();
        $('body').overlay({
            nodes:overlayNodes
        });
    });
});

/*-------------------- 初始化 END --------------------*/