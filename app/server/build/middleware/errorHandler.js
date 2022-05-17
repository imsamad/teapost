"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const errorHandler = (err, _req, res, _next) => {
    console.log(`*********************************** Error from error middleware *************************`
        .red);
    console.log(`${JSON.stringify(err, null, 4)}`.red);
    console.log('*****************************************************************************************'
        .red);
    let error = Object.assign({}, err);
    if (typeof err == 'string') {
        error = {};
        error.message = err;
    }
    else
        error.message = err.message;
    if (err.name === 'ValidationError') {
        const inValidFields = Object.keys(err.errors);
        error = {
            message: {
                reason: 'Data are not valid for these fields.',
                fields: inValidFields,
            },
            statusCode: 400,
        };
    }
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = { message, statusCode: 404 };
    }
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, statusCode: 404 };
    }
    return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message ||
            'Server is on maintenance right now, soory for delay in service, please try again',
    });
};
exports.default = errorHandler;
