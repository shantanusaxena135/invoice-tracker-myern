/*
 * Prepares a 200 OK response
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function okResponse(res, message, data) {
  prepareAndSendResponse(res, message, data, 200);
}

/*
 * Prepares a 500 Internal Server Error response
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function internalServerErrorResponse(res, message, data) {
    prepareAndSendResponse(res, message, data, 500);
}

/*
 * Prepares a 400 Bad Request response
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function badRequestResponse(res, message, data) {
    prepareAndSendResponse(res, message, data, 400);
}

/*
 * Prepares a 401 Unauthorized Access response
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function unauthorizedResponse(res, message, data) {
    prepareAndSendResponse(res, message, data, 401);
}

/*
 * Prepares a 401 Resource Not Found response
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function resourceNotFoundResponse(res, message, data) {
    prepareAndSendResponse(res, message, data, 404);
}

/*
 * Prepares a 409 Conflict response
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function conflictResponse(res, message, data){
    prepareAndSendResponse(res, message, data, 409);
}

/*
 * Prepares and send the response with using the information in the arguments.
 * @param {object} res express JS HTTP response object
 * @param {string} message string message for explaination
 * @param {object} data extra data values t be supplied in response
 */
function prepareAndSendResponse(res, message, data, statusCode){
    res.setHeader('Content-Type', 'application/json');
    response = {};
    if(data) {response['data'] = data; }
    if(message) { response['message'] = message; }
    res.status(statusCode).send(response);
}


module.exports = {
    okResponse : okResponse,
    internalServerErrorResponse: internalServerErrorResponse,
    badRequestResponse: badRequestResponse,
    unauthorizedResponse: unauthorizedResponse,
    resourceNotFoundResponse: resourceNotFoundResponse,
    conflictResponse: conflictResponse
}
