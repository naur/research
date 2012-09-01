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

var message, chainHandler, stochastic, keyPrefixGaussian = 'gd', keyPrefixUniform = 'ud', graphics, system, n = 1000, buffer, fieldsInfo;

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function validData() {
    for (var i = 1; i <= 10; i++) {
        if ($('#field' + i).val().length <= 0) {
            message.show({content:$('#field' + i).attr('tag') + ' 为空', color:'red'});
            initStatus(false);
            return false;
        }
    }
    return true;
}

function initStatus(status) {
    $('#handle').attr('disabled', status);
    if (status) {
        message.empty();
        buffer = {};
        //localStorage.clear();
    }
}

function initFieldInfo() {
    fieldsInfo = {};
    $('.fields').each(function (index) {
        var type, distributionsLinked;
        if ($('input[name=radio' + $(this).attr('id') + ']:radio:checked').val() == keyPrefixGaussian) {
            distributionsLinked = stochastic.ProbabilityLinked({min:-3, max:3, distributions:$(this).val().split(/[-,;-]{1}/)});
            type = keyPrefixGaussian;
        } else {
            distributionsLinked = stochastic.ProbabilityLinked({distributions:$(this).val().split(/[-,;-]{1}/)});
            type = keyPrefixUniform;
        }

        fieldsInfo[index] = {
            key:'field' + index,
            name:$(this).attr('tag'),
            values:$(this).val().split(/[-,;-]{1}/),
            linked:distributionsLinked,
            type:type
        };
    });
}

function storageKey(field, n) {
    return field.key + (field.type == keyPrefixUniform ? keyPrefixUniform : keyPrefixGaussian) + n;
}

var currentField, currentIndex = 0, currentNum = 0
//生成随机数
function makeProbabilitySampling() {
    currentField = fieldsInfo[currentIndex];
    currentNum = 0;
    if (!currentField) {
        setTimeout('makeJQSample()', 2);
        return
    }
    if (currentField.type == keyPrefixUniform) {
        message.show({content:'开始生成 ' + currentField.name + ' 均匀分布随机数', color:'blue'});
        message.show({content:'<span id="msg' + currentField.key + '"></span>', color:'blue'});
        makeUniformDistribution();
    } else {
        message.show({content:'开始生成 ' + currentField.name + ' 正态分布随机数', color:'blue'});
        message.show({content:'<span id="msg' + currentField.key + '"></span>', color:'blue'});
        makeGaussianDistribution();
    }
}
//生成均匀分布随机数
function makeUniformDistribution() {
    stochastic.UniformDistribution({distributionsLinked:currentField.linked, success:function (obj) {
        //localStorage.setItem(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(currentField, currentNum)] = obj.x;
        if ($('#msg' + currentField.key).length > 0)
            $('#msg' + currentField.key).html(n + ' -- ' + currentNum + ' -- ' + JSON.stringify(obj));
    }});

    if (currentNum < n) {
        currentNum++;
        setTimeout('makeUniformDistribution()', 2);
    } else {
        currentIndex++;
        setTimeout('makeProbabilitySampling()', 2);
    }
}
//生成正态分布随机数
function makeGaussianDistribution() {
    stochastic.GaussianDistribution({distributionsLinked:currentField.linked, success:function (obj) {
        //localStorage.push(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(currentField, currentNum)] = obj.x1;
    }});

    if (currentNum < n) {
        currentNum++;
        setTimeout('makeUniformDistribution()', 2);
    } else {
        currentIndex++;
        setTimeout('makeProbabilitySampling()', 2);
    }
}

//生成 JQ 测试数据
function makeJQSample() {
    if (currentNum == 0) {
        message.show({content:'开始生成 JQ 测试数据', color:'blue'});
        message.show({content:'<span id="msgSample"></span>', color:'blue'});
    }

    var jqSample = {}
    for (var index in fieldsInfo) {
        jqSample[index] = buffer[storageKey(fieldsInfo[index], i)];
    }
    if ($('#msgSample').length > 0) {
        $('#msgSample').html(n + ' -- ' + currentNum + ' -- ' + JSON.stringify(jqSample));
    } else
        message.show({content:JSON.stringify(jqSample)});

    if (currentNum < n) {
        currentNum++;
        setTimeout('makeJQSample()', 2);
    } else {
        initStatus(false);
    }
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
        chainHandler.process()
    });

    $('#clear').on('click', function () {
        buffer = [];
        message.empty();
    });

    $('#submit').on('click', function () {
        initStatus(false);
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.pattern', 'naure.message', 'naure.math.probability.stochastic', 'naure.graphics.ui', 'naure.graphics.stochastic'], function ($, NAURE) {
    message = NAURE.Message;
    stochastic = NAURE.Math.Probability.Stochastic;
    system = new NAURE.Graphics.Stochastic();
    var chain = NAURE.Pattern.chainHandler;

    chainHandler = new chain({handle:initStatus, request:true,
        successor:new chain({handle:validData,
            successor:new chain({handle:initFieldInfo,
                successor:new chain({handle:showMessage, async:true,
                    successor:new chain({handle:makeProbabilitySampling})})})})
    });

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