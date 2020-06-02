exports.ok = async function (response, data) {
    return responseModel(response, 200, "Success", data, true)
}

/**
 * @function notOk
 * @description It returns http response to the client with status code (given) and error message
 * @code given
 *
 * @param  {HttpResponse} [response] Http Response
 * @param  {Int} [statusCode] Http Status Code
 * @param  {String} [message] Error Message
 *
 * @return HttpResponse
 */
exports.notOk = async function (response, statusCode, message) {
    return responseModel(response, statusCode, message, [], false)
}

/**
 * @function created
 * @description It returns http response to the client with status code (201) and data
 * @code 201
 * @param  {HttpResponse} [response] Http Response
 * @param  {Array} [data] Data
 *
 * @return HttpResponse
 */
exports.created = async function (response, data) {
    return responseModel(response, 201, "Created successfully", data, true)
}

/**
 * @function notValidated
 * @description It returns http response to the client with status code (412) and validation message
 * @code 412
 * @param  {HttpResponse} [response] Http Response
 * @param  {Array} [validate] Validation Error List
 *
 * @return HttpResponse
 */
exports.notValidated = async function (response, validate) {
    const message = 'Validation Error : ' + validate[0].msg + ' for ' + validate[0].param
    return responseModel(response, 412, message, [], false)
}

/**
 * @function notFound
 * @description It returns http response to the client with status code (404) and not found message
 * @code 404
 * @param  {HttpResponse} [response] Http Response
 *
 * @return HttpResponse
 */
exports.notFound = async function (response) {
    return responseModel(response, 404, "Not found", [], false)
}
