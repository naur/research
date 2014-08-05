package org.naure.research.labs.nosql;


import org.naure.common.patterns.Enable;
import org.naure.repositories.redis.support.RedisCommands;
import org.naure.research.labs.Sub;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 13-5-15
 * Time: 下午6:07
 * To change this template use File | Settings | File Templates.
 */
@Enable(false)
public class Redis extends Sub {
    private static final Logger logger = LoggerFactory.getLogger(Redis.class);

    public void execute() throws Exception {
        double code = Math.floor(Math.random() * 100);
        //redis("a", code);
        replicatedZookeeper();
    }


    private void replicatedZookeeper() {
        new ZookeeperService().test();
    }

    private void redis(String key, Object value) {
        Jedis jedis = new Jedis("192.168.229.90", 6379, 2000);
        String ping = jedis.ping();
        System.out.println(ping);
        System.out.println(jedis.info());

        RedisCommands commands = cacheService.getJedis();
        String result = commands.set(perfix + key, "Hello world ! " + String.valueOf(value));
        System.out.println(result + ", key=" + key + ", value=: " + value);
    }

    private String perfix = "labs:";
    private JedisCacheClient cacheService;// = JedisCacheClient.getInstance();
}
