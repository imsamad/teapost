"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
const notFound = (req, res, next) => {
    next((0, utils_1.ErrorResponse)(404, `Not Found - ${req.protocol}://${req.get('host')}${req.originalUrl}`));
};
exports.default = notFound;
