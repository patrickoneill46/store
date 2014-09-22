var mongoose = require('mongoose'),
    config;

module.exports = function (config, cb){

    //Mongo configuration
    var dbURI = config.db.mongo.dbURI, dbPort = config.db.mongo.dbPort, dbName = config.db.mongo.dbName;
    mongoose.connect('mongodb://' + dbURI + ':' + dbPort + '/' + dbName);

    var db = mongoose.connection;
    db.on('error', function(err) {
        cb(err || "Could not connect to mongoose")
    });
    db.once('open', function() {
        console.log('connected to database');
        cb(null, db);
    });

}

