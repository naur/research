package org.naure.repositories.test;

import org.junit.Assert;
import org.junit.Test;
import org.naure.common.entities.Entity;
import org.naure.repositories.SystemRepository;
import org.naure.repositories.models.Menu;
import org.naure.repositories.models.Session;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Administrator on 5/11/14.
 */
public class SystemRepositoryTest extends UnitTestBase {

    @Test
    public void test_add() {
        Menu menu = new Menu();
        menu.setName("finance");
        menu.setUri("/finance/view");

        Session session =new Session();
        session.setApplication("research");
        session.setSessionId("12121212");
        try {
            repository.add(menu);
            repository.add(session);
            List<Entity> list1 = repository.get("", Entity.class);
            Assert.assertTrue(2 <= list1.size());
            List<Menu> list2 = repository.get(Menu.class.getName(), Menu.class);
            Assert.assertEquals(1, list1.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private SystemRepository repository;
}
