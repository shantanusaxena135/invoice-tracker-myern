var responseHelper = require('../helpers/responseHelper');

module.exports = function(app, settings){

	app.get('/api/hello', (req, res) => {
		responseHelper.okResponse(res, 'WAVE-Backend-REST-API Server', {express: 'Hello From Express'})
	});

	// version route
	app.get('/version', function(req, res){
			responseHelper.okResponse(res, 'WAVE-Backend-REST-API Server', {version: settings.config.version})
	});

	// All other routes are 404
	app.use('*', function(req, res){
		responseHelper.resourceNotFoundResponse(res, 'Page or resource not found');
  });
}
