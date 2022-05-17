"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionStories = exports.myCollections = exports.buildCollecion = exports.updateCollection = exports.removeCollection = exports.createCollection = void 0;
const createCollection_1 = __importDefault(require("./createCollection"));
exports.createCollection = createCollection_1.default;
const removeCollection_1 = __importDefault(require("./removeCollection"));
exports.removeCollection = removeCollection_1.default;
const updateCollection_1 = __importDefault(require("./updateCollection"));
exports.updateCollection = updateCollection_1.default;
const buildCollecion_1 = __importDefault(require("./buildCollecion"));
exports.buildCollecion = buildCollecion_1.default;
const myCollections_1 = __importDefault(require("./myCollections"));
exports.myCollections = myCollections_1.default;
const getCollectionStories_1 = __importDefault(require("./getCollectionStories"));
exports.getCollectionStories = getCollectionStories_1.default;
