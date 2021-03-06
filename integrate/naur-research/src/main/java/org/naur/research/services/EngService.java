package org.naur.research.services;

import org.naur.repositories.EngRepository;
import org.naur.repositories.models.learn.Eng;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
        return engRepository.get(params, Eng.class);
    }

    public Eng get(int identifier) throws Exception {
        return engRepository.get(identifier, Eng.class);
    }

    public boolean add(final Eng eng) throws Exception {
        return engRepository.add(eng);
    }

    @Autowired
    private EngRepository engRepository;
}
