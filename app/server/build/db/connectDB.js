"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("colors");
const connectDB = () => new Promise((resolve, reject) => {
    const mongoUri = process.env.MONGODB_URI;
    mongoose_1.default.connect(mongoUri);
    const db = mongoose_1.default.connection;
    db.on('connected', () => {
        resolve(true);
        console.log(`):- MongoDB connected successfully!`.blue.italic);
    });
    db.on('error', (err) => {
        reject(false);
        console.log(`\n):- ${err.message}`.red.underline.bold);
    });
    db.on('disconnected', () => {
        reject(false);
        console.log(`\n):- MongoDB connection is disconnected...`.red.underline.bold);
    });
    process.on('SIGINT', () => {
        reject(false);
        db.close(() => {
            console.log(`):- MongoDB is disconnecting due to app termination...`.red.underline
                .bold);
            process.exit(0);
        });
    });
});
exports.default = connectDB;
