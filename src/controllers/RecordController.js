const {body, validationResult} = require('express-validator')
const ResponseHelper = require('../infrastructure/ResponseHelper')
const RecordService = require('../services/RecordService')

/**
 * @function records
 * @description {post} /api/records action method of RecordController
 *
 * @param  {HttpRequest} [request] Http Request
 * @param  {HttpResponse} [response] Http Response
 *
 * @return HttpResponse
 */
exports.records = async function (request, response) {
    try {
        const validate = validationResult(request);
        if (!validate.isEmpty()) {
            return await ResponseHelper.notValidated(response, validate.array())
        }

        const parameters = {startDate, endDate, minCount, maxCount} = request.body
        const pagination = {page, limit} = request.query
        const records = await RecordService.records(parameters, pagination.page, pagination.limit)

        return ResponseHelper.ok(response, records)
    } catch (exception) {
        return ResponseHelper.notOk(response, exception.statusCode, exception.message);
    }
}


exports.validate = (method) => {
    return [
        body('startDate').exists().isISO8601().toDate(),
        body('endDate').exists().isISO8601().toDate(),
        body('minCount').exists().isInt(),
        body('maxCount').exists().isInt()
    ]
}