package org.naure.repositories.test;

import junit.framework.Assert;
import org.junit.Test;
import org.naure.common.patterns.Tree;
import org.naure.common.patterns.Type;
import org.naure.repositories.models.finance.Stock;

import java.util.HashMap;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/2/12
 * Time: 2:26 PM
 * To change this template use File | Settings | File Templates.
 */
public class MongoDBSearchTest extends MongoDBTest {

    //查询：所有数据
    @Test
    public void testGetAll() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
    }

    //查询：所有数据, Exclude 嵌入的子文档
    @Test
    public void testGetAllExcludeEmbedded() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Exclude.name(), new Tree(Type.Exclude, "quotes"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(0, result.get(0).getQuotes().size());
    }

    //查询：所有数据, 嵌入文档比较
    @Test
    public void testGetAllEmbedded() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put("code", "600003");
            put("quotes.date", dateFormat.parse("2014-03-02"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(1, result.get(0).getQuotes().size());

        result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put("code", "600003");
            put("quotes.date", dateFormat.parse("2014-04-02"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(0, result.size());
    }

    //查询：所有数据, 指定范围
    @Test
    public void testGetAllRange() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put("quotes.date", new Tree(Type.Between)
                    .setLeft(new Tree(dateFormat.parse("2014-02-02")))
                    .setRight(new Tree(dateFormat.parse("2014-02-04"))));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(3, result.get(0).getQuotes().size());
    }

    //查询：排序
    @Test
    public void testSort() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Sort.name(), new Tree<String>(Type.Sort, "code"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
        Assert.assertEquals("600001", result.get(0).getCode());
        Assert.assertEquals("600005", result.get(4).getCode());
    }

    //查询：指定DESC排序
    @Test
    public void testSortDesc() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Sort.name(), new Tree<String>(Type.Sort, "desc code"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
        Assert.assertEquals("600005", result.get(0).getCode());
        Assert.assertEquals("600001", result.get(4).getCode());
    }

    //查询：子集合数据-相等查询
    @Test
    public void testGetSubCollection() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put("code", "600003");
            put("quotes", new Tree(Type.Field, new HashMap<String, Object>() {{
                put("date", dateFormat.parse("2014-03-02"));
            }}));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(1, result.get(0).getQuotes().size());
    }

    //查询：子集合数据-指定范围查询
    @Test
    public void testGetSubCollectionRange() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put(Type.Sort.name(), new Tree<String>(Type.Sort, "id,type,code,name,totalCapital,currCapital,desc quotes.date"));
            put("type", "test");
            put("code", "600005");
            put("quotes.date", new Tree(Type.Between)
                    .setLeft(new Tree(dateFormat.parse("2014-05-02")))
                    .setRight(new Tree(dateFormat.parse("2014-05-04"))));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(3, result.get(0).getQuotes().size());
        Assert.assertEquals("2014-05-04", dateFormat.format(result.get(0).getQuotes().get(0).getDate()));
        Assert.assertEquals("2014-05-02", dateFormat.format(result.get(0).getQuotes().get(2).getDate()));
    }

    //查询：分页数据
    @Test
    public void testPaging() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Paging.name(), new Tree(Type.Paging, new Tree<Integer>(3), new Tree<Integer>(1)));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(3, result.size());
        Assert.assertEquals(6, result.get(0).getQuotes().size());
    }

    //查询：排除特定字段
    @Test
    public void testExclude() throws Exception {
        List<Stock> result = mongoWorkspace.get(new HashMap<String, Object>() {{
            put("type", "test");
            put(Type.Exclude.name(), new Tree<String>(Type.Exclude, "quotes"));
        }}, Stock.class);
        Assert.assertNotNull(result);
        Assert.assertEquals(5, result.size());
        Assert.assertEquals(0, result.get(0).getQuotes().size());
    }
}
