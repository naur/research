/*
 * @(#) DateUtil.java 2014-12-30
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naur.common.util;

import org.apache.commons.lang3.time.DateUtils;
import org.naur.common.entities.WeekRange;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-26-30
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class DateUtil {

    /**
     * @param diffpart 比较部分YEAR为比较年份 MONTH为比较月份 DATE为比较天数 WEEK比较星期数,
     *                 如果传入的diffpart参数不为以上范围默认返回相差天数
     * @param ts1      需要比较的日期
     * @param ts2      需要比较的日期
     * @return 相差的大小
     */
    public static int dateDiff(String diffpart, Date ts1, Date ts2) {
        if ((ts1 == null) || (ts2 == null)) {
            return -1;
        }

        Date date1, date2;
        date1 = new Date(ts1.getTime());
        date2 = new Date(ts2.getTime());

        Calendar cal1, cal2;
        cal1 = Calendar.getInstance();
        cal2 = Calendar.getInstance();

        // different date might have different offset
        cal1.setTime(date1);
        long ldate1 = date1.getTime() + cal1.get(Calendar.ZONE_OFFSET) + cal1.get(Calendar.DST_OFFSET);

        cal2.setTime(date2);
        long ldate2 = date2.getTime() + cal2.get(Calendar.ZONE_OFFSET) + cal2.get(Calendar.DST_OFFSET);

        // Use integer calculation, truncate the decimals
        int hr1 = (int) (ldate1 / 3600000); // 60*60*1000
        int hr2 = (int) (ldate2 / 3600000);

        int days1 = hr1 / 24;
        int days2 = hr2 / 24;

        int dateDiff = days2 - days1;
        int yearDiff = cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR);

        if ("YEAR".equals(diffpart)) {
            return yearDiff;
        } else if ("MONTH".equals(diffpart)) {
            return yearDiff * 12 + cal2.get(Calendar.MONTH) - cal1.get(Calendar.MONTH);
        } else if ("DATE".equals(diffpart)) {
            return dateDiff;
        } else if ("WEEK".equals(diffpart)) {
            return dateDiff / 7 + ((cal2.get(Calendar.DAY_OF_WEEK) - cal1.get(Calendar.DAY_OF_WEEK)) < 0 ? 1 : 0);
        } else {
            return dateDiff;
        }
    }

    public static Date getPrevWeekDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int week;
        do {
            calendar.add(Calendar.DATE, -1);
            week = calendar.get(Calendar.DAY_OF_WEEK);
        } while (week == Calendar.SUNDAY || week == Calendar.SATURDAY);
        return calendar.getTime();
    }

    /**
     * 返回时间跨越的周日期
     * 星期一为第一周的开始
     */
    public static List<WeekRange> getWeeks(Date startDate, Date endDate) {
        LinkedList<WeekRange> list = new LinkedList<WeekRange>();

        // 如果异常数据，就返回空
        if (startDate.getTime() > endDate.getTime()) {
            return list;
        }
        Date start = startDate;
        do {
            list.addLast(getWeek(start));
            start = DateUtils.addDays(list.getLast().getEnd(), 1);
        } while (start.getTime() <= endDate.getTime());

        return list;
    }

    /**
     * 返回时间对应的周
     * 星期一为第一周的开始
     */
    public static WeekRange getWeek(Date focus) {
        return getWeek(focus, Calendar.MONDAY);
    }

    /**
     * 返回时间对应的周
     */
    public static WeekRange getWeek(Date focus, int firstDayOfWeek) {
        WeekRange range = new WeekRange();

        // 计算周的起点和终点
        Calendar gval = DateUtils.toCalendar(focus);
        Calendar start = DateUtils.truncate(gval, Calendar.DATE);
        Calendar end = DateUtils.truncate(gval, Calendar.DATE);
        int startCutoff = firstDayOfWeek;
        int endCutoff = firstDayOfWeek + 6 - 7;
        if (0 == endCutoff) {
            endCutoff = 7;
        }

        while (start.get(Calendar.DAY_OF_WEEK) != startCutoff) {
            start.add(Calendar.DATE, -1);
        }
        while (end.get(Calendar.DAY_OF_WEEK) != endCutoff) {
            end.add(Calendar.DATE, 1);
        }

        range.setStart(start.getTime());
        range.setEnd(end.getTime());

        // 计算年和周
        calendarWeekFormat(end, firstDayOfWeek);
        range.setYear(end.get(Calendar.YEAR));
        range.setWeek(end.get(Calendar.WEEK_OF_YEAR));

        return range;
    }

    /**
     * 根据年，周，返回周对应的周一和周日的日期
     * 星期一为第一周的开始
     */
    public static WeekRange getWeek(int year, int week) {
        return getWeek(year, week, Calendar.MONDAY);
    }

    /**
     * 根据年，周，返回周对应的周一和周日的日期
     */
    public static WeekRange getWeek(int year, int week, int firstDayOfWeek) {
        WeekRange weekRange = new WeekRange();
        weekRange.setYear(year);
        weekRange.setWeek(week);

        Calendar cal = DateUtils.truncate(Calendar.getInstance(), Calendar.DATE);
        calendarWeekFormat(cal, firstDayOfWeek);

        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.WEEK_OF_YEAR, week);
        weekRange.setStart(cal.getTime());
        cal.add(Calendar.DAY_OF_MONTH, 6);
        weekRange.setEnd(cal.getTime());

        return weekRange;
    }

    /**
     * 设置:
     * 星期一为第一周的开始
     * 一周有7天
     * 对于夸年的周，一周的最小天数是 1
     */
    private static void calendarWeekFormat(Calendar calendar, int firstDayOfWeek) {
        calendar.setFirstDayOfWeek(firstDayOfWeek);
        calendar.setMinimalDaysInFirstWeek(1);
    }
}
