package org.naure.common.entities;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 11/12/12
 * Time: 11:30 AM
 * To change this template use File | Settings | File Templates.
 */

//提供通用的关于【HTTP 响应】的数据模型 和 【Web Service 响应】的数据模型结构
//@XStreamAlias("Information")
//@XmlRootElement
public class Information<T> { //implements Serializable

    public Information() {
    }

    public Information(T t) {
        this.data = t;
    }

    public Information(String category, int level) {
        this(category, level, null, null, null);
    }

    public Information(String category, int level, String keywords) {
        this(category, level, keywords, null, null);
    }

    public Information(String category, int level, String keywords, String id) {
        this(category, level, keywords, id, null);
    }

    public Information(String category, int level, T t) {
        this(category, level, null, null, t);
    }

    public Information(String category, int level, String keywords, T t) {
        this(category, level, keywords, null, t);
    }

    public Information(String category, int level, String keywords, String id, T t) {
        this.category = category;
        this.level = level;
        this.keywords = keywords;
        this.id = id;
        this.data = t;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRelatedId() {
        return relatedId;
    }

    public void setRelatedId(String relatedId) {
        this.relatedId = relatedId;
    }

    public Date getTimeCreated() {
        return TimeCreated;
    }

    public void setTimeCreated(Date timeCreated) {
        TimeCreated = timeCreated;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getOpInfo() {
        return opInfo;
    }

    public void setOpInfo(String opInfo) {
        this.opInfo = opInfo;
    }

    //以下为预定义字段，标识有预定义，但可根据上下文环境来决定单个字段的具体意义和用途
    //预定义：名称，例如：【file 来标识文件】
    private String name;
    //预定义：类别，分类，或者是 name 下面的 子name ，例如：【upload 来标识文件的上传】
    private String category;
    //预定义：级别，例：【Information，Error，Success】或者 与之关联的 INT   暂定：0 表示成功，2 表示错误
    private int level;
    //预定义：关键字
    private String keywords;
    //预定义：操作信息，或者方法名
    private String opInfo;
    //预定义：标识符
    private String id;
    //预定义：与 【标识符】有关联的 ID
    private String relatedId;
    //预定义：记录时间
    private Date TimeCreated;
    //预定义：数据BODY
    private T data;
}
