/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yhd.com
 * Date:
 *              1/11/2015 9:29 AM
 * Description:
 *              农历日期转换
 *              http://www.cnitblog.com/addone/archive/2014/06/17/63461.html
 *              http://blog.csdn.net/sYwb/article/details/337172
 *              http://blog.jjonline.cn/userInterFace/173.html
 *              https://github.com/conis/lunar/blob/master/lib/chinese-lunar.js
 *
 */

+function () {

    var _chineseLunar = {

        /**
         * 1)农历每个月的大小;
         * 2)今年是否有闰月，闰几月以及闰月的大小。
         * 用一位来表示一个月的大小，大月记为1，小月记为0，
         * 这样就用掉12位(无闰月)或13位(有闰月)，再用高四位来表示闰月的月份，没有闰月记为0
         */
        lunarInfo: [
            0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
            0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
            0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
            0x0d520],//2100

        /**
         * 1900-2100各年的24节气日期速查表
         */
        solarTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
            '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
            'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
            '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
            '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
            '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
            '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
            '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
            '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
            '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
            '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
            '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

        /**
         * 返回农历y年一整年的总天数
         * @param lunar Year
         * @return Number
         * @eg:var count = _chineseLunar.lYearDays(1987) ;//count=387
         */
        lYearDays: function (y) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) {
                sum += (_chineseLunar.lunarInfo[y - 1900] & i) ? 1 : 0;
            }
            return (sum + _chineseLunar.leapDays(y));
        },


        /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = _chineseLunar.leapMonth(1987) ;//leapMonth=6
         */
        leapMonth: function (y) { //闰字编码 \u95f0
            return (_chineseLunar.lunarInfo[y - 1900] & 0xf);
        },


        /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = _chineseLunar.leapDays(1987) ;//leapMonthDay=29
         */
        leapDays: function (y) {
            if (_chineseLunar.leapMonth(y)) {
                return ((_chineseLunar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
            }
            return (0);
        },


        /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = _chineseLunar.monthDays(1987,9) ;//MonthDay=29
         */
        monthDays: function (y, m) {
            if (m > 12 || m < 1) {
                return -1;
            }//月份参数从1至12，参数错误返回-1
            return ( (_chineseLunar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29 );
        },


        /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = _chineseLunar.leapDays(1987) ;//solarMonthDay=30
         */
        solarDays: function (y, m) {
            if (m > 12 || m < 1) {
                return -1
            } //若参数错误 返回-1
            var ms = m - 1;
            if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
                return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
            } else {
                return (_chineseLunar.const.solarMonth[ms]);
            }
        },


        /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
        toGanZhi: function (offset) {
            return (_chineseLunar.const.Gan[offset % 10] + _chineseLunar.const.Zhi[offset % 12]);
        },


        /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = _chineseLunar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
        getTerm: function (y, n) {
            if (y < 1900 || y > 2100) {
                return -1;
            }
            if (n < 1 || n > 24) {
                return -1;
            }
            var _table = _chineseLunar.solarTermInfo[y - 1900];
            var _info = [
                parseInt('0x' + _table.substr(0, 5)).toString(),
                parseInt('0x' + _table.substr(5, 5)).toString(),
                parseInt('0x' + _table.substr(10, 5)).toString(),
                parseInt('0x' + _table.substr(15, 5)).toString(),
                parseInt('0x' + _table.substr(20, 5)).toString(),
                parseInt('0x' + _table.substr(25, 5)).toString()
            ];
            var _calday = [
                _info[0].substr(0, 1),
                _info[0].substr(1, 2),
                _info[0].substr(3, 1),
                _info[0].substr(4, 2),

                _info[1].substr(0, 1),
                _info[1].substr(1, 2),
                _info[1].substr(3, 1),
                _info[1].substr(4, 2),

                _info[2].substr(0, 1),
                _info[2].substr(1, 2),
                _info[2].substr(3, 1),
                _info[2].substr(4, 2),

                _info[3].substr(0, 1),
                _info[3].substr(1, 2),
                _info[3].substr(3, 1),
                _info[3].substr(4, 2),

                _info[4].substr(0, 1),
                _info[4].substr(1, 2),
                _info[4].substr(3, 1),
                _info[4].substr(4, 2),

                _info[5].substr(0, 1),
                _info[5].substr(1, 2),
                _info[5].substr(3, 1),
                _info[5].substr(4, 2),
            ];
            return parseInt(_calday[n - 1]);
        },


        /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = _chineseLunar.toChinaMonth(12) ;//cnMonth='腊月'
         */
        toChinaMonth: function (m) { // 月 => \u6708
            if (m > 12 || m < 1) {
                return -1
            } //若参数错误 返回-1
            var s = _chineseLunar.const.nStr3[m - 1];
            s += "\u6708";//加上月字
            return s;
        },


        /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = _chineseLunar.toChinaDay(21) ;//cnMonth='廿一'
         */
        toChinaDay: function (d) { //日 => \u65e5
            var s;
            switch (d) {
                case 10:
                    s = '\u521d\u5341';
                    break;
                case 20:
                    s = '\u4e8c\u5341';
                    break;
                    break;
                case 30:
                    s = '\u4e09\u5341';
                    break;
                    break;
                default :
                    s = _chineseLunar.const.nStr2[Math.floor(d / 10)];
                    s += _chineseLunar.const.nStr1[d % 10];
            }
            return (s);
        },


        /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = _chineseLunar.getAnimal(1987) ;//animal='兔'
         */
        getAnimal: function (y) {
            return _chineseLunar.const.Animals[(y - 4) % 12]
        },


        /**
         * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(_chineseLunar.solar2lunar(1987,11,01));
         */
        solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
            if (y < 1900 || y > 2100) {
                return -1;
            }//年份限定、上限
            if (y == 1900 && m == 1 && d < 31) {
                return -1;
            }//下限
            if (!y) { //未传参  获得当天
                var objDate = new Date();
            } else {
                var objDate = new Date(y, parseInt(m) - 1, d)
            }
            var i, leap = 0, temp = 0;
            //修正ymd参数
            var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
            var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = _chineseLunar.lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }

            //是否今天
            var isTodayObj = new Date(), isToday = false;
            if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
                isToday = true;
            }
            //星期几
            var nWeek = objDate.getDay(), cWeek = _chineseLunar.const.nStr1[nWeek];
            if (nWeek == 0) {
                nWeek = 7;
            }//数字表示周几顺应天朝周一开始的惯例
            //农历年
            var year = i;

            var leap = _chineseLunar.leapMonth(i); //闰哪个月
            var isLeap = false;

            //效验闰月
            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leap > 0 && i == (leap + 1) && isLeap == false) {
                    --i;
                    isLeap = true;
                    temp = _chineseLunar.leapDays(year); //计算农历闰月天数
                }
                else {
                    temp = _chineseLunar.monthDays(year, i);//计算农历普通月天数
                }
                //解除闰月
                if (isLeap == true && i == (leap + 1)) {
                    isLeap = false;
                }
                offset -= temp;
            }

            if (offset == 0 && leap > 0 && i == leap + 1)
                if (isLeap) {
                    isLeap = false;
                } else {
                    isLeap = true;
                    --i;
                }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            //农历月
            var month = i;
            //农历日
            var day = offset + 1;

            //天干地支处理
            var sm = m - 1;
            var term3 = _chineseLunar.getTerm(year, 3); //该农历年立春日期
            var gzY = _chineseLunar.toGanZhi(year - 4);//普通按年份计算，下方尚需按立春节气来修正

            //依据立春日进行修正gzY
            if (sm < 2 && d < term3) {
                gzY = _chineseLunar.toGanZhi(year - 5);
            } else {
                gzY = _chineseLunar.toGanZhi(year - 4);
            }

            //月柱 1900年1月小寒以前为 丙子月(60进制12)
            var firstNode = _chineseLunar.getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
            var secondNode = _chineseLunar.getTerm(y, (m * 2));//返回当月「节」为几日开始

            //依据12节气修正干支月
            var gzM = _chineseLunar.toGanZhi((y - 1900) * 12 + m + 11);
            if (d >= firstNode) {
                gzM = _chineseLunar.toGanZhi((y - 1900) * 12 + m + 12);
            }

            //传入的日期的节气与否
            var isTerm = false;
            var Term = null;
            if (firstNode == d) {
                isTerm = true;
                Term = _chineseLunar.const.solarTerm[m * 2 - 2];
            }
            if (secondNode == d) {
                isTerm = true;
                Term = _chineseLunar.const.solarTerm[m * 2 - 1];
            }
            //日柱 当月一日与 1900/1/1 相差天数
            var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
            var gzD = _chineseLunar.toGanZhi(dayCyclical + d - 1);

            return {
                'lYear': year,
                'lMonth': month,
                'lDay': day,
                'Animal': _chineseLunar.getAnimal(year),
                'IMonthCn': (isLeap ? "\u95f0" : '') + _chineseLunar.toChinaMonth(month),
                'IDayCn': _chineseLunar.toChinaDay(day),
                'cYear': y,
                'cMonth': m,
                'cDay': d,
                'gzYear': gzY,
                'gzMonth': gzM,
                'gzDay': gzD,
                'isToday': isToday,
                'isLeap': isLeap,
                'nWeek': nWeek,
                'ncWeek': "\u661f\u671f" + cWeek,
                'isTerm': isTerm,
                'Term': Term
            };
        },


        /**
         * 传入公历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.
         * @return JSON object
         * @eg:console.log(_chineseLunar.lunar2solar(1987,9,10));
         */
        lunar2solar: function (y, m, d, isLeapMonth) {	//参数区间1900.1.31~2100.12.1
            var leapOffset = 0;
            var leapMonth = _chineseLunar.leapMonth(y);
            var leapDay = _chineseLunar.leapDays(y);
            if (isLeapMonth && (leapMonth != m)) {
                return -1;
            }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
            if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
                return -1;
            }//超出了最大极限值
            var day = _chineseLunar.monthDays(y, m);
            if (y < 1900 || y > 2100 || d > day) {
                return -1;
            }//参数合法性效验

            //计算农历的时间差
            var offset = 0;
            for (var i = 1900; i < y; i++) {
                offset += _chineseLunar.lYearDays(i);
            }
            var leap = 0, isAdd = false;
            for (var j = 1; j < m; j++) {
                leap = _chineseLunar.leapMonth(y);
                if (!isAdd) {//处理闰月
                    if (leap <= j && leap > 0) {
                        offset += _chineseLunar.leapDays(y);
                        isAdd = true;
                    }
                }
                offset += _chineseLunar.monthDays(y, j);
            }
            //转换闰月农历 需补充该年闰月的前一个月的时差
            if (isLeapMonth) {
                offset += day;
            }
            //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
            var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
            var calObj = new Date((offset + d - 31) * 86400000 + stmap);
            var cY = calObj.getUTCFullYear();
            var cM = calObj.getUTCMonth() + 1;
            var cD = calObj.getUTCDate();

            return _chineseLunar.solar2lunar(cY, cM, cD);
        }
    };

    if (typeof define === 'function') {
        define(['naur.date'], function (NAUR) {
            _chineseLunar.const = NAUR.Date;
            NAUR.Date.ChineseLunar = _chineseLunar;
            return NAUR;
        });
    } else if (typeof exports === 'object') {
        module.exports = _chineseLunar;
    } else {
        window.chineseLunar = _chineseLunar;
    }
}();
