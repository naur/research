/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              8/9/12 7:03 PM
 * Description:
 *
 */

/*-------------------- 全局变量 START ----------------*/

var naure, message, overlay, http, overlayNodes;

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

overlayNodes = {
    Heading:{
        html:'<input id="overlay-input-heading" type="text" />'
    },
    Number:{
        html:'<input id="overlay-input-number" type="text" />'
    },
    Path:{
        html:'<input id="overlay-input-path" type="text" />'
    },
    Time:{
        html:'<input id="overlay-input-time" type="text" />'
    },
    Add:function () {
        $(this).attr('disabled', true);
        $('article section').empty();
        message.empty();

        var schedule = {
            number:$('#overlay-input-number').val(),
            heading:$('#overlay-input-heading').val(),
            time:$('#overlay-input-time').val(),
            path:$('#overlay-input-path').val()
        };

        if (schedule.path.length > 0) {
            message.show({content:'Add Schedule ' + JSON.stringify(schedule)});
            http.xmlAcquire({
                xmlUrl:'/learn/schedule/' + schedule.path + '/' +
                    (schedule.number.length > 0 ? 'number=' + schedule.number : '') +
                    (schedule.heading.length > 0 ? ',heading=' + encodeURIComponent(schedule.heading) : '') +
                    (schedule.time.length > 0 ? ',time=' + schedule.time : '') +
                    ".xml",
                //xslUrl:'/xsl/table.xsl',
                context:this,
                error:function (error) {
                    $(error.context).attr('disabled', false);
                    message.show({content:'Error: ' + JSON.stringify($.toJSON(error)), color:'red'});
                },
                success:function (obj) {
                    message.show({content:'Add Schedule success.'});
                    $(obj.context).attr('disabled', false);
                }
            });
        } else {
            message.show({content:'Input is empty.'});
            $(this).attr('disabled', false);
        }
    },
    Get:function () {
        renderLearningSchedule(this);
    }
};

function renderLearningSchedule(elem) {
    $(elem).attr('disabled', true);
    $('article section').empty();
    message.show({content:'正在获取数据...'});

    $('article section').NAURE_HTTP_xmlAcquire({
        xmlUrl:'/learn/schedule.xml',
        //xslUrl:'/xsl/learning-schedule.xsl',
        xslUrl:'/xsl/table.xsl',
        context:elem,
        error:function (ex) {
            message.show({content:'获取数据结束！'});
            message.show({content:'获取数据错误，请稍后重试！', color:'red'});
            $(ex.context).attr('disabled', false);
        },
        success:function (obj) {
            $(obj.context).attr('disabled', false);
            message.empty();
        }
    });
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/

function initEvent() {

}

/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.analytics', 'naure.xsl'], function ($, NAURE) {
    naure = NAURE;
    message = NAURE.Message;
    http = NAURE.HTTP;

    $(function () {
        $('body').message({overlay:'left-top'});
        $('body').overlay({
            nodes:overlayNodes
        });
    });

    initEvent();
});

/*-------------------- 初始化 END --------------------*/