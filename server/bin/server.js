'use strict';

var argh   = require('argh');
var os     = require('os');
var routes = require('./../router');
var server = exports;

if (argh.argv.help || argh.argv.h) {
    console.log([
        'Usage: ./bin/server [--port] [--hostname] [--servername] [--database]',
        'Starts the server with the specified configuration',
        '',
        '--port       port to run on (default: 9000)',
        '--hostname   hostname to bind to (default: localhost)',
        '--database   where is couchdb (default: http://localhost:5984)',
        '--servername what to call our server, '
    ].join(os.EOL));
    process.exit();
}

var opts = {
    'port': +(argh.argv.port || process.env.TC_PORT || '9000'),
    'hostname': argh.argv.hostname || process.env.TC_HOSTNAME || 'localhost',
    "db":{
        "mongo":{
            "dbURI": process.env.MONGO_HOST || "localhost",
            "dbPort": process.env.MONGO_PORT || "27017",
            "dbName": process.env.MONGO_NAME || "store"
        }
    }

};

console.log(Object.keys(opts).map(function (prop) {
    return prop + ': ' + opts[prop];
}).join(os.EOL));

var environment = require("../config/environment")(opts)

server.run = function serveRun(cb) {
    environment.once("ready", function() {

        server.app = routes(environment);

        server.app.listen(opts.port)
            .on("listening", function () {
                console.log("Listening on %d", opts.port);
                cb();
            });
    });
    environment.once("error", cb);
};


if (require.main === module) {
    server.run(function(err) {
        if(err) {
            console.error("Fail!");
            process.exit(1);
        }
    });
}