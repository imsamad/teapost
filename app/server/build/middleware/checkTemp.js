"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkTemp = (msg = "I Run") => (_req, _res, next) => {
    var _a;
    console.log("===========================");
    console.log("req from checkTemp ", (_a = _req === null || _req === void 0 ? void 0 : _req.headers) === null || _a === void 0 ? void 0 : _a.authorization);
    console.log("///////////////////////////");
    next();
};
exports.default = checkTemp;
