var config 	= require('../config/config');
var credentials 	= require('../config/credentials');
var mysql = config.mysql;

var db_config = {
	host: config.mysql_host,
	user: credentials.db_username,
	password: credentials.db_password,
	database: credentials.db_name
}

var connection;
var connected = false;
var _logger;

module.exports = DB;

function DB(logger){
	_logger = logger;
	// Attempt to connect to the database
	handleConnection();
}

/**
 * Return if we are connected or not - used so we can return a 503 if there is an issue
 */
DB.prototype.isConnected = function(){
	return connected;
};


DB.prototype.query = function(query, callback){
	if(!connected){
		return null;
	}
	else{
		return connection.query(query, callback);
	}
};


/**
 *  Handle connecting to the database.  This will attempt to re-connect every 10 seconds
 *  if the server cannot be reached or the connection times out
 */
function handleConnection(){
	connection = mysql.createConnection(db_config);
	connected = false;
	_logger.info('Attempting to connect to database ' + config.mysql_host + '...');

	connection.connect(function(err){

		if(err){
			// Couldn't connect - log the error and try again in 2 seconds
			_logger.error('Error connecting to database: ', err);
			setTimeout(handleConnection, 10000);
		}
		else{
			_logger.info('Connected to database ' + config.mysql_host);
			connected = true;
		}

	});

	connection.on('error', function(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			// Try to reconnect
			_logger.info('Database dropped connection');
			handleConnection();
		}
		else{
			_logger.error('Database error: ', err);
			throw err;
		}
	});
}
