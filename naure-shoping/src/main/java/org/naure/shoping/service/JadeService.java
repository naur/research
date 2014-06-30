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

    public List<Jade> get(Jade jade) throws Exception {
        return jadeRepository.get(jade);

//        List<Jade> list = new ArrayList<>();
//        for (int i = 1; i < 20; i++) {
//            Jade temp = new Jade();
//            temp.setId(String.valueOf(i));
//            temp.setName("图片名字" + temp.getId());
//            temp.setClassify("图片分类" + temp.getId());
//            temp.setTitle("图片标题" + temp.getId());
//            temp.setUri("http://www.ghibli.jp/skin/images/kazetachinu_banner.jpg");
//            temp.setDescription("图片描述信息" + temp.getId());
//            list.add(temp);
//        }
//
//        return list;
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
