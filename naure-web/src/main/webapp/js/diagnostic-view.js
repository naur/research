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
    $(global.dom.area[0]).html($.render.table());
    var thread = global.dom.area[0] + ' table thead';
    var tbody = global.dom.area[0] + ' table tbody';
    $(thread).html($.render.sessionHead());
    $(tbody).html(global.utility.format(global.message.tableTemplate, global.message.text.loading));

    global.http.acquire({
        uri: global.sessionUri,
        context: self,
        error: function (err) {
            $(tbody).html(global.utility.format(global.message.tableTemplate, err));
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                $(tbody).html($.render.table(obj.output.information.data));
            } else {
                $(tbody).html(global.utility.format(global.message.tableTemplate, obj.output.information.keywords));
            }
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
    global.utility = mod.naure.Utility;

    $(function () {
        init();
        $(global.dom.area[1]).message();
    });
});

/*-------------------- 初始化 END --------------------*/