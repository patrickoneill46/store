'use strict';

var current;

/**
 * forces a hard reload of nconf, useful for testing
 */
function reload() {
    // HACK this seems to be the only way to force nconf to reload/reset everything
    delete require.cache[require.resolve('nconf')];
    var nconf = require('nconf');

    current = read();

    return current;
}

/**
 * Hierarchical configuration of the app using the flatiron/nconf module that
 * cascades from command line arguments, environmental variables, config file settings,
 * to default values.
 */
function read() {
    var nconf = require('nconf'),
        environment = process.env.NODE_ENV;

    // verify that $NODE_ENV is set, if not, fall back to development
    if (environment && typeof(environment) === 'string') {
        environment = environment.trim().toLowerCase();
    }

    switch(environment) {
        case 'production':
        case 'staging':
        case 'qa':
        case 'integration':
        case 'development':
        case 'localhost':
        case 'test':
            break;
        default:
            environment = 'development';
    }

    nconf.clear();
    nconf.reset();

    // priority #1 - overridden key/value pairs that will always be used
    nconf.overrides({
        environment: environment
    });

    // priority #2 - read from command line arguments using the optimist module
    nconf.argv();

    // priority #3 - read from environmental variables
    // sub keys like { database : { host: 'localhost'} } translate to database_host
    nconf.env({
        separator: '_'
        /* whitelist: [] */
    });

    // priority #4 - read from values in the environmental json file
    //nconf.add('optional', { type: 'file', file: 'app/config/config.json' });

    // priority #5 - hard-coded values loaded from $NODE_ENV.json
    nconf.add('environment', { type: 'file', file: 'server/config/' + environment + '.json' });
    // force the two files to apply in order; https://github.com/flatiron/nconf/issues/15
    nconf.load();

    // priority #6 - hard-coded default values loaded from defaults.json
    try {
        nconf.defaults(require('../config/defaults.json'));
    } catch (e) {
        throw('failed to read the "server/config/defaults.json" file');
    }

    nconf.reload = reload;

    return nconf;
}

// expose the module both as a working config with just `var config = require('./lib/config')`
// but also allow tests or other code to invoke a `config = config.reload()` method
// this is needed to be able to force a reload of the config for unit testing
// expose a `reload()` method to reinitialize the config
current = read();
module.exports = current;