"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
const validateSchemaMdlwr = (schema, abortEarly = false) => (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        schema = schema ? schema : req.__YUP_SCHEMA__;
        req.body.__YUP_SCHEMA__ && delete req.body.__YUP_SCHEMA__;
        const res = yield (0, utils_1.validateYupSchema)(schema, {
            body: req.body,
            query: req.query,
            params: req.params,
            files: req.files,
        }, abortEarly);
        return next();
    }
    catch (yupError) {
        return next((0, utils_1.ErrorResponse)(422, yupError ? yupError : 'Provide Proper Data,for further processing.'));
    }
});
exports.default = validateSchemaMdlwr;
