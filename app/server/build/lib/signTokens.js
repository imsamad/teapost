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
exports.signTokens = void 0;
const jwt_1 = require("./jwt");
const signTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = user.id || user._id;
    const tokens = {
        accessToken: (0, jwt_1.signJwt)({ userId }, {
            expiresIn: '7d',
        }),
        refreshToken: 'RefreshToken',
    };
    return tokens;
});
exports.signTokens = signTokens;
