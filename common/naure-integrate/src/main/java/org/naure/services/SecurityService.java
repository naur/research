package org.naure.services;

import org.naure.repositories.SecurityRepository;
import org.naure.repositories.models.finance.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public <T, U extends Security> List<U> get(Map params, Class<U> resultClass) throws Exception {
        return securityRepository.get(params, resultClass);
    }

    public boolean add(final Security security) throws Exception {
        boolean result = false;
        if (securityRepository.exists(security)) {
            result = securityRepository.update(security);
        } else {
            result = securityRepository.add(security);
        }
        return result;
    }

    @Autowired
    private SecurityRepository securityRepository;
}
