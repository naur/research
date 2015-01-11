/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yhd.com
 * Date:
 *              1/11/2015 3:49 PM
 * Description:
 *
 */

+function () {

    var _date = {
        WEEK: {
            Sunday: 0,
            Monday: 1,
            Tuesday : 2,
            Wednesday : 3,
            Thursday : 4,
            Friday: 5,
            Saturday: 6
        },

        solarHoliday: function (date) {
            var month = date.getMonth();
            var date = date.getDate();

            if ((month == 0) && (date == 1 || date == 2 || date == 3)) return "元旦";
            if ((month == 1) && (date == 13 )) return "除夕";
            if ((month == 1) && (date == 14 )) return "春节/情人节";
            if ((month == 2) && (date == 1)) return "国际海豹日";
            if ((month == 2) && (date == 8)) return "国际劳动妇女节/中国保护母亲河日";
            if ((month == 2) && (date == 12)) return "植树节";

            if ((month == 3) && (date == 1)) return "愚人节";
            if ((month == 3) && (date == 5)) return "清明节";
            if ((month == 4) && (date == 1)) return "国际劳动节";
            if ((month == 4) && (date == 9)) return "母亲节";

            if ((month == 5) && (date == 1)) return "国际儿童节";
            if ((month == 5) && (date == 26)) return "国际禁毒日";

            if ((month == 7) && (date == 1)) return "建军节";
            if ((month == 7) && (date == 15)) return "日本无条件投降日/世纪婚纱日";
            if ((month == 7) && (date == 16)) return "七夕情人节";


            if ((month == 9) && (date == 20)) return "世界厨师日";
            if ((month == 9) && (date == 22)) return "世界传统医药日";
            if ((month == 9) && (date == 24)) return "联合国日/世界发展信息日";
            if ((month == 9) && (date == 25)) return "世界骨质疏松日/抗美援朝纪念日/环卫工人节";
            if ((month == 9) && (date == 31)) return "世界勤俭日/中国男性健康日";

            if ((month == 11) && (date == 24)) return "平安夜";
            if ((month == 11) && (date == 25)) return "圣诞节";
        },

        lunarHoliday: function (date) {


            return false;
        },

        stockHoliday: function (solarDate, lunarDate) {
            var week = date.getDay();
            if (_date.WEEK.Sunday == week || _date.WEEK.Saturday == week) return true;

            var month = date.getMonth();
            var date = date.getDate();

            //元旦 1/1-1/3
            //春节 1/1-1/3
        }
    };

    if (typeof define === 'function') {
        define('naur', function (NAUR) {
            NAUR.Date = _date;
            return NAUR.Date;
        });
    } else if (typeof exports === 'object') {
        module.exports = _chineseLunar;
    } else {
        window.dateUtils = _date;
    }
}();