package org.naur.repositories;

import org.naur.repositories.construction.Repository;
import org.naur.repositories.models.finance.Security;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 4/26/12
 * Time: 2:08 PM
 * To change this template use File | Settings | File Templates.
 */
@Component
public class SecurityRepository extends Repository {

    public boolean exists(final Security security) throws Exception {
        return this.exists(identifier(security));
    }

    public boolean update(final Security security) throws Exception {
        Map<String, Object> query = identifier(security);

        Map<String, Object> update = new HashMap<String, Object>();
        update.put("query", query);
        update.put("update", new HashMap<String, Object>() {{
            put("updated", Calendar.getInstance().getTime());
            put("quotes", security.getQuotes());
        }});
        update.put("class", security.getClass());

        return update(update);

    }

    public boolean add(final Security security) throws Exception {
        security.setCreated(Calendar.getInstance().getTime());
        security.setUpdated(security.getCreated());
        return workspace.add(security);
    }

    private Map identifier(final Security security) {
        return new HashMap<String, Object>() {{
            put("class", security.getClass());
        }};
    }
}
