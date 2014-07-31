var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs');

var dbURI = 'localhost', dbPort = 27017, dbName = 'test';
mongoose.connect('mongodb://' + dbURI + '/' + dbName);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('connected to database');
});

function pwd(sPath) {

    console.log('path: ', sPath);

    fs.readdir(sPath, function(err, files){
        console.log(files);
    });
}

var app = express();

app.use('/bower_components', express.static(__dirname + '/../bower_components/'));
app.use(express.static(__dirname + '/../app/'));

app.use(function(req,res, next) {

    next();

});

app.listen(9000);
