/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAUR.ORG
 */

package org.naur.integrate.services.core.scheduler;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.ObjectMapper;
import org.naur.repositories.models.Scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 * author Administrator
 *
 * 定时任务属性
 *
 * 创建日期: 2014-01-09
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
public abstract class SchedulerProperty {

    protected static final Logger LOGGER = LoggerFactory.getLogger(SchedulerProperty.class);

    private Map<String, Scheduler> schedulers;

    protected void schedulers(String schedluers) {
        schedulers = new HashMap<String, Scheduler>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonParser jp = new JsonFactory().createJsonParser(schedluers);
            jp.nextToken();
            while (jp.nextToken() == JsonToken.START_OBJECT) {
                Scheduler scheduler = mapper.readValue(jp, Scheduler.class);
                schedulers.put(scheduler.getId(), scheduler);
            }
        } catch (Exception ex) {
            LOGGER.info("SchedulerProperty init error.", ex);
        }
    }

    public Map<String, Scheduler> getSchedulers() {
        return schedulers;
    }
}
