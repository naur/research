package org.naur.repositories.test;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.naur.common.entities.Entity;
import org.naur.common.test.UnitTestBase;
import org.naur.repositories.SystemRepository;
import org.naur.repositories.models.Menu;
import org.naur.repositories.models.Session;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Administrator on 5/11/14.
 */
public class SystemRepositoryTest  extends UnitTestBase {

    @Autowired
    private SystemRepository repository;

    @Test
    public void test_add() {
        Menu menu = new Menu();
        menu.setId("finance");
        menu.setName("金融");
        menu.setUri("/finance/view");

        Session session = new Session();
        session.setId("12121212");
        session.setApplication("research");
        session.setSessionId("12121212");
        try {
            repository.add(menu);
            List<Menu> list1 = repository.get("finance", Menu.class);
            Assert.assertEquals(1, list1.size());

            repository.add(session);
            List<Session> list2 = repository.get("12121212", Session.class);
            Assert.assertEquals(1, list2.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test_add_multi() {
        Menu menu1 = new Menu();
        menu1.setId("finance");
        menu1.setName("金融");
        menu1.setUri("/finance/view");

        Menu menu2 = new Menu();
        menu2.setId("finance1");
        menu2.setName("金融");
        menu2.setUri("/finance/view");
        try {
            repository.add(menu1);
            repository.add(menu2);
            List<Menu> list1 = repository.get("finance", Menu.class);
            Assert.assertEquals(1, list1.size());
            List<Menu> list2 = repository.get(null, Menu.class);
            Assert.assertEquals(2, list2.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //TODO 错误单元测试
    @Ignore
    @Test
    public void test_get_all() throws Exception {
        Menu menu1 = new Menu();
        menu1.setId("finance");
        menu1.setName("金融");
        menu1.setUri("/finance/view");

        Menu menu2 = new Menu();
        menu2.setId("finance1");
        menu2.setName("金融");
        menu2.setUri("/finance/view");

        Session session = new Session();
        session.setId("12121212");
        session.setApplication("research");
        session.setSessionId("12121212");

        repository.add(menu1);
        repository.add(menu2);
        repository.add(session);

        List<Entity> list = repository.get(null, Entity.class);
        Assert.assertTrue(list.size() >= 3);
    }
}
