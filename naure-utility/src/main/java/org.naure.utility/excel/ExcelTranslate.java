package org.naure.utility.excel;

import org.naure.common.entities.Notification;

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
        this.notifications = new ArrayList<Notification<TranslateInfo>>();
    }

    public boolean isError() {
        for (Notification item : this.notifications) {
            if ("error".equals(item.getLevel())) {
                return true;
            }
        }
        return false;
        //return this.notification.size() > 0;
    }

    public void addNotification(Notification<TranslateInfo> notification) {
        this.notifications.add(notification);
    }

    public void addEntity(T t) {
        this.entities.add(t);
    }

    public void addEntity(List<T> tList) {
        this.entities.addAll(tList);
    }

    public List<T> getEntities() {
        return entities;
    }

    public List<Notification<TranslateInfo>> getNotifications() {
        return notifications;
    }

    private List<Notification<TranslateInfo>> notifications;
    private List<T> entities;

    public int RowIndex;
}
