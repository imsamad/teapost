"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkTemp = (msg = 'I Run') => (_req, _res, next) => {
    console.log('body', _req.body);
    next();
};
exports.default = checkTemp;
