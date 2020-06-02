"use strict"

const express = require('express');
const router = express.Router();

const RecordController = require('../controllers/RecordController')

/**
 * This function comment is parsed by doctrine
 * @route POST /api/records
 * @group records - Operations about records model
 * @param  {Date} [startDate]
 * @param  {Date} [endDate]
 * @param  {Int} [minCount]
 * @param  {Int} [maxCount]
 * @returns {object} 200 - An array of record info
 * @returns {Error}  default - Unexpected error
 */
router.post('/api/records',
    RecordController.validate('records'),
    RecordController.records);

module.exports = router;