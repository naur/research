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

var message, http, chainHandler, matrixes, stochastic, keyPrefixGaussian = 'gd', keyPrefixUniform = 'ud', graphics, system, n, buffer, samplingBuffer, fieldsInfo;
var currentFie = 0, currentIndex = 0, currentNum = 0

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

function findField(key) {
    for (var index in fieldsInfo) {
        if (!fieldsInfo.hasOwnProperty(index)) continue;
        if (key == fieldsInfo[index].key)
            return fieldsInfo[index];
    }
    return null;
}

function initFieldsValues() {
    fieldsInfo = [
        {key:'orderType', script:'/acquire/orderType.action', xsl:'/xsl/order-type.xsl'},
        {key:'idShipMentType', values:'70,64' },
        {key:'sendPay', values:'0,1'},
        {key:'isJdShip', values:'True,False'},
        {key:'storehouse', script:'/acquire/storehouse.action', xsl:'/xsl/storehouse-id.xsl'},
        {key:'distributionType', values:'0,1,2,3,4,5,6'},
        {key:'idPickSite', script:'/acquire/site.action', xsl:'/xsl/stringdata.xsl'},
        {key:'area', script:'/acquire/area.action', xsl:'/xsl/stringdata.xsl'},
        {key:'actualTransferTime', type:keyPrefixUniform, format:function (val) {
            return new Date(val).format('yyyy-MM-ddTHH:mm:ss');
        }}
    ];

    $('.fields').each(function () {
        var fieldTemp = findField($(this).attr('id'));
        if (fieldTemp && fieldTemp.values)
            $(this).val(fieldTemp.values);
        else if (fieldTemp && fieldTemp.script)
            http.xmlAcquire({
                xmlUrl:fieldTemp.script,
                xslUrl:fieldTemp.xsl,
                context:this,
                error:function (ex) {
                },
                success:function (obj) {
                    $(obj.context).val(obj.output);
                }
            });
    });

    $('#sampling-size').val(100);
}

function initStatus(status) {
    $('#handle').attr('disabled', status);
    $('#submit').attr('disabled', status);
    if (status) {
        message.empty();
        buffer = {};
        samplingBuffer = [];
        currentFie = 0;
        currentIndex = 0;
        currentNum = 0;
        //localStorage.clear();
    }
}

function initFieldInfo() {
    $('.fields').each(function (index) {
        if (!findField($(this).attr('id'))) return;
        var type, distributionsLinked , matrix;
        if ($('input[name=radio-' + $(this).attr('id') + ']:radio:checked').val() == keyPrefixGaussian) {
            //distributionsLinked = stochastic.ProbabilityLinked({min:-3, max:3, distributions:$(this).val().split(/[,;]{1}/)});
            type = keyPrefixGaussian;
            matrix = matrixes.matrix({X1:-3, X2:3}, {X1:0, X2:$(this).val().split(/[,;]{1}/).length - 1});
        } else {
            //distributionsLinked = stochastic.ProbabilityLinked({distributions:$(this).val().split(/[,;]{1}/)});
            //distributionsLinked = $(this).val().split(/[,;]{1}/);
            type = keyPrefixUniform;
        }

        $.extend(findField($(this).attr('id')), {
            distributions:$(this).val().split(/[,;]{1}/),
            type:type,
            matrix:matrix
        });
    });

    $.extend(findField('actualTransferTime'), {
        min:new Date().getTime() - 5 * DyMilli,
        max:new Date().getTime()
    });

    n = parseInt($('#sampling-size').val());
}

function storageKey(field, n) {
    return field.key + (field.type == keyPrefixUniform ? keyPrefixUniform : keyPrefixGaussian) + n;
}

//生成随机数
function makeProbabilitySampling() {
    currentFie = fieldsInfo[currentIndex];
    currentNum = 0;
    if (!currentFie) {
        setTimeout('makeJQSampling()', 0.01);
        return
    }
    if (currentFie.type == keyPrefixUniform) {
        message.show({content:'开始生成 ' + currentFie.key + ' 均匀分布随机数', color:'blue'});
        message.show({content:'<span id="msg' + currentFie.key + '"></span>', color:'blue'});
        makeUniformDistribution();
    } else {
        message.show({content:'开始生成 ' + currentFie.key + ' 正态分布随机数', color:'blue'});
        message.show({content:'<span id="msg' + currentFie.key + '"></span>', color:'blue'});
        makeGaussianDistribution();
    }
}

