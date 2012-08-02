package org.naure.services;

import org.naure.repositories.SecurityRepository;
import org.naure.repositories.models.Session;
import org.naure.repositories.models.finance.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 8/2/12
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class SecurityService {

    public List<Session> get(Map params) throws Exception {
        return securityRepository.get(params);
    }

    public boolean add(final Security security) throws Exception {
        securityRepository.add(security);
    }

    @Autowired
    private SecurityRepository securityRepository;
}
