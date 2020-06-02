"use strict";
const Record = require('../models/Record');


/**
 * @function All
 * @description Retrieve record models from db
 *
 * @param  {array} [query] Query parameters
 * @param  {Int} [page] Page
 * @param  {Int} [limit] Limit
 * @param  {Int} [maxCount] Maximum Count
 *
 * @return Record[]
 */
exports.all = async function (query, page, limit) {
    const {startDate, endDate, minCount, maxCount} = query;
    const record = await Record.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                },
                counts: {
                    $gt: minCount,
                    $lt: maxCount
                }
            }
        },
        {
            $project: {
                _id: 0,
                key: "$key",
                createdAt: "$createdAt",
                totalCount: {$sum: "$counts"}
            }
        }
    ]);
    return record;
};