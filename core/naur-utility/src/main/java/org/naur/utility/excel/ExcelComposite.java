package org.naur.utility.excel;

import org.naur.common.entities.Information;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 12/10/12
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */
public class ExcelComposite extends ExcelComponent {

    public ExcelComposite(ExcelComponent... components) {
        this(new ExcelDocument(ExcelType.Excel2007), components);
    }

    public ExcelComposite(ExcelDocument document, ExcelComponent... components) {
        this.components = components;
        this.document = document;
        for (ExcelComponent component : this.components) {
            component.setDocument(document);
        }
    }

    @Override
    public void setDocument(ExcelDocument document) {
        for (ExcelComponent component : components) {
            component.setDocument(document);
        }
    }

    @Override
    public List<List> getEntities() {
        List<List> list = new ArrayList<List>();
        for (ExcelComponent component : components) {
            list.add(component.getEntities());
        }
        return list;
    }

    @Override
    public List<Information> getNotifications() {
        List<Information> list = new ArrayList<Information>();
        for (ExcelComponent component : components) {
            list.addAll(component.getNotifications());
        }
        return list;
    }

    @Override
    public void parseRow(ExcelRow row, ExcelTranslate translate) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public ExcelComposite getComposite() {
        return this;
    }

    @Override
    public void execute() throws Exception {
        for (ExcelComponent component : components) {
            component.handle();
        }
    }

    private ExcelComponent[] components;
}
