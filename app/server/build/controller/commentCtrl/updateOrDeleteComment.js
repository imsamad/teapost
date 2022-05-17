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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const utils_1 = require("../../lib/utils");
const Primary_1 = __importDefault(require("../../models/Comment/Primary"));
const Secondary_1 = __importDefault(require("../../models/Comment/Secondary"));
const yup = __importStar(require("yup"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const updateOrDeleteComment = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isDelete = req.method.toLowerCase() == 'delete';
    const isPrimary = req.path.startsWith('/primaries');
    const user = req.user._id;
    let comment = isPrimary ? Primary_1.default : Secondary_1.default;
    comment = yield comment.findById(req.params.commentId);
    if (!comment || comment.user.toString() != user)
        return next((0, utils_1.ErrorResponse)(400, 'No resource found'));
    if (isDelete) {
        yield comment.remove();
        return res.json({
            status: 'ok',
        });
    }
    comment.text = req.body.text;
    comment = yield comment.save();
    return res.json({
        status: 'ok',
        comment,
    });
}));
exports.schema = yup.object({
    params: yup.object({
        commentId: yup
            .string()
            .label('commentId')
            .typeError('commentId must be valid.')
            .required()
            .test('commentId', 'commentId must be valid.', (val) => (0, utils_1.typeOf)(val, 'mongoId')),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), updateOrDeleteComment];
