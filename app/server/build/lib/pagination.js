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
const pagination = (req, res, { query, label }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryClone = query.clone();
    const totalRecords = yield queryClone.countDocuments();
    let pageNo = parseInt(req.query.page || 1, 10) || 1, limit = parseInt(req.query.limit || 10, 10) || 10;
    pageNo <= 0 && (pageNo = 1);
    limit <= 0 && (limit = 10);
    const totalPages = Math.ceil(totalRecords / limit);
    const endIndex = limit * pageNo;
    if (pageNo > totalPages) {
        return res.json({
            pagination: {
                overflow: true,
                totalPages,
                totalRecords,
                limit,
            },
            [label]: [],
        });
    }
    const skip = (pageNo - 1) * limit;
    const data = yield query.skip(skip).limit(limit);
    const pagination = {
        totalRecords,
        totalPages,
        limit: limit,
    };
    endIndex < totalRecords && (pagination.next = pageNo + 1);
    pageNo > 1 && (pagination.prev = pageNo - 1);
    res.json({
        pagination,
        [label]: data,
    });
});
exports.default = pagination;
