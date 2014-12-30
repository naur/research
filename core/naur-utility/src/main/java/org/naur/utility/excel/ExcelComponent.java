package org.naur.utility.excel;


import org.naur.common.entities.Information;
import org.naur.common.entities.InformationLevel;
import org.naur.common.entities.OffsetInfo;
import org.naur.common.patterns.Delegator;
import org.naur.common.patterns.Handler;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
public abstract class ExcelComponent<T> implements Delegator.Callback {

    /**
     * ExcelComponent
     */
    public ExcelComponent() {
        this(null, null);
    }

    /**
     * ExcelComponent
     * @param document
     */
    public ExcelComponent(ExcelDocument document) {
        this(document, null);
    }

    /**
     * ExcelComponent
     * @param validateHandler
     */
    public ExcelComponent(Handler<ExcelTranslate<T>> validateHandler) {
        this(null, validateHandler);
    }

    /**
     * ExcelComponent
     * @param document
     * @param validateHandler
     */
    public ExcelComponent(ExcelDocument document, Handler<ExcelTranslate<T>> validateHandler) {
        this(document, validateHandler, "sheet1");
    }

    /**
     * ExcelComponent
     * @param document
     * @param validateHandler
     * @param sheetName
     */
    public ExcelComponent(ExcelDocument document, Handler<ExcelTranslate<T>> validateHandler, String sheetName) {
        this.delegator = new Delegator(this);
        this.document = document;
        this.validateHandler = validateHandler;
        this.sheetName = sheetName;
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

        for (int i = 0; i < row.getCells().length; i++) {
            this.heads.put(String.valueOf(i), new OffsetInfo(i, row.cells(i).value()));
        }
    }

    //解析 Excel  行
    public abstract void parseRow(ExcelRow row, ExcelTranslate<T> translate);

    //解析 Excel  行 成功！
    public void parseRowSuccess(ExcelComponent<T> current, ExcelTranslate<T> translate) {
        current.addNotification(translate.getNotifications());
        current.addEntity(translate.getEntities());
    }

    public ExcelSheet currentSheet(boolean... isCreate) {
        if (null == currentSheet) {
            currentSheet = document.sheets(sheetName);
            if (null == currentSheet && isCreate.length > 0 && isCreate[0]) {
                currentSheet = document.createSheet(sheetName);
            }
        }
        //return document.sheets(0);
        return currentSheet;
    }

    @Override
    public void begin() {
        if (!isInit) {
            entities = new ArrayList<T>();
        }
        notifications = new ArrayList<Information<TranslateInfo>>();
        if (null == heads) {
        	heads = new LinkedHashMap<String, OffsetInfo>();
        }
        setSheetName();
        setStartIndex();
        setTitle();
        setHeads();
        //setValidateHandler();
        //setDocument();
        setStrategy();
    }

    @Override
    public void end() {
    }

    public void addEntity(List<T> tList) {
        entities.addAll(tList);
    }

    public void addEntity(T t) {
        entities.add(t);
    }

    public void addNotification(Information<TranslateInfo> notification) {
        this.notifications.add(notification);
    }

    public void addNotification(List<Information<TranslateInfo>> notifications) {
        this.notifications.addAll(notifications);
    }

    public void addHead(String key) {
        addHead(key, null);
    }

    public boolean isError() {
        for (Information item : this.notifications) {
            if (InformationLevel.ERROR.value() == item.getLevel()) {
                return true;
            }
        }
        return false;
    }

    public void addHead(String key, OffsetInfo value) {
        if (null == heads) {
        	heads = new LinkedHashMap<String, OffsetInfo>();
        }
        heads.put(key, value);
    }

    public void setTitle() {
    }

    public void setHeads() {
    }

    public void setSheetName() {
    }

    public void setStartIndex() {
    }

    public void setValidateHandler(Handler<ExcelTranslate<T>> validateHandler) {
        this.validateHandler = validateHandler;
    }

    public void setDocument(ExcelDocument document) {
        this.document = document;
    }

    public List<T> getEntities() {
        return entities;
    }

    public List<Information<TranslateInfo>> getNotifications() {
        return notifications;
    }

    public void setEntities(List<T> entities) {
        this.entities = entities;
        this.isInit = true;
    }

    public InputStream getInputStream() throws IOException {
        InputStream inputStream = null;
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        document.getWorkbook().write(os);
        inputStream = new ByteArrayInputStream(os.toByteArray());
        os.close();
        os = null;
        return inputStream;
    }

    public ExcelComposite getComposite() {
        return null;
    }

    public String getSheetName() {
        return sheetName;
    }

    private Delegator delegator;
    private boolean isInit = false;

    protected String title;
    protected Map<String, OffsetInfo> heads;
    protected ExcelDocument document;
    protected List<Information<TranslateInfo>> notifications;
    protected List<T> entities;
    protected Handler<ExcelTranslate<T>> validateHandler;
    protected int startIndex = 0;
    protected int columns;
    protected String sheetName;
    protected ExcelSheet currentSheet;
}
