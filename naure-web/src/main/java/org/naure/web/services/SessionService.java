package org.naure.web.services;

import org.naure.repositories.SessionRepository;
import org.naure.repositories.models.Session;
import org.naure.web.properties.SystemProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/4/12
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */
@Service
public class SessionService {

    public List<Session> get(Map params) throws Exception {
        params.put("application", systemProperties.applicationName);
        return sessionRepository.get(params, Session.class);
    }

    public void add(final Session session) {
        session.setApplication(systemProperties.applicationName);
        try {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        //如果没有 SessionID，就增加数据
                        if (null == session.getSessionId()) {
                            sessionRepository.add(session);
                            return;
                        }

                        if (sessionRepository.exists(session)) {
                            sessionRepository.update(session);
                        } else {
                            sessionRepository.add(session);
                        }
                        //sessionRepository.add(session);
                    } catch (Exception ex) {
                    }
                }
            }).start();
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SystemProperties systemProperties;
}
