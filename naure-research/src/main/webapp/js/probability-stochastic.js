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

var message, stochastic, keyPrefixGaussian = 'gd', keyPrefixUniform = 'ud', graphics, system, n = 10, buffer, fieldsInfo;
//var localStorage = [];

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

function initFieldInfo() {
    fieldsInfo = {};
    $('.fields').each(function (index) {
        var type;
        if ($('input[name=radio' + $(this).attr('id') + ']:radio:checked').val() == keyPrefixGaussian) {
            //distributionsLinked = stochastic.ProbabilityLinked({min:-3, max:3, distributions:$(this).val().split(/[-,;-]{1}/)});
            type = keyPrefixGaussian;
        } else {
            //distributionsLinked = stochastic.ProbabilityLinked({distributions:$(this).val().split(/[-,;-]{1}/)});
            type = keyPrefixUniform;
        }

        fieldsInfo['field' + index] = {
            key:'field' + index,
            name:$(this).attr('tag'),
            values:$(this).val().split(/[-,;-]{1}/),
            //linked:distributionsLinked,
            type:type
        };
    });
}

function storageKey(field, n) {
    return field.key + (field.type == keyPrefixUniform ? keyPrefixUniform : keyPrefixGaussian) + n;
}

//生成均匀分布随机数
function makeUniformDistribution(field) {
    message.show({content:'开始生成 ' + field.name + ' 均匀分布随机数', color:'blue'});
    stochastic.UniformDistribution({n:n, distributions:field.values, success:function (obj) {
        //localStorage.setItem(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(field, obj.index)] = obj.x;
    }});
}

//生成正态分布随机数
function makeGaussianDistribution(field) {
    message.show({content:'开始生成 ' + field.name + ' 正态分布随机数', color:'blue'});
    stochastic.GaussianDistribution({n:n, distributions:field.values, success:function (obj) {
        //localStorage.push(keyPrefixGaussian + obj.index, obj.x1);
        buffer[storageKey(field, obj.index)] = obj.x1;
    }});
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {

    $('#handle').on('click', function () {
        $(this).attr('disabled', true);
        message.empty();
        //localStorage.clear();
        for (var i = 1; i <= 10; i++) {
            if ($('#field' + i).val().length <= 0) {
                message.show({content:'字段' + $(this).attr('id') + '为空', color:'red'});
                return;
            }
        }
        initFieldInfo();
        buffer = {};

        //生成随机数
        for (var index in fieldsInfo) {
            if (fieldsInfo[index].type == keyPrefixUniform) {
                makeUniformDistribution(fieldsInfo[index]);
            } else {
                makeGaussianDistribution(fieldsInfo[index]);
            }
        }

        //分布图
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

        //生成 JQ 测试数据
        message.show({content:'开始生成测试数据', color:'blue'});
        for (var i = 0; i < n; i++) {
            var jqSample = {}
            for (var index in fieldsInfo) {
                jqSample[index] = buffer[storageKey(fieldsInfo[index], i)];
            }
            message.show({content:JSON.stringify(jqSample)});
        }

        $(this).attr('disabled', false);
    });

    $('#clear').on('click', function () {
        message.empty();
    });

}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.math.probability.stochastic', 'naure.graphics.ui', 'naure.graphics.stochastic'], function ($, NAURE) {
    message = NAURE.Message;
    stochastic = NAURE.Math.Probability.Stochastic;
    system = new NAURE.Graphics.Stochastic();

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