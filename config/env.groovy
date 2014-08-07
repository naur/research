naure {
    log.file.path = '/var/web/logs'
}

mongodb {
    host = '127.0.0.1'
    port = '27017'
    dbname = 'naure'
    username = 'admin'
    password = 'admin'
}

berkeley {
    file = '/var/db/naure'
}

environments {
    production {
        mongodb {
            username = 'dbuser'
            password = '19830618'
        }
    }
    home {
        application.name = 'home'
        log.file.name = 'naure-home-web.log'
    }
    research {
        application.name = 'research'
        log.file.name = 'naure-research-web.log'
    }
    shoping {
        application.name = 'shoping'
        log.file.name = 'naure-shoping-web.log'
    }
}
