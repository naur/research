/*
 * @(#) ScheduleService.java 2014-01-09
 *
 * Copy Right@ NAURE.ORG
 */

package org.naure.properties;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.ObjectMapper;
import org.naure.common.patterns.exception.Action;
import org.naure.repositories.models.Scheduler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 * author Administrator
 *
 * 定时任务管理服务
 *
 * 创建日期: 2014-01-09
 * 修改人 :
 * 修改说明:
 * 评审人 ：
 * </pre>
 */
@Configuration
public class SchedulerProperties {

    @Autowired
    private ApplicationContext applicationContext;

    public Map<String, Scheduler> schedulers;
    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerProperties.class);

    @Value("${schedulers}")
    public void schedulers(String schedluers) {
        schedulers = new HashMap<String, Scheduler>();

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonParser jp = new JsonFactory().createJsonParser(schedluers);
            jp.nextToken();
            while (jp.nextToken() == JsonToken.START_OBJECT) {
                Scheduler scheduler = mapper.readValue(jp, Scheduler.class);
                scheduler.setTask((Action)applicationContext.getBean(scheduler.getTask().toString()));
                schedulers.put(scheduler.getId(), scheduler);
            }
        } catch (Exception ex) {
            LOGGER.equals(ex);
        }
    }
}
