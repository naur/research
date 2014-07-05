package org.naure.repositories.construction;

import org.apache.commons.lang3.StringUtils;
import org.naure.common.entities.Entity;
import org.naure.common.patterns.Tree;
import org.naure.repositories.config.MongoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:13 PMgit
 * To change this template use File | Settings | File Templates.
 */
@Component
public class MongoWorkspace extends AbstractWorkspace {

    /**
     * 支持分页查询，分页参数【Paging:   put(Type.Paging.name(), new Tree(Type.Paging, new Tree<Integer>(3), new Tree<Integer>(1)))】
     * 支持返回的字段和排除的字段【include, exclude】, 以逗号分割
     */
    @Override
    public <T, U> List<U> get(T t, Class<U> resultClass) throws Exception {
        if (!(t instanceof Map)) {
            throw new Exception("t is not Map");
        }

        List<U> result = null;

        //如果 t 包含【match, unwind, group】 那么采用【聚合】查询
        Map params = (Map) t;
        if (params.containsKey("match") && params.containsKey("unwind") && params.containsKey("group")) {
            result = aggregate(params, resultClass);
        } else {
            result = find(params, resultClass);
        }
        return result;
    }

    @Override
    public <T> boolean add(T t) throws Exception {
        //TODO 如果是空字符串，那么要把 id 置为 null, 否则 MongoDB 不能自动生成 _id 值
        if (StringUtils.isEmpty(((Entity) t).getId())) {
            ((Entity) t).setId(null);
        }

        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
        mongoOps.insert(t, collectionName(t.getClass().getName()));
        return true;
    }

    @Override
    public <T> boolean delete(T t) throws Exception {
        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        Map params = (Map) t;
        for (Object key : params.keySet()) {
            if ("class".equals(key)) {
                continue;
            }
            query.addCriteria(parseCriteria(params.get(key), key));
        }

        mongoOperations.remove(query, collectionName(params.get("class").toString()));
        return true;
    }

    @Override
    public <T> boolean update(T t) throws Exception {
        Map params = (Map) t;
        Query query = new Query();
        Update update = new Update();

        //STEP 1: 获取查询条件
        Map subMap = null;
        if (params.containsKey("query")) {
            subMap = (Map) params.get("query");
            for (Object key1 : subMap.keySet()) {
                query.addCriteria(Criteria.where(key1.toString()).is(subMap.get(key1)));
            }
        }

        //STEP 2: 获取更新信息
        Object array = null;
        if (params.containsKey("update")) {
            subMap = (Map) params.get("update");
            for (Object key2 : subMap.keySet()) {
                array = subMap.get(key2);
                if (null == array) continue;
                //文档参考：http://hi.baidu.com/farmerluo/item/15ba88579b8bbb9409be17bb
                //todo 对 pushAll 支持有问题 【can't serialize class org.naure.common.location.GeoPosition】
                if (array instanceof Object[]) {
                    update.addToSet(key2.toString(), ((Object[]) array)[0]);
                } else if (array instanceof List && ((List) array).size() > 0) {
                    update.addToSet(key2.toString(), ((List) array).get(0));
                } else {
                    update.set(key2.toString(), array);
                }
            }
        }

        mongoConfiguration.mongoTemplate()
                .updateMulti(query, update, collectionName(params.get("class").toString()));
        return true;
    }

    @Override
    public <T> boolean exists(T t) throws Exception {
        if (!(t instanceof Map)) {
            throw new Exception("t is not Map!");
        }

        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        Map params = (Map) t;
        String collectionName = collectionName(params.get("class").toString());
        params.remove("class");
        for (Object key : params.keySet()) {
            query.addCriteria(Criteria.where(key.toString()).is(params.get(key)));
        }
        return mongoOperations.exists(query, collectionName);
    }

    @Override
    public <T> long count(T t) throws Exception {
        if (!(t instanceof Map)) {
            throw new Exception("t is not Map!");
        }

        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        Map params = (Map) t;
        String collectionName = collectionName(params.get("class").toString());
        params.remove("class");
        for (Object key : params.keySet()) {
            query.addCriteria(Criteria.where(key.toString()).is(params.get(key)));
        }
        return mongoOperations.count(query, collectionName);
    }

