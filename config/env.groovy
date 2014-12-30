naur {
    log.file.path = '/var/web/logs'
}

mongodb {
    host = '127.0.0.1'
    port = '27017'
    dbname = 'naur'
}

berkeley {
    file = '/var/db/naur'
}

environments {
    dev {
        mongodb {
            username = 'admin'
            password = 'admin'
        }
    }
    production {
        mongodb {
            username = 'dbuser'
            password = '19830618'
        }
    }
    home {
        application.name = 'home'
        log.file.name = 'naur-home-web.log'
    }
    research {
        application.name = 'research'
        log.file.name = 'naur-research-web.log'
    }
    shoping {
        application.name = 'shoping'
        log.file.name = 'naur-shoping-web.log'
    }
}
