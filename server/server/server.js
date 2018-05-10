const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const DB = require('../db/dbsetup');
const config = require('../config/config');

const port = process.env.PORT || config.server_port;

module.exports = function(settings) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

// Setup and use morgan to log requests
    app.use(morgan(':req[X-Forwarded-For] - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
// Apply the endpoints to the /api router
    var apiRoutes = express.Router();
    require('../routes')(apiRoutes, settings);
    app.use('/', apiRoutes);

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
    app.listen(port, function () {
        settings.logger.info(`Backend server is running on port ${port}`);
    });

//To prevents error to propogate to client side
    app.use(function (err, req, res, next) {
        settings.logger.error(err);
        res.send({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        });
        next();
    });

// To log any uncaught exception from anything
    process.on('uncaughtException', function (err) {
        settings.logger.error("Uncaught exception: " + err.message);
        process.exit(1);
    });
}