    /**
     * 采用直接查询
     */
    private <U> List<U> find(Map params, Class<U> resultClass) throws Exception {
        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();

        //默认页面信息: 默认第一页是【1】
        int pageSize = 30;
        int pageIndex = 1;
        Object value = null;

        if (null != params) {
            for (Object key : params.keySet()) {
                value = params.get(key);
                if (value instanceof Tree) {
                    Tree tree = (Tree) value;
                    switch (tree.getType()) {
                        case Paging:
                            //Usage: put(Type.Paging.name(), new Tree(Type.Paging, new Tree<Integer>(3), new Tree<Integer>(1)));
                            pageSize = (Integer) tree.getLeft().getInfo();
                            pageIndex = (Integer) tree.getRight().getInfo();
                            break;
                        case Include:
                            //Usage: put(Type.Exclude.name(), new Tree<String>(Type.Exclude, "quotes"));
                            String[] includeKeys = tree.getInfo().toString().split(",");
                            for (String subKey : includeKeys) {
                                query.fields().include(subKey);
                            }
                            break;
                        case Exclude:
                            String[] excludeKeys = tree.getInfo().toString().split(",");
                            for (String subKey : excludeKeys) {
                                query.fields().exclude(subKey);
                            }
                            break;
                        case Field:
                            if (tree.getInfo() instanceof Map) {
                                //Usage: Map<Key, Map<SubKey, Value>>
                                for (Map.Entry entry : ((Map<String, Object>) tree.getInfo()).entrySet()) {
                                    query.fields().elemMatch(key.toString(), parseCriteria(entry.getValue(), entry.getKey()));
                                }
                            } else {
                                //Usage: Map<Key, Value>
                                query.fields().elemMatch(key.toString(), parseCriteria(tree.getInfo()));
                            }
                            break;
                        case Sort:
                            //TODO 暂时处理
                            query.with(new Sort(tree.getInfo().toString().split(",")));
                            break;
                        default:
                            query.addCriteria(parseCriteria(tree, key));
                            break;
                    }
                } else {
                    query.addCriteria(Criteria.where(key.toString()).is(value));
                }

            }
        }

        //默认页面信息: 默认第一页是【1】
        if (pageSize == 0) pageSize = 30;
        if (pageIndex == 0) pageIndex = 1;
        query.skip(pageSize * (pageIndex - 1));
        query.limit(pageSize);
        return mongoOperations.find(
                query,
                resultClass,
                collectionName(resultClass.getName())
        );
    }

    /**
     * 采用【聚合】查询
     */
    private <U> List<U> aggregate(Map params, Class<U> resultClass) throws Exception {
        Criteria criteria = new Criteria();
        //对2个 match ，分开与不分开结果一样。
        Map<String, Object> matchParams = (Map) params.get("match");
        for (Map.Entry<String, Object> entry : matchParams.entrySet()) {
            criteria.elemMatch(parseCriteria(entry.getValue(), entry.getKey()));
        }
        return mongoConfiguration.mongoTemplate().aggregate(newAggregation(resultClass,
                match(criteria),
                unwind(params.get("unwind").toString()),
                match(criteria),
                group("id").addToSet(params.get("group").toString()).as(params.get("group").toString())
        ), collectionName(resultClass.getName()), resultClass).getMappedResults();
    }

    /**
     * 如果 key 是 Map, 默认是 Criteria.is
     * 当设置 addCriteria 时，返回的文档中包含子文档的所有数据
     * 当设置 fields 时，返回的文档中只有子文档数据
     */
    private Criteria parseCriteria(Object value, Object... keys) {
        Criteria criteria = null;
        String key = keys.length > 0 ? keys[0].toString() : null;
        if (value instanceof Tree) {
            Tree tree = (Tree) value;
            //如果有 keys 参数，去参数的第 0 个，如果没有 keys 参数，那么取 tree 的 info 字段作为 key
            if (null == key) key = tree.getInfo().toString();
            switch (tree.getType()) {
                case In:
                    // info 值必须是 List
                    criteria = Criteria.where(key.toString()).in((List) tree.getInfo());
                    break;
                case Between:
                    criteria = Criteria.where(key.toString()).gte(tree.getLeft().getInfo()).lte(tree.getRight().getInfo());
                    break;
                case All:
                    criteria = Criteria.where(key.toString()).all(tree.getInfo());
                    break;
                case And:
                    //query.addCriteria(Criteria.where(key.toString()).and(tree.getLeft().getInfo(), tree.getRight().getInfo()));
                    break;
                case Regex:
                    criteria = Criteria.where(key.toString()).regex(String.valueOf(tree.getInfo()));
                    break;
            }
        } else {
            criteria = Criteria.where(key.toString()).is(value);
        }
        return criteria;
    }

    /**
     * 根据类名解析获取 MongoDB 的 collections 名
     *
     * @return
     */
    private String collectionName(String classFullName) {
        return classFullName.substring(
                classFullName.indexOf("models.") + 7
        ).toLowerCase();
    }

    @Autowired
    private MongoConfiguration mongoConfiguration;
}
