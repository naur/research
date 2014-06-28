package org.naure.shoping.service;

import org.naure.shoping.model.Jade;
import org.naure.shoping.model.JadeClassify;
import org.naure.shoping.repositories.JadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 6/28/2014.
 */
@Service
public class JadeService {

    public List<Jade> get(Jade params) {
        //jadeRepository.get();;

        List<Jade> list = new ArrayList<>();
        for (int i = 1; i < 20; i++) {
            Jade jade = new Jade();
            jade.setId(String.valueOf(i));
            jade.setName("NAME:" + jade.getId());
            jade.setClassify(JadeClassify.SMALL.name());
            jade.setTitle("TITLE" + jade.getId());
            jade.setDescription("Description: id = " + jade.getId() + ", name = " + jade.getName() + ", classify = " + jade.getClassify() + ", title = " + jade.getTitle());
            list.add(jade);
        }

        return list;
    }

    public boolean edit(Jade jade) throws Exception {
        return jadeRepository.update(jade);
    }

    public boolean add(Jade jade) throws Exception {
        return jadeRepository.add(jade);
    }

    @Autowired
    private JadeRepository jadeRepository;
}
