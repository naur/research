package org.naure.repositories.test;

import org.junit.Test;
import org.naure.common.test.UnitTestBase;
import org.naure.repositories.config.MongoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/2/12
 * Time: 2:26 PM
 * To change this template use File | Settings | File Templates.
 */
public class MongoDBTest extends UnitTestBase {
    @Test
    public void test1() throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
    }

    @Autowired
    private MongoConfiguration mongoConfiguration;
}
