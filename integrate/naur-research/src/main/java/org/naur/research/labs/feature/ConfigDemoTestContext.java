package org.naur.research.labs.feature;


import org.naur.research.labs.entities.Person;
import org.naur.research.labs.entities.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Administrator on 10/13/13.
 */
@Configuration
public class ConfigDemoTestContext {
    @Bean
    public Person person() {
        Person person = new Person();
        person.setId(1900);
        person.setName("Configuration Bean: person");
        return person;
    }

    @Bean
    public User user() {
        User user = new User();
        user.setId(1800);
        user.setName("Configuration Bean: user");
        return user;
    }
}
