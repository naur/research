package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.learn.Eng;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 6/8/12
 * Time: 2:40 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class EngRepository extends Repository {
    public boolean add(final Eng eng) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>(){{
            put("word", eng.getWord());
            put("class", eng.collectionName());
        }};

        if (this.exists(query)) {
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
            return workspace.add(eng);
    }
}
