"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const refreshTokenSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
refreshTokenSchema.post('save', function (error, doc, next) {
    if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        next('Duplicated');
    }
    else {
        next(error);
    }
});
refreshTokenSchema.virtual('timsestamp_ms').get(function () {
    let createdYear = this.updatedAt;
    createdYear = Date.parse(createdYear);
    return createdYear;
});
const RefreshToken = mongoose_1.default.model('RefreshToken', refreshTokenSchema);
exports.default = RefreshToken;