//生成均匀分布随机数
function makeUniformDistribution() {
    stochastic.UniformDistribution({distributions:currentFie.distributions,
        min:currentFie.min ? currentFie.min : 0,
        max:currentFie.max ? currentFie.max : 1,
        fractionDigits:0,
        success:function (obj) {
            //localStorage.setItem(keyPrefixGaussian + obj.index, obj.x1);
            if (currentFie.format)
                obj.x = currentFie.format(obj.x);
            buffer[storageKey(currentFie, currentNum)] = obj.x;
            if ($('#msg' + currentFie.key).length > 0)
                $('#msg' + currentFie.key).html(n + ' -- ' + currentNum + ' -- ' + JSON.stringify(obj));
        }});

    if (currentNum < n) {
        currentNum++;
        setTimeout('makeUniformDistribution()', 0.01);
    } else {
        currentIndex++;
        setTimeout('makeProbabilitySampling()', 0.01);
    }
}

//生成正态分布随机数
function makeGaussianDistribution() {
    stochastic.GaussianDistribution({distributions:currentFie.distributions, matrix:currentFie.matrix, success:function (obj) {
        //localStorage.push(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(currentFie, currentNum)] = obj.x1;
    }});

    if (currentNum < n) {
        currentNum++;
        setTimeout('makeUniformDistribution()', 0.01);
    } else {
        currentIndex++;
        setTimeout('makeProbabilitySampling()', 0.01);
    }
}

//生成 JQ 测试数据
function makeJQSampling() {
    if (currentNum == 0) {
        message.show({content:'开始生成 JQ 测试数据', color:'blue'});
        message.show({content:'<span id="msgSampling"></span>', color:'blue'});
    }

    var jqSampling = {}
    for (var i = 0; i < fieldsInfo.length; i++) {
        jqSampling[fieldsInfo[i].key] = buffer[storageKey(fieldsInfo[i], currentNum)];
    }
    jqSampling.orderId = currentNum + 1260000000;
    jqSampling.deliveryCenterId = jqSampling['storehouse'].split('-')[0];
    jqSampling.storeId = jqSampling['storehouse'].split('-')[1];
    jqSampling.province = jqSampling['area'].split('-')[0];
    jqSampling.county = jqSampling['area'].split('-')[1];
    jqSampling.city = jqSampling['area'].split('-')[2];

    if ($('#msgSampling').length > 0) {
        $('#msgSampling').html(n + ' -- ' + currentNum + ' -- ' + JSON.stringify(jqSampling));
    } else
        message.show({content:JSON.stringify(jqSampling)});

    samplingBuffer.push(jqSampling);

    if (currentNum < n) {
        currentNum++;
        setTimeout('makeJQSampling()', 0.01);
    } else {
        initStatus(false);
    }
}

//提交数据
function submitSampling() {
    var tempSampling = samplingBuffer.shift();
    if (tempSampling) {
        var tempData = {};
        for (var key in tempSampling) {
            if (!tempSampling.hasOwnProperty(key)) continue;
            tempData['params.' + key] = tempSampling[key];
        }
        tempData['params.remark'] = $("#remark").val();
        http.xmlAcquire({
            xmlUrl:'/sampling/jqAdd.action',
            optionData:tempData,
            context:this,
            error:function (ex) {
                if ($('#msgSubmit').length > 0)
                    $('#msgSubmit').html(n + ' -- ' + tempSampling.orderId + ' -- ' + JSON.stringify(tempSampling));
            },
            success:function (obj) {
                if ($('#msgSubmit').length > 0)
                    $('#msgSubmit').html(n + ' -- ' + tempSampling.orderId + ' -- ' + JSON.stringify(tempSampling));
            }
        });

        setTimeout('submitSampling()', 0.01);
    }
}

//分布图
function makeGraphics() {
//        var point = [];
//        for (var key in buffer) {
//            if (key.indexOf(keyPrefixGaussian) >= 0)
//                point.push({X:buffer[key], Y:0.01});
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
        message.show({content:'开始提交 JQ 样本数据', color:'blue'});
        message.show({content:'<span id="msgSubmit"></span>', color:'blue'});
        initStatus(false);
        submitSampling();
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.pattern', 'naure.message', 'naure.xsl', 'naure.math.matrixes', 'naure.math.probability.stochastic', 'naure.graphics.ui', 'naure.graphics.stochastic'], function ($, NAURE) {
    message = NAURE.Message;
    matrixes = NAURE.Math.Matrixes;
    stochastic = NAURE.Math.Probability.Stochastic;
    system = new NAURE.Graphics.Stochastic();
    http = NAURE.HTTP;
    var chain = NAURE.Pattern.chainHandler;

    chainHandler = new chain({handle:initStatus, request:true,
        successor:new chain({handle:validData,
            successor:new chain({handle:initFieldInfo,
                successor:new chain({handle:makeProbabilitySampling})})})
    });

    $(function () {
        $('article section:eq(1) fieldset:eq(1)').message();
        initEvent();
        initFieldsValues();
        graphics = $('article section fieldset canvas').NAURE_Graphics({system:system});
    });
});

/*-------------------- 初始化 END --------------------*/