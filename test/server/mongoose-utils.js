var mongoose = require('mongoose'),
    async = require('async'),
    conn;


var beforeEach = function(done){

    if(!conn) {

//        conn = mongoose.connect('mongodb://' + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_NAME, done);
        conn = mongoose.connect('mongodb://localhost:27017/store_test', done);
    } else {
        done();
    }

};

var afterEach = function(done){

    var tasks = Object.keys(conn.connection.collections).map(function(collectionName){

        return function(cb){

            console.log('Dropping ' + collectionName + ' collection');
            conn.connection.collections[collectionName].drop(cb);
        }

    });

    async.parallel(tasks, function(){
        console.log('cleared the database');
//        conn.connection.close(function(){
//            conn = null;
//            done();
//        })
        done();
    });

};

var after = function(done){

}


module.exports = {
    beforeEach: beforeEach,
    afterEach: afterEach
};
