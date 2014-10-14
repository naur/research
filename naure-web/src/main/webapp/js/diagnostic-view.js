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
    session: {
        application: 'application',
        sessionId: 'sessionId',
        ipAddress: 'ipAddress',
        timestamp: 'timestamp',
        requestType: 'requestType',
        hostName: 'hostName',
        requestPath: 'requestPath',
        platform: 'platform',
        cpu: 'cpu',
        user: 'user',
        language: 'language',
        userAgent: 'userAgent',
        statusCode: 'statusCode',
        severity: 'severity',
        refererUrl: 'refererUrl',
        requestHost: 'requestHost'
    },
    dom: {
        container: '.row:eq(0) div',
        message: '.row:eq(1) div',
        session: '#session',
        analysis: '#analysis'
    }
};

function session(self) {
    $(self).attr('disabled', true);
    $(global.dom.container).html($.render.table(global.session));
    var tbody = global.dom.container + ' table tbody';
    $(tbody).html(global.utility.format(global.message.tableTemplate, global.message.text.loading));

    global.http.acquire({
        uri: global.sessionUri,
        context: self,
        error: function (err) {
            $(tbody).html(global.utility.format(global.message.tableTemplate, err));
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                $(tbody).html($.render.session(obj.output.information.data));
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
        $(global.dom.message).message();
    });
});

/*-------------------- 初始化 END --------------------*/