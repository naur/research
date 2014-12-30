package org.naur.repositories.construction;

import org.apache.commons.lang3.StringUtils;
import org.naur.common.entities.Entity;
import org.naur.common.patterns.Tree;
import org.naur.common.patterns.Type;
import org.naur.repositories.config.MongoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/3/12
 * Time: 5:13 PMgit
 * To change this template use File | Settings | File Templates.
 */
@Component
public class MongoWorkspace extends AbstractWorkspace {

    private static final String DOT = "s.";

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
        Map<String, Object> params = (Map) t;

        //TODO: 未考虑到子文档不是数组的情况
        //STEP1: 如果查询添加里的 kye 有【.】表示要进行子文档的查询，这个时候需要用到 【aggregate】才能对嵌入的子文档查询
        //STEP2: 如果【sort】里有【.】表示要进行子文档的排序，这个时候需要用到 【aggregate】才成对嵌入的子文档排序
        //dotKey 作为 【aggregate】时的 unwind
        String dotKey = hasDot(params);
        if (null != dotKey) {
            Map<String, Object> tempParams = new HashMap<String, Object>();
            tempParams.put("match", params);
            tempParams.put("unwind", dotKey);
            tempParams.put("group", dotKey);
            params = tempParams;
        }

        //如果 t 包含【match, unwind】 那么采用【聚合】查询
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

