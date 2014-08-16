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
    sessionUri: '/diagnostic/session.json',
    dom: {
        area: ['.row:eq(0) div', '.row:eq(0) div'],
        session: '#session',
        analysis: '#analysis'
    }
};

function session(self) {
    $(self).attr('disabled', true);
    $(global.dom.area[0]).empty();
    global.message.show({content: '正在获取数据...'});

    global.http.acquire({
        uri: global.sessionUri,
        container: global.dom.area[0],
        context: self,
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
}

function analysis(self) {
    $(self).attr('disabled', true);
    alert("A Analysis");
    $(self).attr('disabled', false);
}

function init() {
    $(global.dom.session).on('click', function () {
        session(this);
    });
    $(global.dom.analysis).on('click', function () {
        analysis(this);
    });
}

/*-------------------- 初始化 START --------------------*/

require(['loading', 'integrate-template'], function (mod) {
    global.message = mod.naure.Message;
    global.http = mod.naure.HTTP;

    $(function () {
        init();
        $(global.dom.area[1]).message();
    });
});

/*-------------------- 初始化 END --------------------*/