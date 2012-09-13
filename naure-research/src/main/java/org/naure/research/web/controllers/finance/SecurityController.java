package org.naure.research.web.controllers.finance;

import org.codehaus.jackson.map.ObjectMapper;
import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.common.pattern.exception.*;
import org.naure.common.pattern.Tree;
import org.naure.common.pattern.TreeType;
import org.naure.repositories.models.finance.Future;
import org.naure.repositories.models.finance.Quote;
import org.naure.repositories.models.finance.Security;
import org.naure.services.SecurityService;
import org.naure.web.ControllerBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/2/12
 * Time: 1:53 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "finance/security")
public class SecurityController extends ControllerBase {

    @RequestMapping("{classes}/{identifier}/date/{start}-{end}")
    public Information get(@PathVariable final String classes, @PathVariable final String identifier, @PathVariable final String start, @PathVariable final String end) {
        return handler(new Information<List<Security>>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                Information<List<Security>> info = (Information<List<Security>>) information;

                String[] ids = identifier.split(",");
                Map<String, Object> params = new HashMap<String, Object>();
                Class clazz = null;
                SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
                switch (classes) {
                    case "future":
                        params.put("species", ids[0]);
                        params.put("contract", ids[1]);
                        params.put("quotes.date", new Tree(TreeType.Between,
                                new Tree<Date>(formatter.parse(start)),
                                new Tree<Date>(formatter.parse(end))));
                        clazz = Future.class;
                        break;
                }

                info.setData((List<Security>) securityService.get(params, clazz));
                info.setLevel(InformationLevel.SUCCESS.value());
                return info;
            }
        });
    }

    @RequestMapping("{classes}/{identifier}/{params}")
    public Information add(@PathVariable final String classes, @PathVariable final String identifier, @PathVariable final String params) {
        return handler(new Information<String>(), new Func<Information, Information>() {
            @Override
            public Information execute(Information information) throws Exception {
                Information<String> info = (Information<String>) information;
                String[] ids = identifier.split(",");
                Security security = null;
                switch (classes) {
                    case "future":
                        security = new Future(ids[0], ids[1]);
                        break;
                }
                String securityParams = String.format(
                        "{%0$s}",
                        params.replaceAll("([\\w]+)=([\\w-]+)", "\"$1\":\"$2\"")
                );
                //Quote[].class
                security.getQuotes().add(new ObjectMapper().readValue(securityParams, Quote.class));

                info.setData(securityService.add(security) ? "Success" : "Error");
                info.setLevel(InformationLevel.SUCCESS.value());
                return info;
            }
        });
    }

    @Autowired
    private SecurityService securityService;
}
