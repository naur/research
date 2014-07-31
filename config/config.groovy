environments {
    development {
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
    }

    production {
        mongodb {
            host = '127.0.0.1'
            port = '27017'
            dbname = 'naure'
            username = 'dbuser'
            password = '19830618'
        }
    }
}