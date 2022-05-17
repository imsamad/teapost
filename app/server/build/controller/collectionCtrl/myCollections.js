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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = __importDefault(require("../../lib/pagination"));
const utils_1 = require("../../lib/utils");
const StoryCollection_1 = __importDefault(require("../../models/StoryCollection"));
const myCollections = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const query = StoryCollection_1.default.find({
        user,
    });
    (0, pagination_1.default)(req, res, { query, label: 'mycollections' });
}));
exports.default = myCollections;
