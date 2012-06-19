package org.naure.repositories;

import org.naure.repositories.construction.Repository;
import org.naure.repositories.models.Eng;
import org.naure.repositories.models.SessionLog;
import org.springframework.stereotype.Component;

import java.util.List;
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
    public boolean add(Eng eng) throws Exception {
        return workspace.add(eng);
    }

    public <T> List<Eng> get(T params) throws Exception {
        return workspace.get(params, Eng.class);
    }

    public Eng get(int identifier) throws Exception {
        return workspace.get(identifier, Eng.class);
    }

    public <T> boolean update(T params) throws Exception {
        return workspace.update(params);
    }
}
