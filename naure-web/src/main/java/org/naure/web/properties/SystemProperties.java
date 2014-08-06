package org.naure.web.properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/4/12
 * Time: 4:27 PM
 * To change this template use File | Settings | File Templates.
 */
@Configuration
public class SystemProperties {
    @Value("${application.name}")
    public String applicationName;
}
