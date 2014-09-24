package org.naure.repositories;

import org.apache.commons.lang3.StringUtils;
import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.finance.Security;
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

    //TODO 重构后未验证
    public boolean delete(Schedule schedule) throws Exception {
        String path = schedule.getPath();
        Map<String, Object> params = new HashMap<String, Object>();
        if (path.isEmpty() || "all".equals(path))
            params.put("path", new Tree<String>(Type.Regex, "^\\d+,"));
        else {
            //todo 1,2,3,...
            params.put("path", new Tree<String>(Type.Regex, "^[" + path.replace(",", "|") + "]+,"));
        }
        params.put("class", schedule.getClass());
        return super.delete(params);
    }

    public boolean exists(final Schedule schedule) throws Exception {
        return super.exists(identifier(schedule));
    }

    public boolean update(final Schedule schedule) throws Exception {
        Map<String, Object> query = identifier(schedule);

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            if (0 != schedule.getNumber())
                put("number", schedule.getNumber());
            if (0 != schedule.getDays())
                put("days", schedule.getDays());
            if (0 != schedule.getPages())
                put("pages", schedule.getPages());
            if (null != schedule.getTime())
                put("time", schedule.getTime());
            if (null != schedule.getHeading() && !schedule.getHeading().isEmpty())
                put("heading", schedule.getHeading());
            if (null != schedule.getPath() && !schedule.getPath().isEmpty())
                put("path", schedule.getPath());
            put("updated", Calendar.getInstance().getTime());
        }});
        update.put("class", schedule.getClass());
        return super.update(update);
    }

    public boolean add(final Schedule schedule) throws Exception {
        schedule.setCreated(Calendar.getInstance().getTime());
        schedule.setUpdated(schedule.getCreated());
        return super.add(schedule);
    }

    private Map identifier(final Schedule schedule) {
        return new HashMap<String, Object>() {{
            put("class", schedule.getClass());
            //根据 id 主键来判断
            if (StringUtils.isNotEmpty(schedule.getId())) {
                put("id", schedule.getId());
            }
            //根据字段来判断
            else {
                if (StringUtils.isNotEmpty(schedule.getHeading()))
                    put("heading", schedule.getHeading());
                if (StringUtils.isNotEmpty(schedule.getPath()))
                    put("path", schedule.getPath());
            }
        }};
    }
}
