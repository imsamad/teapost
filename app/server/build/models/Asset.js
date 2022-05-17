"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SingleFile = {
    url: { type: String, require: [true, 'Asset Url is required.'] },
    tags: [String],
    public_id: String,
};
const assetSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    images: [SingleFile],
    videos: [SingleFile],
    raws: [SingleFile],
});
const Asset = (0, mongoose_1.model)('Asset', assetSchema);
exports.default = Asset;
