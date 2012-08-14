package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.learn.Schedule;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/10/12
 * Time: 2:44 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class ScheduleRepository extends Repository {

    public boolean edit(final Schedule schedule) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("class", schedule.collectionName());
            if (null != schedule.getId() || "" != schedule.getId())
                put("id", schedule.getId());
            else {
                if (null != schedule.getHeading() || "" != schedule.getHeading())
                    put("heading", schedule.getHeading());
                if (null != schedule.getPath() || "" != schedule.getPath())
                    put("path", schedule.getPath());
            }
        }};

        if (this.exists(query)) {
            Map<String, Object> update = new HashMap<String, Object>();
            update.put("query", query);
            update.put("update", new HashMap<String, Object>() {{
                if (0 != schedule.getNumber())
                    put("number", schedule.getNumber());
                if (null != schedule.getTime())
                    put("time", schedule.getTime());
                if (null != schedule.getHeading() && !schedule.getHeading().isEmpty())
                    put("heading", schedule.getHeading());
                if (null != schedule.getPath() && !schedule.getPath().isEmpty())
                    put("path", schedule.getPath());
                put("updated", Calendar.getInstance().getTime());
            }});
            update.put("class", schedule.collectionName());
            return update(update);
        } else {
            schedule.setCreated(Calendar.getInstance().getTime());
            schedule.setUpdated(schedule.getCreated());
            return workspace.add(schedule);
        }
    }
}
