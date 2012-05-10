package org.naure.web.integrate.view;

import com.sun.syndication.feed.atom.Entry;
import org.naure.common.entities.Information;
import org.springframework.web.servlet.view.feed.AbstractAtomFeedView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/9/12
 * Time: 8:40 PM
 * To change this template use File | Settings | File Templates.
 */
public class AtomView extends AbstractAtomFeedView {
    @Override
    protected List<Entry> buildFeedEntries(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Information<List> information = (Information<List>) model.get("information");
        List<Entry> atomList = new ArrayList<Entry>();
        for (Object item : information.getData()) {
            Entry entry = new Entry();
            entry.setTitle(item.toString());
        }
        return atomList;
    }
}