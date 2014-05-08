package org.naure.utility.excel;


import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 11-6-15
 * Time: 下午4:24
 * To change this template use File | Settings | File Templates.
 */
public class ExcelTranslate<T> {

    public ExcelTranslate() {
        this.entities = new ArrayList<T>();
        this.notifications = new ArrayList<Information<TranslateInfo>>();
    }

    public boolean isError() {
        for (Information item : this.notifications) {
            if (InformationLevel.ERROR.value() == item.getLevel()) {
                return true;
            }
        }
        return false;
        //return this.notification.size() > 0;
    }

    public void addNotification(Information<TranslateInfo> notification) {
        this.notifications.add(notification);
    }

    public void addEntity(T t) {
        if (null != t) {
            this.entities.add(t);
        }
    }

    public void addEntity(List<T> tList) {
        this.entities.addAll(tList);
    }

    public List<T> getEntities() {
        return entities;
    }

    //默认返回第一个
    public T getEntitie() {
        return entities.isEmpty() ? null : entities.get(0);
    }

    public List<Information<TranslateInfo>> getNotifications() {
        return notifications;
    }

    public int getRowIndex() {
        return rowIndex;
    }

    public void setRowIndex(int rowIndex) {
        this.rowIndex = rowIndex;
    }

    private List<Information<TranslateInfo>> notifications;
    private List<T> entities;
    private int rowIndex;
}
