"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    if (process.env.NODE_ENV !== 'production')
        console.log('Error from error middleware ', JSON.stringify(err, null, 4));
    let error = Object.assign({}, err);
    error.message = err.message;
    if (err.name === 'ValidationError') {
        console.log('ValidationError from errorHandler');
        error.message = {};
        Object.keys(err.errors).forEach((key) => {
            error.message[key] = err.errors[key].message;
        });
    }
    return res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message || 'Server Error',
    });
};
exports.default = errorHandler;
