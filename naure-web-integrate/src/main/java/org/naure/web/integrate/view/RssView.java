package org.naure.web.integrate.view;

import com.sun.syndication.feed.rss.Item;
import org.naure.common.entities.Information;
import org.springframework.web.servlet.view.feed.AbstractRssFeedView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/9/12
 * Time: 8:34 PM
 * To change this template use File | Settings | File Templates.
 */
public class RssView extends AbstractRssFeedView {
    @Override
    protected List<Item> buildFeedItems(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Information rssItems = (Information) model.get("information");
        List<Item> feedItems = new ArrayList<Item>();
//        for (RssItem rssItem : rssItems) {
//            Item feedItem = new Item();
//            feedItem.setTitle(rssItem.getTitle());
//            feedItem.setAuthor(rssItem.getAuthor());
//            feedItem.setPubDate(rssItem.getDatePublished());
//            Description desc = new Description();
//            desc.setType("text/html");
//            desc.setValue(rssItem.getDescription());
//            feedItem.setDescription(desc);
//            feedItem.setLink(rssItem.getLink());
//            feedItems.add(feedItem);
//        }
        return feedItems;
    }
}
