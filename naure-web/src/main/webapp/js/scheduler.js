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
    searchUri: '/scheduler/task.json',
    startUri: '/scheduler/task/start.json',
    runUri: '/scheduler/task/run/{0}.json',
    dom: {
        container: '#scheduler-container ',
        search: '#search',
        start: '#start',
        run: '.run'
    }
}

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function search() {
    $(global.dom.container + "tbody").html(global.utility.format(global.message.tableTemplate, global.message.text.loading));
    global.http.acquire({
        uri: global.searchUri,
        error: function (err) {
            $(global.dom.container + "tbody").html(global.utility.format(global.message.tableTemplate, err));
        },
        success: function (obj) {
            if (0 == obj.output.information.level) {
                $(global.dom.container + "tbody").html($.render.scheduler(obj.output.information.data));
                $(global.dom.run).parent().prev().val(new Date().format('yyyy-MM-dd') + ', ' + new Date().format('yyyy-MM-dd') + ', ');
            } else {
                $(global.dom.container + "tbody").html(global.utility.format(global.message.tableTemplate, obj.output.information.keywords));
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
                global.message.show({content: 'Task Start Error,' + obj.output.information.keywords + '.', color: 'red'});
            }
        }
    });
}

function run(self) {
    //解析参数: 格式【start, end, 000001】，如果没有 000001 ,那么遍历配置文件里的所有的
    var stock = $(self).parent().prev().val().replace(/\s/, '').split(',');
    if (stock.length < 2) {
        global.message.show({content: 'Task Params Error: ' + stock.toString(), clear: true, color: 'red'});
        return;
    }

    global.message.show({content: 'Task Running......', clear: true});
    global.http.acquire({
        uri: global.runUri,
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
    $(global.dom.container + "thead").html($.render.schedulerHead());
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

require(['loading', 'integrate-template'], function (mod) {
    global.http = mod.naure.HTTP;
    global.message = mod.naure.Message;
    global.utility = mod.naure.Utility;
    $(function () {
        $('body').message({overlay: 'left-bottom'});
        initEvelt();
        initContainerHead();
        $(global.dom.search).click();
    });
});

/*-------------------- 初始化 END --------------------*/