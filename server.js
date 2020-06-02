"use strict";
require('dotenv').config();
const express = require('express');
const route = require('./src/routes/Record');

const app = express();
app.use(express.json());
app.use(route);

module.exports = app;