"use strict"

const express = require('express');
const router = express.Router();

const RecordController = require('../controllers/RecordController')

/**
 * This function comment is parsed by doctrine
 * @route POST /api/records
 * @group records - Operations about records model
 * @param  {Date} [startDate] Start Date
 * @param  {Date} [endDate] End Date
 * @param  {Int} [minCount] Minimum Count
 * @param  {Int} [maxCount] Maximum Count
 * @returns {object} 200 - An array of record info
 * @returns {Error}  default - Unexpected error
 */
router.post('/api/records',
    RecordController.validate('records'),
    RecordController.records);

module.exports = router;