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
var global = {
    http: null,
    message: null,
    sessionUri: '/diagnostic/session.xml',
    dom: {
        session: 'article section:eq(1)'
    }
};

var overlayNodes = {
    'Session': function () {
        $(this).attr('disabled', true);
        $(global.dom.session).empty();
        global.message.show({content: '正在获取数据...'});

        global.http.acquire({
            uri: global.sessionUri,
            container: global.dom.session,
            context: this,
            error: function (opt) {
                global.message.show({content: '获取数据结束！'});
                global.message.show({content: '获取数据错误，请稍后重试！', color: 'red'});
                $(opt.context).attr('disabled', false);
            },
            success: function (opt) {
                $(opt.context).attr('disabled', false);
                global.message.empty();
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

require(['jquery', 'naure.message', 'naure.ui.overlay', 'naure.http.xsl', 'naure.analytics'], function ($, NAURE) {
    global.message = NAURE.Message;
    global.http = NAURE.HTTP;

    $(function () {
        $('article section:eq(0)').message();
        $('body').overlay({
            nodes: overlayNodes
        });
    });
});

/*-------------------- 初始化 END --------------------*/