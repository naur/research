package org.naure.research.web.controllers.learn;

import org.naure.common.entities.Information;
import org.naure.common.entities.InformationLevel;
import org.naure.repositories.models.Eng;
import org.naure.web.ControllerBase;
import org.naure.services.EngService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/18/12
 * Time: 5:58 PM
 * To change this template use File | Settings | File Templates.
 */

@Controller
@RequestMapping(value = "learn/eng", method = {RequestMethod.GET, RequestMethod.POST})
public class EngController extends ControllerBase {
    @RequestMapping()
    public String view() {
        return view("eng-view");
    }

    @RequestMapping(value = "get")
    public Information get() {
        Information<List<Eng>> information = new Information<List<Eng>>();
        try {
            Map<String, String> params = new HashMap<String, String>();
            information.setData(engService.get(params));
        } catch (Exception ex) {
            information.setKeywords(ex.getMessage());
        }
        return information;
    }

    @RequestMapping(value = "{word}")
//    @ResponseBody
    public Information query(@PathVariable String word) {
        Information<String> information = new Information<String>();
        try {
            Eng eng = new Eng();
            eng.setCreated(Calendar.getInstance(Locale.CHINA).getTime());
            eng.setUpdated(Calendar.getInstance(Locale.CHINA).getTime());
            eng.setWord(word);

            information.setData(engService.add(eng) ? "Success" : "Error");
            information.setLevel(InformationLevel.SUCCESS.value());
        } catch (Exception ex) {
            information.setKeywords(ex.getMessage());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return information;
    }

    @RequestMapping(value = "{word}/add")
//    @ResponseBody
    public Information add(@PathVariable String word) {
        Information<String> information = new Information<String>();
        try {
            Eng eng = new Eng();
            eng.setCreated(Calendar.getInstance(Locale.CHINA).getTime());
            eng.setUpdated(Calendar.getInstance(Locale.CHINA).getTime());
            eng.setWord(word);

            information.setData(engService.add(eng) ? "Success" : "Error");
            information.setLevel(InformationLevel.SUCCESS.value());
        } catch (Exception ex) {
            information.setKeywords(ex.getMessage());
            information.setLevel(InformationLevel.ERROR.value());
        }
        return information;
    }

    public EngController() {
        viewPath = "learn";
    }


    @Autowired
    private EngService engService;
}
