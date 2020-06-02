"use strict";
require('dotenv').config();
const express = require('express');
const route = require('./src/routes/Record');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
app.use(express.json());
app.use(route);
route.get('/', (req, res) => {
    res.redirect('/api-docs')
});

let options = {
    swaggerDefinition: {
        info: {
            description: 'Code assessment rest API document for Getir Backend software engineer',
            title: 'Akin Gundogdu',
            version: '1.0.0',
        },
        host: process.env.APP_URL,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname,
    files: ['./src/routes/*.js']
};
expressSwagger(options)

module.exports = app;