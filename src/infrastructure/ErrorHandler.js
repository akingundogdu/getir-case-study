"use strict";

const {notOk} = require('./ResponseHelper');

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const {statusCode, message} = err;
    return notOk(res, statusCode, message);
};

module.exports = {
    ErrorHandler,
    handleError
};