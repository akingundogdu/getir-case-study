"use strict";


const {ErrorHandler} = require('../infrastructure/ErrorHandler')
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
exports.all = async function (query, page = 1, limit = 5) {
    const {startDate, endDate, minCount, maxCount} = query

    try {
        const record = await Record.aggregate([
            {
                $addFields: {
                    totalCount: {
                        $sum: '$counts'
                    }
                }
            },
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    },
                    totalCount: {
                        $gte: minCount,
                        $lte: maxCount
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    key: '$key',
                    createdAt: '$createdAt',
                    totalCount: '$totalCount'
                }
            },
            {$sort: {createdAt: 1}},
            {$limit: parseInt(limit)},
            {$skip: page - 1}
        ])
        return record;
    } catch (e) {
        throw new ErrorHandler(500, e.message)
    }
};