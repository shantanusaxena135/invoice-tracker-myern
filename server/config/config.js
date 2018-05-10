var credentials = require('./credentials');
var mysql	= require('mysql');

module.exports = {
	'version': '1.0.0',
	'server_port': '5000',
	'mysql': mysql,
  'mysql_host': 'localhost'
};
