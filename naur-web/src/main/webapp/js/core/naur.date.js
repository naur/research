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
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6
        },


        /**
         * 公历每个月份的天数普通表
         */
        solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

        /**
         * 天干地支之天干速查表
         * ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
         */
        Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

        /**
         * 天干地支之地支速查表
         * ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
         */
        Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

        /**
         * 天干地支之地支速查表<=>生肖
         * ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
         */
        Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

        /**
         * 4节气速查表
         * ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
         */
        solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

        /**
         * 数字转中文速查表
         * @Array Of Property
         * @trans ['日','一','二','三','四','五','六','七','八','九','十']
         * @return Cn string
         */
        nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],


        /**
         * 日期转农历称呼速查表
         * @Array Of Property
         * @trans ['初','十','廿','卅']
         * @return Cn string
         */
        nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],


        /**
         * 月份转农历称呼速查表
         * @Array Of Property
         * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
         * @return Cn string
         */
        nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

        statutoryHolidays: {
            //元旦，春节，清明，劳动节，端午，中秋，国庆
            //2000: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2001: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2002: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2003: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2004: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2005: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2006: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2007: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2008: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2009: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2010: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2011: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            //2012: {1: [1, 3], 2: [18, 24], 4: [4, 6], 5: [1, 3], 6: [20, 22], 9: [26, 27], 10: [1, 7]},
            2013: {1: [1 - 3], 2: [9 - 15], 4: [4 - 6, 29], 5: [1], 6: [10 - 12], 9: [19 - 21], 10: [1 - 7]},
            2014: {1: [1, 31], 2: [1,2,3,4,5,6], 4: [5,6,7], 5: [1,2,3], 6: [2], 9: [8], 10: [1,2,3,4,5,6,7]},
            2015: {1: [1,2,3], 2: [18,19,20,21,22,23,24], 4: [4,5,6], 5: [1,2,3], 6: [20,21, 22], 9: [26,27], 10: [1,2,3,4,5,6,7]},
            isHoliday: function (year, month, date) {
                if (!_date.statutoryHolidays[year]) {
                    alert('请补充 ' + year + ' 的假期信息');
                    return false;
                }

                var range = _date.statutoryHolidays[year][month];
                if (!range) {
                    return false;
                }

                //return date >= range[0] && date <= range[1]
                return false;
            }
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

        stockHoliday: function (solarDate) {
            var week = solarDate.getDay();
            if (_date.WEEK.Sunday == week || _date.WEEK.Saturday == week) return true;

            var year = solarDate.getFullYear();
            var month = solarDate.getMonth() + 1;
            var date = solarDate.getDate();

            return _date.statutoryHolidays.isHoliday(year, month, date);

            //阳历判断
            //元旦 1/1-1/3        3天
            //国庆节   10/1-10/7   7天
            //劳动节 5/1-5/3     3天
            //switch (month) {
            //    case 1:
            //        if (date >= 1 && date <= 3) return true;  //元旦
            //        break;
            //    case 5:
            //        if (date >= 1 && date <= 3) return true;  //劳动节
            //        break;
            //    case 10:
            //        if (date >= 1 && date <= 7) return true;  //国庆节
            //        break;
            //}

            ////农历判断
            ////春节 2/18-2/24    7天
            ////清明节 4/4-4/6    3天
            ////端午节 6/20-6/22     5/5  3天
            ////中秋节 9/26-9/27     8/15  2天
            //var _lunarDate = lunarDate(solarDate);
            //year = _lunarDate.lYear;
            //month = _lunarDate.lMonth;
            //date = _lunarDate.lMonth;
            //week = _lunarDate.nWeek;
            //switch (month) {
            //    case 1:
            //        //TODO 日期问题
            //        if (date >= 1 && date <= 6) return true;  //春节
            //        break;
            //    case 4:
            //        //TODO 清明是节气
            //        if (_date.solarTerm[6] == _lunarDate.Term) return true;  //清明节
            //        //TODO 要寻找上2天周末是否是清明节
            //        if (date <= 5) {
            //            if (_date.WEEK.Monday == week) {
            //                solarDate.setDate(date - 1);
            //                if (_date.solarTerm[6] == lunarDate(solarDate).Term) return true;  //清明节
            //                solarDate.setDate(date - 1);
            //                if (_date.solarTerm[6] == lunarDate(solarDate).Term) return true;  //清明节
            //            }
            //        }
            //        break;
            //    case 5:
            //        if (date === 5) return true;  //端午节
            //        if ((date === 6 || date == 7) && _date.WEEK.Monday == week) return true;  //周末是端午节，调休
            //        break;
            //    case 8:
            //        if (date === 15) return true;  //中秋节
            //        if ((date === 16 || date == 17) && _date.WEEK.Monday == week) return true;  //周末是中秋节，调休
            //        break;
            //    case 12:
            //        if (date === 30) return true;  //除夕
            //        break;
            //}
            //
            //return false;
        }
    };

    if (typeof define === 'function') {
        define(['naur'], function (NAUR) {
            NAUR.Date = _date;
            return NAUR;
        });
    } else if (typeof exports === 'object') {
        module.exports = _chineseLunar;
    } else {
        window.dateUtils = _date;
    }
}();