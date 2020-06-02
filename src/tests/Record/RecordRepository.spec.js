"use strict";

const DB = require('../util/MongoDbFaker');
const recordRepository = require('../../repositories/RecordRepository');
const Record = require('../../models/Record');

beforeEach(async () => DB.connect())
afterEach(async () => DB.disconnect())

describe('Record Repository', () => {
    it('should return record list', async () =>{
        await Record.insertMany([
            {
                "key": "TAKwGc6Jr4i8Z487",
                "createdAt": "2017-01-28T01:22:14.398Z",
                "counts": [2800]
            },
            {
                "key": "NAeQ8eX7e5TEg7oH",
                "createdAt": "2017-01-27T08:19:14.135Z",
                "counts": [2900]
            }
        ])
        const records = await recordRepository.all({
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        })

        expect(await Record.countDocuments()).toBe(2)
        expect(records).toStrictEqual([
            {
                key: 'NAeQ8eX7e5TEg7oH',
                createdAt: new Date('2017-01-27T08:19:14.135Z'),
                totalCount: 2900
            },
            {
                key: 'TAKwGc6Jr4i8Z487',
                createdAt: new Date('2017-01-28T01:22:14.398Z'),
                totalCount: 2800
            }
        ])
    });
})