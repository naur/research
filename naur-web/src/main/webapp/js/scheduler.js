/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yihaodian.com
 * Date:
 *              2014/7/12 17:13
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var global = {
    searchUri: '/scheduler/task/{0}.json',
    startUri: '/scheduler/task/start.json',
    runUri: '/scheduler/task/run/{0}.json',
    table: {
        friendlyName: 'NAME',
        cron: 'CRON',
        'task.name': 'TASK',
        'status.recent': 'RECENT',
        'status.startTime': 'STARTTIME',
        'status.completed': 'COMPLETED',
        'status.completeness': 'COMPLETENESS',
        'status.message': 'MESSAGE',
        'status.duration': 'DURATION',
        options: 'OPTIONS'
    },
    dom: {
        container: '.row:eq(0) div:eq(0)',
        search: '#search',
        realtime: '#realtime',
        start: '#start',
        run: '.run',
        recent: '.row_status.recent',
        startTime: '.row_status.startTime',
        duration: '.row_status.duration'
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function search() {
    var tbody = global.dom.container + ' table tbody';

    $(tbody).html(global.utility.format(global.message.tableTemplate, global.message.text.loading));
    global.http.acquire({
        uri: global.utility.format(global.searchUri, $(global.dom.realtime)[0].checked),
        error: function (err) {
            $(tbody).html(global.utility.format(global.message.tableTemplate, err));
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                $(tbody).html($.render.row(
                    $.views.toRow(global.table, obj.output.information.data, {
                        before: function (data, prop, result) {
                            if ('options' == prop) {
                                result[prop] = '<div class="row">' +
                                '        <div class="col-md-10 col-md-offset-1">' +
                                '            <div class="input-group input-group-sm">' +
                                '                <input type="text"  class="form-control" />' +
                                '           &nbsp;&nbsp;' +
                                '                <span class="input-group-btn">' +
                                '                    <button class="btn btn-default run"  type="button">RUN!</button>' +
                                '                </span>' +
                                '          </div>' +
                                '        </div>' +
                                '    </div>';
                                return true;
                            } else if ('status.recent' == prop || 'status.startTime' == prop) {
                                if (data.status) {
                                    result[prop] = new Date(data.status[prop.split(DOT)[1]]).format('yyyy-MM-dd hh:mm:ss');
                                    return true;
                                }
                            } else if ('status.duration' == prop) {
                                if (data.status && data.status.duration) {
                                    result[prop] = new Date(data.status.duration).format('hh:mm:ss', true);
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        }
                    })
                ));
                $(global.dom.run).parent().prev().val(new Date().format('yyyy-MM-dd') + ', ' + new Date().format('yyyy-MM-dd') + ', ');
            } else {
                $(tbody).html(global.utility.format(global.message.tableTemplate, obj.output.information.keywords));
            }
        }
    });
}

function start() {
    global.message.show({content: 'Task Starting......', clear: true});
    global.http.acquire({
        uri: global.startUri,
        error: function (err) {
            global.message.show({content: 'Task Start Error!', color: 'red'});
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                global.message.show({content: 'Task Start OK.'});
            } else {
                global.message.show({
                    content: 'Task Start Error,' + obj.output.information.keywords + '.',
                    color: 'red'
                });
            }
        }
    });
}

function run(self) {
    //解析参数: 格式【start, end, 000001】，如果没有 000001 ,那么遍历配置文件里的所有的
    var stock = $(self).parent().prev().val().replace(/\s/g, '').replace(/,$/, '').split(',');
    if (stock.length < 2) {
        global.message.show({content: 'Task Params Error: ' + stock.toString(), clear: true, color: 'red'});
        return;
    }

    global.message.show({content: 'Task Running......', clear: true});
    global.http.acquire({
        uri: global.utility.format(global.runUri, $(self).parents('tr').children('.row_task_name').text()),
        data: {
            start: stock[0],
            end: stock[1],
            stock: stock.length > 2 ? stock[2] : ''
        },
        error: function (err) {
            global.message.show({content: 'Task Run Error!', color: 'red'});
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                global.message.show({content: 'Task Run OK.'});
            } else {
                global.message.show({content: 'Task Run Error,' + obj.output.information.keywords + '.', color: 'red'});
            }
        }
    });
}

function initContainerHead() {
    $(global.dom.container).html($.render.table(global.table));
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvelt() {
    $(global.dom.search).on('click', function () {
        search();
    });
    $(global.dom.start).on('click', function () {
        start();
    });
    $(global.dom.container).on('click', global.dom.run, function () {
        run(this);
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['loading', 'integrate-template', 'naur.math'], function (mod) {
    global.http = mod.naur.HTTP;
    global.message = mod.naur.Message;
    global.utility = mod.naur.Utility;
    $(function () {
        $('body').message({overlay: 'left-bottom'});
        initEvelt();
        initContainerHead();
        $(global.dom.search).click();
    });
});

/*-------------------- 初始化 END --------------------*/