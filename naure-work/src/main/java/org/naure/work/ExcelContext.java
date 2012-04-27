package org.naure.work;

import org.naure.common.pattern.Delegator;
import org.naure.common.pattern.HandlerBase;
import org.naure.common.Notification;
import org.naure.common.OffsetInfo;
import org.naure.utility.excel.ExcelDocument;
import org.naure.utility.excel.ExcelRow;
import org.naure.utility.excel.ExcelTranslate;
import org.naure.utility.excel.TranslateInfo;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 10/21/11
 * Time: 7:06 PM
 * To change this template use File | Settings | File Templates.
 */
public abstract class ExcelContext<T> implements Delegator.Callback {

    public ExcelContext() {
        this(null, null);
    }

    public ExcelContext(ExcelDocument document) {
        this(document, null);
    }

    public ExcelContext(HandlerBase validateHandler) {
        this(null, validateHandler);
    }

    public ExcelContext(ExcelDocument document, HandlerBase validateHandler) {
        this.delegator = new Delegator(this);
        this.document = document;
        this.validateHandler = validateHandler;
    }

    public void handle() throws Exception {
        this.delegator.execute();
    }

    public void setStrategy() {
        if (document != null) {
            if (document.getStrategy() == null) {
                document.setStrategy(new ExcelStrategy<T>());
            }
        }
    }

    //解析 Excel 第一行【表头】
    public void parseHead(ExcelRow row) {
//        Pattern pattern = Pattern.compile("^[^\\u4e00-\\u9fa5]*([\\u4e00-\\u9fa5]+)[^\\d]+([\\d]+)$");
//        Matcher matcher;
//        for (int i = 5; i < row.cells.length; i++) {
//            matcher = pattern.matcher(row.cells(i).value());
//            matcher.find();
//            row.getSheet().heads.put(matcher.group(1),
//                    new OffsetInfo(i,
//                            Integer.parseInt(matcher.group(2))));
//        }

        for (int i = 0; i < row.cells.length; i++) {
            this.heads.put(String.valueOf(i), new OffsetInfo(i, row.cells(i).value()));
        }
    }

    //解析 Excel  行
    public abstract void parseRow(ExcelRow row, ExcelTranslate<T> translate);

    //解析 Excel  行 成功！
    public void parseRowSuccess(ExcelContext<T> current, ExcelTranslate<T> translate) {
        current.addNotification(translate.getNotifications());
        current.addEntity(translate.getEntities());
    }

    @Override
    public void begin() throws Exception {
        if (!isInit) {
            entities = new ArrayList<T>();
        }
        notifications = new ArrayList<Notification<TranslateInfo>>();
        heads = new LinkedHashMap<String, OffsetInfo>();
        setStartIndex();
        setTitle();
        setHeads();
        //setValidateHandler();
        //setDocument();
        setStrategy();
    }

    @Override
    public void end() throws Exception {
    }

    public void addEntity(List<T> tList) {
        entities.addAll(tList);
    }

    public void addEntity(T t) {
        entities.add(t);
    }

    public void addNotification(Notification<TranslateInfo> notification) {
        this.notifications.add(notification);
    }

    public void addNotification(List<Notification<TranslateInfo>> notifications) {
        this.notifications.addAll(notifications);
    }

    public void addHead(String key) {
        addHead(key, null);
    }

    public boolean isError() {
        for (Notification item : this.notifications) {
            if ("error".equals(item.getLevel())) {
                return true;
            }
        }
        return false;
    }

    public void addHead(String key, OffsetInfo value) {
        heads.put(key, value);
    }

    public void setTitle() {
    }

    public void setHeads() {
    }

    public void setStartIndex() {
        this.startIndex = 0;
    }

    public void setValidateHandler(HandlerBase validateHandler) {
        this.validateHandler = validateHandler;
    }

    public void setDocument(ExcelDocument document) {
        this.document = document;
    }

    public List<T> getEntities() {
        return entities;
    }

    public List<Notification<TranslateInfo>> getNotifications() {
        return notifications;
    }

    public void setEntities(List<T> entities) {
        this.entities = entities;
        this.isInit = true;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    protected String title;
    protected Map<String, OffsetInfo> heads;
    protected ExcelDocument document;
    protected List<Notification<TranslateInfo>> notifications;
    protected List<T> entities;
    protected HandlerBase validateHandler;
    private Delegator delegator;
    protected int startIndex;
    private boolean isInit = false;
    protected InputStream inputStream;
}
