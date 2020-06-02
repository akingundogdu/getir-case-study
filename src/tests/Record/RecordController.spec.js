const app = require('../../../server')
const supertest = require('supertest')
const request = supertest(app)
const DB = require('../util/MongoDbFaker')
const Record = require('../../models/Record')

beforeEach(async () => DB.connect())
afterEach(async () => DB.disconnect())


const responseBodyFaker = [
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
]


describe('POST /api/records', () => {
    it('should return correct response structure', async done => {
        await Record.insertMany(responseBodyFaker)
        const response = await request
            .post('/api/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(200)
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe("Success")
        expect(response.body.records).toStrictEqual([
            {
                key: 'NAeQ8eX7e5TEg7oH',
                createdAt: '2017-01-27T08:19:14.135Z',
                totalCount: 2900
            },
            {
                key: 'TAKwGc6Jr4i8Z487',
                createdAt: '2017-01-28T01:22:14.398Z',
                totalCount: 2800
            }
        ])
        done()
    })

    it('should give not found error when make post /api/recordss', async done => {
        const response = await request
            .post('/api/recordss')
        done()
        expect(response.status).toBe(404)
    })

    it('should give validation error with 412 when not pass any parameter', async done => {
        const response = await request
            .post('/api/records')
            .send({})

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for startDate")

        done()
    })

    it('should give validation error with 412 when not pass startDate parameter', async done => {
        const response = await request
            .post('/api/records')
            .send({
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for startDate")

        done()
    })

    it('should give validation error with 412 when not pass endDate parameter', async done => {
        const response = await request
            .post('/api/records')
            .send({
                "startDate": "2016-01-26",
                "minCount": 2700,
                "maxCount": 3000
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for endDate")

        done()
    })

    it('should give validation error with 412 when not pass minCount parameter', async done => {
        const response = await request
            .post('/api/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "maxCount": 3000
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for minCount")

        done()
    })

    it('should give validation error with 412 when not pass maxCount parameter', async done => {
        const response = await request
            .post('/api/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for maxCount")

        done()
    })

    it('should give validation error with 412 when pass wrong date format', async done => {
        const response = await request
            .post('/api/records')
            .send({
                "startDate": "invalid-datetime",
                "endDate": "2018-02-02",
                "minCount": 2700,
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for startDate")

        done()
    })

    it('should give validation error with 412 when pass dd-mm-yyyy date format', async done => {
        const response = await request
            .post('/api/records')
            .send({
                "startDate": "02-02-2018",
                "endDate": "2018-02-02",
                "minCount": 2700,
            })

        expect(response.body).not.toBeNull()
        expect(response.status).toBe(412)
        expect(response.body.code).toBe(1)
        expect(response.body.msg).toBe("Validation Error : Invalid value for startDate")

        done()
    })
})
