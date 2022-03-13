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
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({
    path: path_1.default.join(__dirname, "../", `config`, ".env"),
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const authRtr_1 = __importDefault(require("./routes/authRtr"));
const storyRtr_1 = __importDefault(require("./routes/storyRtr"));
const tagRtr_1 = __importDefault(require("./routes/tagRtr"));
const imageUploadRtr_1 = __importDefault(require("./routes/imageUploadRtr"));
const profileRtr_1 = __importDefault(require("./routes/profileRtr"));
const collectionRtr_1 = __importDefault(require("./routes/collectionRtr"));
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_fileupload_1.default)({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path_1.default.join(__dirname, "../", "tmp"),
}));
app.use("/image", express_1.default.static(path_1.default.join(__dirname, "../", "/public/uploads/image")));
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.use("/api/v1/auth", authRtr_1.default);
app.use("/api/v1/stories", storyRtr_1.default);
app.use("/api/v1/tags", tagRtr_1.default);
app.use("/api/v1/image", imageUploadRtr_1.default);
app.use("/api/v1/profile", profileRtr_1.default);
app.use("/api/v1/collection", collectionRtr_1.default);
app.get("/api/v1", (_req, res) => {
    res.json({
        dir: __dirname,
        env: process.env,
    });
});
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, connectDB_1.default)();
    console.log(`Listening on http://localhost:${PORT}`);
}));
