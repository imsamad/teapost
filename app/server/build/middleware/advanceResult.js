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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advancedResults = void 0;
const advancedResults = (populate, stringPatterns, outerFields) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let reqQuery = Object.assign({}, req.query);
    const removeFields = ["select", "sort", "populate"];
    removeFields.forEach((param) => delete reqQuery[param]);
    stringPatterns === null || stringPatterns === void 0 ? void 0 : stringPatterns.forEach((pattern) => {
        if (reqQuery[pattern]) {
            if (!(reqQuery === null || reqQuery === void 0 ? void 0 : reqQuery.$or))
                reqQuery.$or = [];
            reqQuery.$or = [
                ...reqQuery === null || reqQuery === void 0 ? void 0 : reqQuery.$or,
                {
                    [pattern]: new RegExp(reqQuery[pattern], "gi"),
                },
            ];
            delete reqQuery[pattern];
        }
    });
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    reqQuery = JSON.parse(queryStr);
    if (req.query.select) {
        reqQuery.select = (_a = req.query.select) === null || _a === void 0 ? void 0 : _a.split(",").join(" ");
    }
    if (req.query.sort) {
        reqQuery.sort = (_b = req.query.sort) === null || _b === void 0 ? void 0 : _b.split(",").join(" ");
    }
    else {
    }
    if (req.query.populate) {
        reqQuery.populate = (_c = req.query.populate) === null || _c === void 0 ? void 0 : _c.split(",").join(" ");
    }
    if (populate) {
        if (!reqQuery.populate)
            reqQuery.populate = [];
        reqQuery.populate.push(populate);
    }
    let { select, sort, populate: populateClone } = reqQuery, rest = __rest(reqQuery, ["select", "sort", "populate"]);
    req.query = { query: rest, select, sort, populate: populateClone };
    next();
});
exports.advancedResults = advancedResults;
