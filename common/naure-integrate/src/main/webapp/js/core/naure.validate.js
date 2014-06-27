/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              10/8/12 4:59 PM
 * Description:
 *
 */


define(['jquery', 'naure', 'jquery.validate.js'], function ($, NAURE) {
    NAURE.Validate = (function () {
        var validate = {
            messages_cn: function () {
                $.extend($.validator.messages, {
                    required: "必选字段！",
                    remote: "请修正该字段！",
                    email: "请输入正确格式的电子邮件！",
                    url: "请输入合法的网址！",
                    date: "请输入合法的日期！",
                    dateISO: "请输入合法的日期 (ISO)！",
                    number: "请输入合法的数字！",
                    digits: "只能输入整数！",
                    creditcard: "请输入合法的信用卡号！",
                    equalTo: "请再次输入相同的值！",
                    accept: "请输入拥有合法后缀名的字符串！",
                    maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串！"),
                    minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串！"),
                    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串！"),
                    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值！"),
                    max: $.validator.format("请输入一个最大为 {0} 的值！"),
                    min: $.validator.format("请输入一个最小为 {0} 的值！")
                });
            },
            isMobile: function (value, element) {
                var reg = /^(1[3458]{1}\d{9})$/;
                return this.optional(element) || (reg.test(value));
            },
            isHome: function (value, element) {
                var reg = /^0\d{2,3}-?\d{7,9}$/;
                return this.optional(element) || (reg.test(value));
            },
            isTel: function (value, element) {
                var mobile = /^(1[3458]{1}\d{9})$/;
                var home = /^0\d{2,3}-?\d{7,9}$/;
                return this.optional(element) || (home.test(value) || mobile.test(value));
            },
            isMultiTel: function (value, element) {
                var multiTelReg = /^((0\d{2,3}-?\d{7,9})|(1[3458]{1}\d{9}))(,\s*((0\d{2,3}-?\d{7,9})|(1[3458]{1}\d{9})))*$/;
                return this.optional(element) || (multiTelReg.test(value));
            },
            isSelect: function (value, element) {
                return this.optional(element) || (value != -1);
            },
            isCron: function (value, element) {
                return this.optional(element) || (/^([0-9][0-9]?|[-\*\/]) ([0-9][0-9]?|[-\*\/]) ([0-9][0-9]?|[-\*\/]) ([0-9][0-9]?|[-\*\/\?LW]) ([0-9][0-9]?|[-\*\/]) ([0-9][0-9]?|[-\*\/\?L#])$/.test(value));
            },
            init: function () {
                validate.messages_cn();
                $.validator.addMethod("isTel", validate.isTel, "请正确填写您的联系电话");
                $.validator.addMethod("isSelect", validate.isSelect, "请选择一个选项");
                $.validator.addMethod("isCron", validate.isCron, "请正确填写 cron 表达式");
                return validate;
            }
        };

        return validate.init();
    })();

    return NAURE;
});


