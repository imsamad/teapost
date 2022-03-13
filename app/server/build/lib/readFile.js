"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDev = exports.readProd = void 0;
const path_1 = __importDefault(require("path"));
const fs = require('fs');
const read = (pathStr) => fs.readFile(path_1.default.join(__dirname, '../', pathStr), 'utf8', (err, data) => {
    if (err) {
        console.log('err from ', pathStr);
        console.error(err);
        return;
    }
    console.log('read ', pathStr);
    console.log(data);
});
const readProd = () => read('.env');
exports.readProd = readProd;
const readDev = () => read('.env.development');
exports.readDev = readDev;
