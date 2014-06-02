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
    public void test_add_primary() {
        Menu menu = new Menu();
        menu.setName("finance");
        menu.setUri("/finance/view");

        Session session =new Session();
        session.setApplication("research");
        session.setSessionId("12121212");
        try {
            repository.add(menu);
            repository.add(session);
            List<Menu> list1 = repository.get("", Menu.class);
            Assert.assertTrue(2 <= list1.size());
            List<Menu> list2 = repository.get(Menu.class.getName(), Menu.class);
            Assert.assertEquals(1, list1.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_add_secondary() {
        Menu menu1 = new Menu();
        menu1.setId("finance");
        menu1.setName("金融");
        menu1.setUri("/finance/view");

        Menu menu2 = new Menu();
        menu2.setId("lab");
        menu2.setName("研究");
        menu2.setUri("/finance/view");

        try {
            repository.add(menu1);
            repository.add(menu2);
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