    /**
     * 提供删除文档以及移除之文档里的某一项
     */
    @Override
    public <T> boolean delete(T t) throws Exception {
        if (!(t instanceof Map)) {
            throw new Exception("t not is Map");
        }
        if (!(((Map) t).containsKey("class"))) {
            throw new Exception("t has map not contains class");
        }

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

    /**
     * 只支持符合查询条件的嵌入子数组的第一条记录的更新
     * 插入一条记录到子文档集合里时，不验证是否已经存在
     */
    @Override
    public <T> boolean update(T t) throws Exception {
        Map<String, Object> params = (Map) t;
        Query query = new Query();
        Update update = new Update();

        //STEP 1: 获取查询条件
        Map<String, Object> subMap = null;
        if (params.containsKey("query")) {
            subMap = (Map) params.get("query");
            subMap.remove("class");
            for (String key1 : subMap.keySet()) {
                query.addCriteria(
                        parseCriteria(subMap.get(key1), key1)
                );
            }
        }

        //STEP 2: 获取更新信息
        Object newValue = null;
        if (params.containsKey("update")) {
            subMap = (Map) params.get("update");
            for (String key2 : subMap.keySet()) {
                newValue = subMap.get(key2);
                if (null == newValue) continue;
                //文档参考：http://hi.baidu.com/farmerluo/item/15ba88579b8bbb9409be17bb
                //todo 对 pushAll 支持有问题 【can't serialize class org.naur.common.location.GeoPosition】
                if (newValue instanceof Object[]) {
                    update.pushAll(key2, ((Object[]) newValue));
                } else if (newValue instanceof List && ((List) newValue).size() > 0) {
                    update.pushAll(key2, ((List) newValue).toArray());
                } else {
                    //对包含【.】的情况，是对子文档的字段进行更新，而且是只更新符合条件的第一行记录
                    if (key2.contains(DOT)) key2 = key2.replace(DOT, DOT + "$.");
                    update.set(key2, newValue);
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
        Map<String, Object> params = (Map) t;
        String collectionName = collectionName(params.get("class").toString());
        params.remove("class");
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            query.addCriteria(Criteria.where(entry.getKey()).is(entry.getValue()));
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
                            // left = pageSize , right = pageIndex
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
                            query.with(parseSort(tree));
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
     * 子集合查询条件必须是 【key.subkey】 的类型，不支持【Type.Field】
     * Usage:
     * <pre>
     *      put("type", "test");
     *      put("type", "test");
     *      put("code", "600005");
     *      put("quotes.date", new Tree(Type.Between)
     *          .setLeft(new Tree(dateFormat.parse("2014-05-02")))
     *          setRight(new Tree(dateFormat.parse("2014-05-04"))));
     *      put("fields", "id,type,code,name,totalcapital,currCapital");
     * </pre>
     */
    private <U> List<U> aggregate(Map params, Class<U> resultClass) throws Exception {
        List<AggregationOperation> operations = new ArrayList<AggregationOperation>();

        //TODO fields 设置可能会报错
        //对文档，设置需要返回的字段
        if (!params.containsKey("fields")) params.put("fields", "id");

        //对2个 match ，传参时不分开。
        Map<String, Object> matchParams = (Map) params.get("match");
        List<MatchOperation> matchs = new ArrayList<MatchOperation>();
        List<MatchOperation> subMatchs = new ArrayList<MatchOperation>();
        Sort sort = null;
        for (Map.Entry<String, Object> entry : matchParams.entrySet()) {
            //TODO 包含【.】的是子集合的查询条件
            if (entry.getKey().contains(DOT)) {
                subMatchs.add(match(parseCriteria(entry.getValue(), entry.getKey())));
            } else if (Type.Sort.name().equals(entry.getKey())) {
                //TODO key == Sort 是子集合的 sort 条件
                sort = parseSort((Tree) entry.getValue());
            } else {
                matchs.add(match(parseCriteria(entry.getValue(), entry.getKey())));
            }
        }
        operations.addAll(matchs);
        operations.add(unwind(params.get("unwind").toString()));
        operations.addAll(subMatchs);
        if (null != sort)
            operations.add(sort(sort));
        operations.add(group(params.get("fields").toString().split(",")).push(params.get("group").toString()).as(params.get("group").toString()));

        return mongoConfiguration.mongoTemplate().aggregate(newAggregation(resultClass,
                operations
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
     * Sort
     * <pre>
     *     USAGE:
     *          put(Type.Sort.name(), new Tree<String>(Type.Sort, "asc id, code"));
     * </pre>
     */
    private Sort parseSort(Tree tree) {
        Sort sort = null;
        String[] sortArray = tree.getInfo().toString().split(",");
        String[] subSortArray = null;
        for (String item : sortArray) {
            subSortArray = item.split(" ");
            Sort temp;
            if (2 <= subSortArray.length) {
                temp = new Sort(Sort.Direction.fromString(subSortArray[0].trim()), subSortArray[1].trim());
            } else {
                temp = new Sort(subSortArray[0].trim());
            }
            if (null == sort) {
                sort = temp;
            } else {
                sort = sort.and(temp);
            }
        }
        return sort;
    }

    /**
     * 根据类名解析获取 MongoDB 的 collections 名
     *
     * @return
     */
    private String collectionName(String classFullName) {
        return classFullName.substring(
                classFullName.indexOf("models.") + 7
        ).replaceAll("([a-z])([A-Z])", "$1.$2").toLowerCase();
    }

    /**
     * 对 map 的 【key 以及 key 为 sort 的value】 验证是否含有 【.】
     */
    private String hasDot(Map<String, Object> map) {
        for (String key : map.keySet()) {
            if (key.contains(DOT)) {
                return key.split("\\.")[0];
            }
            if (Type.Sort.name().equals(key)) {
                String temp = ((Tree) map.get(Type.Sort.name())).getInfo().toString();
                if (temp.contains(DOT)) {
                    StringBuilder str = new StringBuilder();
                    //从【.】开始往前搜索字符串
                    for (int i = temp.indexOf(DOT) - 1; i >= 0; i--) {
                        char tmpChar = temp.charAt(i);
                        if (tmpChar == ' ' || tmpChar == ',') {
                            return str.reverse().toString();
                        } else {
                            str.append(tmpChar);
                        }
                    }
                }
            }
        }
        return null;
    }

    @Autowired
    private MongoConfiguration mongoConfiguration;
}
