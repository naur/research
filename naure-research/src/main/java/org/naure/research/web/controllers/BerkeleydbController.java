package org.naure.research.web.controllers;

import com.sleepycat.je.*;
import org.naure.common.Information;
import org.naure.common.InformationLevel;
import org.naure.common.web.ControllerBase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 3/22/12
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping(value = "/berkeleydb/*")
public class BerkeleydbController extends ControllerBase {

    @RequestMapping(value = "view")
    public String view() {
        return view("berkeleydb-demo");
    }

    @RequestMapping(value = "open")
    public @ResponseBody Information open() {
        Information information = new Information();

        Environment myDbEnvironment = null;
        Database myDatabase = null;

        try {
            EnvironmentConfig envConfig = new EnvironmentConfig();
            envConfig.setAllowCreate(true);
            myDbEnvironment = new Environment(new File("E:\\Database\\Naure\\BerkeleyDB"), envConfig);

            DatabaseConfig dbConfig = new DatabaseConfig();
            dbConfig.setAllowCreate(true);
            myDatabase = myDbEnvironment.openDatabase(null, "sampleDatabase", dbConfig);

            information.setLevel(InformationLevel.SUCCESS.value());
        } catch (DatabaseException dbe) {
            information.setLevel(InformationLevel.ERROR.value());
        }

        return information;
    }

    @RequestMapping(value = "write")
    public @ResponseBody Information write() {
        Information information = new Information();
        return information;
    }

    public BerkeleydbController() {
        viewPath = "berkeleydb/";
    }
}
