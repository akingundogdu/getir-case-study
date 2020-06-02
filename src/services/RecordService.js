const {ErrorHandler} = require('../infrastructure/ErrorHandler')
const RecordRepository = require('../repositories/RecordRepository');

/**
 * @function Records
 * @description Retrieve record models from repository layer
 *
 * @param  {array} [query] Query parameters
 * @param  {Int} [page] Page
 * @param  {Int} [limit] Limit
 * @param  {Int} [maxCount] Maximum Count
 *
 * @return Record[]
 */
exports.records = async function (query, page, limit) {
    try {
        return await RecordRepository.all(query, page, limit);
    }catch (e) {
        throw new ErrorHandler(500, e)
    }
}