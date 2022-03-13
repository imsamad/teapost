"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (mongoUriConnect) => {
    const mongoUri = mongoUriConnect ? mongoUriConnect : process.env.MONGO_URI;
    mongoose_1.default.connect(mongoUri);
    mongoose_1.default.connection.on("connected", () => {
        console.log("Mongoose DB connected!");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log(err.message);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("Mongoose connection is disconnected...");
    });
    process.on("SIGINT", () => {
        mongoose_1.default.connection.close(() => {
            console.log("Mongoose connection is disconnected due to app termination...");
            process.exit(0);
        });
    });
};
exports.default = connectDB;
