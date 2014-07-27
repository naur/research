package org.naure.shoping.repositories;

import httl.util.StringUtils;
import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.repositories.construction.Repository;
import org.naure.shoping.models.Jade;
import org.springframework.data.repository.query.parser.Part;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 6/28/2014.
 */
@Component
public class JadeRepository extends Repository {

    public List<Jade> get(Jade jade) throws Exception {
        Map params = new HashMap();
        if (StringUtils.isNotEmpty(jade.getName())) {
            //name 模糊查询
            params.put("name", new Tree<String>(Type.Regex, jade.getName()));
        }
        if (StringUtils.isNotEmpty(jade.getClassify())) {
            params.put("classify", jade.getClassify());
        }
        return workspace.get(params, Jade.class);
    }

    public boolean exists(final Jade jade) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("name", jade.getName());
            put("classify", jade.getClassify());
            put("class", jade.getClass());
        }};

        return this.exists(query);
    }

    public boolean update(final Jade jade) throws Exception {
        Map<String, Object> query = new HashMap<String, Object>() {{
            put("id", jade.getId());
        }};

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            put("classify", jade.getClassify());
            put("name", jade.getName());
            put("title", jade.getTitle());
            put("description", jade.getDescription());
            put("uri", jade.getUri());
        }});
        update.put("class", jade.getClass());

        return update(update);
    }

    public boolean add(final Jade jade) throws Exception {
        jade.setCreated(Calendar.getInstance().getTime());
        jade.setUpdated(jade.getCreated());
        return workspace.add(jade);
    }
}
