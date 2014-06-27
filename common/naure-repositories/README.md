
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/

________________________________________________________
MongoDB 安装：
    /usr/bin/mongod -f /etc/mongod.conf
    yum install mongo-10gen mongo-10gen-server
    //连接
    mongo
    //权限
    http://www.cnblogs.com/zengen/archive/2011/04/23/2025722.html
________________________________________________________
MongoDB 升级：
    // 备份
    mongodump -u user -p passwd -d naure -o /data/backup/mongodbbak
    //升级
    yum update mongo-10gen mongo-10gen-server
    service mongod start
    service mongod stop
    service mongod restart
    //还原数据库
    mongorestore  -u user -p passwd /data/backup/mongodbbak

    // 卸载
    mongod --remove
    // 将旧的mongodb目录移到其它目录
    // 解压新版mongodb
    // 创建data目录
    // 安装
    mongod --dbpath E:\mongodb\data --logpath E:\log\mongodb\mongodb.log --reinstall
    // 启动
    net start "MongoDB"
    // 还原
    mongorestore E:\mongo_bak\a
________________________________________________________
MongoDB naure 数据库
    Regex: db.collection.find( { field: /acme.*corp/i } );
               db.collection.find( { field: { $regex: 'acme.*corp', $options: 'i' } } );

    index: { key: { _id: 1 }, ns: "naure.system.users", name: "_id_" }
    index: { key: { _id: 1 }, ns: "naure.sessionLog", name: "_id_" }
    index: { key: { _id: 1 }, ns: "naure.eng", name: "_id_" }
    index: { key: { _id: 1 }, ns: "naure.session", name: "_id_" }
    index: { key: { _id: 1 }, ns: "naure.geoTrace", name: "_id_" }
    index: { key: { _id: 1 }, ns: "naure.data", name: "_id_" }
    index: { key: { application: 1.0, updated: -1.0 }, ns: "naure.data", name: "application_1_updated_-1" }
    index: { key: { application: 1.0, updated: -1.0 }, ns: "naure.session", name: "application_1_updated_-1" }
    index: { key: { _id: 1 }, ns: "naure.learn.schedule", name: "_id_" }
    index: { key: { path: 1.0 }, ns: "naure.learn.schedule", name: "path_1" }
    index: { key: { _id: 1 }, ns: "naure.learn.eng", name: "_id_" }
