/*
 * @(#) DateUtil.java 2014-38-12
 * 
 * Copy Right@ 纽海信息技术有限公司
 */
package org.naure.common.util;

import org.apache.commons.lang3.time.DateUtils;
import org.naure.common.entities.WeekRange;

import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * <pre>
 * author jiaruizhi
 *
 *
 * 创建日期: 2014-38-12
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public class DateUtil {

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
     */
    public static WeekRange getWeek(Date focus) {
        WeekRange range = new WeekRange();

        // 计算周的起点和终点
        Calendar gval = DateUtils.toCalendar(focus);
        Calendar start = DateUtils.truncate(gval, Calendar.DATE);
        Calendar end = DateUtils.truncate(gval, Calendar.DATE);
        int startCutoff = Calendar.MONDAY;
        int endCutoff = Calendar.SUNDAY;
        while (start.get(Calendar.DAY_OF_WEEK) != startCutoff) {
            start.add(Calendar.DATE, -1);
        }
        while (end.get(Calendar.DAY_OF_WEEK) != endCutoff) {
            end.add(Calendar.DATE, 1);
        }
        range.setStart(start.getTime());
        range.setEnd(end.getTime());

        // 计算年和周
        calendarWeekFormat(end);
        range.setYear(end.get(Calendar.YEAR));
        range.setWeek(end.get(Calendar.WEEK_OF_YEAR));

        return range;
    }

    /**
     * 根据年，周，返回周对应的周一和周日的日期
     */
    public static WeekRange getWeek(int year, int week) {
        WeekRange weekRange = new WeekRange();
        weekRange.setYear(year);
        weekRange.setWeek(week);

        Calendar cal = DateUtils.truncate(Calendar.getInstance(), Calendar.DATE);
        calendarWeekFormat(cal);

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
    private static void calendarWeekFormat(Calendar calendar) {
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setMinimalDaysInFirstWeek(1);
    }
}
