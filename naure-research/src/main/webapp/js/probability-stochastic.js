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
    //for (var i = 1; i <= 10; i++) {
    for (var key in fieldsInfo) {
        if ($('#' + fieldsInfo[key].key).val().length <= 0) {
            message.show({content:$('#' + fieldsInfo[key].key).attr('id') + ' 为空', color:'red'});
            initStatus(false);
            return false;
        }
    }
    return true;
}

function findField(key, list) {
    if (!list) list = fieldsInfo;
    for (var index in list) {
        if (!list.hasOwnProperty(index)) continue;
        if (key == list[index].key)
            return list[index];
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
        {key:'actualTransferTime', script:'/acquire/monitorTime.action', xsl:'/xsl/monitor-time.xsl', type:keyPrefixUniform, format:function (val) {
            return new Date(val).format('yyyy-MM-ddTHH:mm:ss');
        }, func:function (opt, x) {
            var tempX = stochastic.ProbabilitySampling(x, opt.distributions, opt.min, opt.max);
            if (tempX == "00:00") {
                return x;
            } else
                return tempX;
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
    stochastic.UniformDistribution({distributions:currentFie.distributions, distributionsFunc:currentFie.func,
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
function makeGraphics(field) {
    var temp = [];
    for (var i = 0; i < field.distributions.length; i++) {
        temp[i] = {
            key:field.distributions[i],
            x:i,
            val:0
        };
    }
    for (var j = 0; j < n; j++) {
        findField(buffer[storageKey(field, j)], temp).val++;
    }
    var point = [];
    for (var key in temp) {
        point.push({X:temp[key].x, Y:temp[key].val});
    }

    var y1, y2;
    for (var i = 0; i < point.length; i++) {
        if (!y1) y1 = point[i].Y;
        if (!y2) y2 = point[i].Y;
        y1 = min(y1, point[i].Y);
        y2 = max(y2, point[i].Y);
    }

    graphics.draw({
        coordinate:{
            X1:0,
            X2:field.distributions.length + 1,
            Y1:y1,
            Y2:y2
        },
        lines:[
            {equation:point, color:'red'}
        ]
    });
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

    $('#graph').on('click', function () {
        makeGraphics(findField($('#select-graph').val()));
    });
}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'jd.pattern', 'jd.message', 'jd.xsl', 'jd.math.matrixes', 'jd.math.probability.stochastic', 'jd.graphics.ui', 'jd.graphics.stochastic'], function ($, JD) {
    message = JD.Message;
    matrixes = JD.Math.Matrixes;
    stochastic = JD.Math.Probability.Stochastic;
    system = new JD.Graphics.Stochastic();
    http = JD.HTTP;
    var chain = JD.Pattern.chainHandler;

    chainHandler = new chain({handle:initStatus, request:true,
        successor:new chain({handle:validData,
            successor:new chain({handle:initFieldInfo,
                successor:new chain({handle:makeProbabilitySampling})})})
    });

    $(function () {
        $('article section:eq(1) fieldset:eq(1)').message();
        initEvent();
        initFieldsValues();
        graphics = $('article section fieldset canvas').JD_Graphics({system:system});
    });
});

/*-------------------- 初始化 END --------------------*/