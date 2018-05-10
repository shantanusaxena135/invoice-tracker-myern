// This file will contain script to initialize the backend API and start the server
const winston = require('winston');
const DB = require('./db/dbsetup');
const config = require('./config/config');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            'timestamp': true
        }),
        new (winston.transports.File)({
            'timestamp': true,
            filename: './server/server.log'
        })
    ]
});

// Setup the database
var db = new DB(logger);

settings = {
    db: db,
    logger: logger,
    config: config
}

// Any intialization scripts before this line ------
// ======================== This starts the server==============================
require('./server/server')(settings);
