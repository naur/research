package org.naure.services;

import org.naure.repositories.EngRepository;
import org.naure.repositories.SessionRepository;
import org.naure.repositories.models.Eng;
import org.naure.repositories.models.SessionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/8/12
 * Time: 2:45 PM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class EngService {
    public List<Eng> get(Map params) throws Exception {
        return engRepository.get(params);
    }

    public Eng get(int identifier) throws Exception {
        return engRepository.get(identifier);
    }

    public boolean add(final Eng eng) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>(){{
            put("word", eng.getWord());
        }};

        if (this.get(query).size() > 0) {
            Map<String, Object> update = new HashMap<String, Object>();
            update.put("query", query);
            update.put("update", new HashMap<String, Object>(){{
                put("description", eng.getDescription());
                put("updated", eng.getUpdated());
                put("engKoo", eng.getEngKoo());
            }});
            update.put("class", Eng.class);
            return this.update(update);
        } else
            return engRepository.add(eng);
    }

    public boolean update(Map params) throws Exception {
        return engRepository.update(params);
    }

    @Autowired
    private EngRepository engRepository;
}
