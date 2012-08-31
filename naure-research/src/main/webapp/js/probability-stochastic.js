/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/31/12 2:17 PM
 * Description:
 *
 */
/*-------------------- 全局变量 START ----------------*/

var message, messageQueues, chainHandler, complete = true, stochastic, keyPrefixGaussian = 'gd', keyPrefixUniform = 'ud', graphics, system, n = 1000, buffer, fieldsInfo;
//var localStorage = [];

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function validData() {
    for (var i = 1; i <= 10; i++) {
        if ($('#field' + i).val().length <= 0) {
            message.show({content:$('#field' + i).attr('tag') + ' 为空', color:'red'});
            initDOMStatus(false);
            return false;
        }
    }
    return true;
}

function initDOMStatus(status) {
    $('#handle').attr('disabled', status);
    if (status) {
        message.empty();
        messageQueues = [];
        buffer = {};
        //localStorage.clear();
    }
    complete = !status;
}

function initFieldInfo() {
    fieldsInfo = {};
    $('.fields').each(function (index) {
        var type;
        if ($('input[name=radio' + $(this).attr('id') + ']:radio:checked').val() == keyPrefixGaussian) {
            type = keyPrefixGaussian;
        } else {
            type = keyPrefixUniform;
        }

        fieldsInfo['field' + index] = {
            key:'field' + index,
            name:$(this).attr('tag'),
            values:$(this).val().split(/[-,;-]{1}/),
            type:type
        };
    });
}

function storageKey(field, n) {
    return field.key + (field.type == keyPrefixUniform ? keyPrefixUniform : keyPrefixGaussian) + n;
}

//生成随机数
function makeProbabilitySampling() {
    for (var index in fieldsInfo) {
        if (fieldsInfo[index].type == keyPrefixUniform) {
            makeUniformDistribution(fieldsInfo[index]);
        } else {
            makeGaussianDistribution(fieldsInfo[index]);
        }
    }
}

//生成均匀分布随机数
function makeUniformDistribution(field) {
    messageQueues.push({content:'开始生成 ' + field.name + ' 均匀分布随机数', color:'blue'});
    stochastic.UniformDistribution({n:n, distributions:field.values, success:function (obj) {
        //localStorage.setItem(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(field, obj.index)] = obj.x;
    }});
}

//生成正态分布随机数
function makeGaussianDistribution(field) {
    messageQueues.push({content:'开始生成 ' + field.name + ' 正态分布随机数', color:'blue'});
    stochastic.GaussianDistribution({n:n, distributions:field.values, success:function (obj) {
        //localStorage.push(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(field, obj.index)] = obj.x1;
    }});
}

//生成 JQ 测试数据
function makeJQSample() {
    messageQueues.push({content:'开始生成 JQ 测试数据', color:'blue'});
    for (var i = 0; i < n; i++) {
        var jqSample = {}
        for (var index in fieldsInfo) {
            jqSample[index] = buffer[storageKey(fieldsInfo[index], i)];
        }
        messageQueues.push({content:JSON.stringify(jqSample)});
    }

    initDOMStatus(false);
}

//显示 message
function showMessage() {
    var msg = messageQueues.shift();
    if (msg)
        message.show(msg);
    if (!complete || (complete || msg))
        setTimeout("showMessage()", 10);
}

//分布图
function makeGraphics() {
//        var point = [];
//        for (var key in buffer) {
//            if (key.indexOf(keyPrefixGaussian) >= 0)
//                point.push({X:buffer[key], Y:0.5});
//        }
//        graphics.draw({
//            coordinate:{
//                X1:-4,
//                X2:4,
//                Y1:0, Y2:1
//            },
//            lines:[
//                {equation:point, color:'red'}
//            ]
//        });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {

    $('#handle').on('click', function () {
        chainHandler.process();
//        initFieldInfo();
//        //生成随机数
//        setTimeout("makeProbabilitySampling()", 1000);
//        //makeProbabilitySampling();
//        showMessage();
    });

    $('#clear').on('click', function () {
        buffer = [];
        message.empty();
    });

    $('#submit').on('click', function () {
        initDOMStatus(false);
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.pattern', 'naure.message', 'naure.math.probability.stochastic', 'naure.graphics.ui', 'naure.graphics.stochastic'], function ($, NAURE) {
    message = NAURE.Message;
    stochastic = NAURE.Math.Probability.Stochastic;
    system = new NAURE.Graphics.Stochastic();
    var chain = NAURE.Pattern.chainHandler;

    chainHandler = new chain({handle:initDOMStatus, request:true,
        successor:new chain({handle:validData,
            successor:new chain({handle:initFieldInfo,
                successor:new chain({handle:showMessage,
                    successor:new chain({handle:makeProbabilitySampling,
                        successor:new chain({handle:makeJQSample})})})})})
    });


    //    setTimeout(function () {
//        setTimeout(arguments.callee, 2000);
//    }, 2000);

    initEvent();

    $(function () {
        $('article section:eq(1) fieldset:eq(1)').message();
        $('.fields').each(function () {
            $(this).val('a,b,c,d,e,f,g');
        });
        graphics = $('article section fieldset canvas').NAURE_Graphics({system:system});
    });
});

/*-------------------- 初始化 END --------------------*/