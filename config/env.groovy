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
}
