package org.naure.repositories.construction;

import com.mongodb.WriteResult;
import org.apache.commons.lang3.StringUtils;
import org.naure.common.entities.Entity;
import org.naure.common.patterns.Tree;
import org.naure.repositories.config.MongoConfiguration;
import org.naure.repositories.construction.Workspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
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
        MongoOperations mongoOperations = mongoConfiguration.mongoTemplate();
        Query query = new Query();
        //默认页面信息
        int pageSize = 30;
        int pageIndex = 1;
        Map params = (Map) t;
        if (null != params) {
            for (Object key : params.keySet()) {
                if (params.get(key) instanceof Tree) {
                    Tree tree = (Tree) params.get(key);
                    switch (tree.getType()) {
                        case Paging:
                            //Usage: put(Type.Paging.name(), new Tree(Type.Paging, new Tree<Integer>(3), new Tree<Integer>(1)));
                            pageSize = (Integer) tree.getLeft().getInfo();
                            pageIndex = (Integer) tree.getRight().getInfo();
                            //默认第一页是【1】
                            if (pageIndex == 0) pageIndex = 1;
                            break;
                        case In:
                            query.addCriteria(Criteria.where(key.toString()).in(tree.getLeft().getInfo(), tree.getRight().getInfo()));
                            break;
                        case Between:
                            query.addCriteria(Criteria.where(key.toString()).gte(tree.getLeft().getInfo()).lte(tree.getRight().getInfo()));
                            break;
                        case Regex:
                            query.addCriteria(Criteria.where(key.toString()).regex(String.valueOf(tree.getInfo())));
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
                        case Sort:
                            //TODO 暂时处理
                            query.with(new Sort(tree.getInfo().toString().split(",")));
                            break;
                    }
                } else
                    query.addCriteria(Criteria.where(key.toString()).is(params.get(key)));
            }
        }

        query.skip(pageSize * (pageIndex - 1));
        query.limit(pageSize);
        return mongoOperations.find(
                query,
                resultClass,
                collectionName(resultClass.getName())
        );
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
            if (params.get(key) instanceof Tree) {
                Tree tree = (Tree) params.get(key);
                switch (tree.getType()) {
                    case In:
                        query.addCriteria(Criteria.where(key.toString()).in(tree.getLeft().getInfo(), tree.getRight().getInfo()));
                        break;
                    case Between:
                        query.addCriteria(Criteria.where(key.toString()).gte(tree.getLeft().getInfo()).lte(tree.getRight().getInfo()));
                        break;
                    case Regex:
                        query.addCriteria(Criteria.where(key.toString()).regex(String.valueOf(tree.getInfo())));
                        break;
                }
            } else
                query.addCriteria(Criteria.where(key.toString()).is(params.get(key)));
        }

        mongoOperations.remove(query, collectionName(params.get("class").toString()));
        return true;
    }

    @Override
    public <T> boolean update(T t) throws Exception {
        MongoOperations mongoOps = mongoConfiguration.mongoTemplate();
        Map params = (Map) t;
        Query query = new Query();
        Update update = new Update();
        Map subMap = null;
        for (Object key : params.keySet()) {
            if ("class".equals(key))
                continue;
            subMap = (Map) params.get(key);
            if ("query".equals(key))
                for (Object key1 : subMap.keySet())
                    query.addCriteria(Criteria.where(key1.toString()).is(subMap.get(key1)));
            if ("update".equals(key))
                for (Object key2 : subMap.keySet()) {
                    //文档参考：http://hi.baidu.com/farmerluo/item/15ba88579b8bbb9409be17bb
                    //todo 对 pushAll 支持有问题 【can't serialize class org.naure.common.location.GeoPosition】
                    if (subMap.get(key2) instanceof Object[]) {
                        update.addToSet(key2.toString(), ((Object[]) subMap.get(key2))[0]);
                    } else if (null != subMap.get(key2) && subMap.get(key2) instanceof List && ((List) subMap.get(key2)).size() > 0) {
                        update.addToSet(key2.toString(), ((List) subMap.get(key2)).get(0));
                    } else {
                        update.set(key2.toString(), subMap.get(key2));
                    }
                }
        }

        mongoOps.updateMulti(query, update, collectionName(params.get("class").toString()));
        return true;
    }

    @Override
    public <T> boolean exists(T t) throws Exception {
        return !new Long(0).equals(this.count(t));
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
    MongoConfiguration mongoConfiguration;
}
