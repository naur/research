package org.naure.services;

import org.naure.repositories.ScheduleRepository;
import org.naure.repositories.models.learn.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/10/12
 * Time: 2:40 PM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class ScheduleService {
    public List<Schedule> get(Map params) throws Exception {
        return scheduleRepository.get(params, Schedule.class);
    }

    public boolean edit(Schedule schedule) throws Exception {
        return scheduleRepository.edit(schedule);
    }

    @Autowired
    private ScheduleRepository scheduleRepository;
}
