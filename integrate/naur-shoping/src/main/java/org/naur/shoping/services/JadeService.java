package org.naur.shoping.services;

import org.naur.shoping.models.Jade;
import org.naur.shoping.repositories.JadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 6/28/2014.
 */
@Service
public class JadeService {

    public List<Jade> get(Jade jade) throws Exception {
        return jadeRepository.get(jade);
    }

    public boolean edit(Jade jade) throws Exception {
        if (null == jade.getId()) {
            throw new Exception("ID为空！");
        }
        return jadeRepository.update(jade);
    }

    public boolean add(Jade jade) throws Exception {
        if (jadeRepository.exists(jade)) {
            throw new Exception("相同的名称(" + jade.getName() + ")和类别(" + jade.getClassify() + ")已经存在！");
        }
        return jadeRepository.add(jade);
    }

    @Autowired
    private JadeRepository jadeRepository;
}
